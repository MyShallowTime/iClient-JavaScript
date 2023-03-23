import { uniqueId } from "lodash";
import { lineSymbolToPaintLayout, polygonSymbolToPaintLayout, textSymbolToPaintLayout, transformSymbol2LayerInfo } from "./SymbolTransformUtil";

/**
 * 符号图层管理器
 * @returns {Object}
 */
const MapboxSymbolLayerManager = (m) => {
    const map = m;
    return {
        /**
         * 是否为组合符号
         * @param {*} type 
         * @returns {boolean}
         */
        isMultiSymbol(type) {
            return ['MultiLine'].includes(type);
        },
    
        /**
         * 符号转换成图层
         * @param {*} layer 
         * @param {*} symbol 
         * @returns {undefined}
         */
        addLayer(layer, symbol) {
            delete layer.symbol;
            if(this.isMultiSymbol(symbol.type)) {
                this.addMultiSymbol(layer, symbol);
                return;
            }
            this.addSimpleSymbol(layer, symbol);
        },

        /**
         * 符号转换成图层样式
         * @param symbol 
         * @returns {Object}
         */
        symbolToLayerStyle(symbol) {
            const transRules = {
                Point: transformSymbol2LayerInfo,
                ImagePoint: transformSymbol2LayerInfo,
                Line: lineSymbolToPaintLayout,
                Polygon: polygonSymbolToPaintLayout,
                ImagePolygon: polygonSymbolToPaintLayout,
                Text: textSymbolToPaintLayout
            };
            return transRules[symbol.type]?.(symbol) ?? {};
        },
    
        /**
         * 添加单个符号
         * @param {*} layer 
         * @param {*} symbol 
         */
        addSimpleSymbol(layer, symbol) {
            const style = this.symbolToLayerStyle(symbol);
            const paint = {}, layout = {};
            // 过滤掉为undefined的key
            // layers.layerId.paint.fill-pattern: 'undefined' value invalid. Use null instead.
            Object.keys(style.paint).forEach(k => {
                style.paint[k] !== undefined && (paint[k] = style.paint[k]);
            })
            Object.keys(style.layout).forEach(k => {
                style.layout[k] !== undefined && (layout[k] = style.layout[k]);
            })
            map.addLayerBak({...layer, ...style, paint, layout});
        },
    
        /**
         * 添加组合符号
         * @param {*} layer 
         * @param {*} symbol 
         */
        addMultiSymbol(layer, symbol) {
            const { styles } = symbol;
            styles.forEach((style, index) => {
                const id = index === 0 ? layer.id : uniqueId(layer.id + '_');
                this.addSimpleSymbol({...layer, id}, style);
                map.compositeLayersManager.addLayer(layer.id, id);
            })
        },

        /**
         * 更新图层上的symbol
         * @param layerId 
         * @param symbol 
         * @returns {undefined}
         */
        setSymbol(layerId, symbol) {
            const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
            const removeLayerIds = layerIds.slice(symbol.styles?.length ?? 1);
            removeLayerIds.forEach((l) => {
                map.removeLayer(l);
                map.compositeLayersManager.removeLayer(layerId, l);
            })
            if(this.isMultiSymbol(symbol.type)) {
                this.setMultiSymbol(layerId, symbol, layerIds);
                return;
            }
            this.setSimpleSymbol(layerId, symbol);
        },

        /**
         * 设置单个符号
         * @param layerId 
         * @param symbol 
         */
        setSimpleSymbol(layerId, symbol) {
            const layerInfo = this.symbolToLayerStyle(symbol);
            const {paint, layout} = layerInfo;
            Object.keys(paint).forEach(key => {
                map.setPaintProperty(layerId, key, paint[key]);
            })
            Object.keys(layout).forEach(key => {
                map.setLayoutProperty(layerId, key, layout[key]);
            })
        },
    
        /**
         * 添加组合符号（同类型的图层切换）
         * @param {*} layerId 
         * @param {*} symbol 
         * @param {*} layerIds 
         */
        setMultiSymbol(layerId, symbol, layerIds) {
            const { styles } = symbol;
            styles.forEach((style, index) => {
                let id = layerIds[index];
                if (layerIds[index]) {
                    this.setSimpleSymbol(layerIds[index], style);
                } else {
                    const layer = map.getLayer(layerId);
                    if (!layer) {
                        return;
                    }
                    const { source, sourceLayer, filter } = layer;
                    id = uniqueId(layerId + '_');
                    const layerInfo = {
                        id,
                        source: source,
                        "source-layer": sourceLayer
                    };
                    filter && (layerInfo['filter'] = filter);
                    this.addSimpleSymbol(layerInfo, style);
                }
                map.compositeLayersManager.addLayer(layerId, id);
            });
        }
    }
};

export default MapboxSymbolLayerManager;