import { Util } from "@supermap/iclient-common/commontypes/Util";
import { lineSymbolToPaintLayout, getCircleProperty, getSymbolProperty, polygonSymbolToPaintLayout, textSymbolToPaintLayout, transformSymbol2LayerInfo, getLineProperty, getFillProperty, getTextProperty } from "./SymbolTransformUtil";

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
        addLayer(layer, symbol, before) {
            delete layer.symbol;
            if(this.isMultiSymbol(symbol.type)) {
                this.addMultiSymbol(layer, symbol, before);
                return;
            }
            this.addSimpleSymbol(layer, symbol, before);
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
                ImageLine: lineSymbolToPaintLayout,
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
        addSimpleSymbol(layer, symbol, before) {
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
            map.addLayerBak({...layer, ...style, paint, layout}, before);
        },
    
        /**
         * 添加组合符号
         * @param {*} layer 
         * @param {*} symbol 
         */
        addMultiSymbol(layer, symbol, before) {
            const { styles } = symbol;
            styles.forEach((style, index) => {
                const id = index === 0 ? layer.id : Util.createUniqueID('SuperMap.Symbol_');
                this.addSimpleSymbol({...layer, id}, style, before);
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
         * 更新图层上的symbol属性
         * @param layerId 
         * @param symbol 
         * @returns {undefined}
         */
        setSymbolProperty(layerId, name, value) {
            const imageInfo = map.symbolManager.getImageInfoByLayerId(layerId);
            const symbolInfo = map.symbolManager.getSymbolByLayerId(layerId);
            const layer = map.getLayer(layerId);
            const transRules = {
                circle: getCircleProperty,
                symbol: getSymbolProperty,
                line: getLineProperty,
                fill: getFillProperty,
                text: getTextProperty
            };
            const key = symbolInfo?.type === 'Text' ? 'text' : layer?.type;
            const result = transRules[key]?.(name, value, imageInfo?.width);
            if(result) {
                const {type, name, value} = result;
                const rule = {
                    paint: 'setPaintProperty',
                    layout: 'setLayoutProperty'
                }
                map[rule[type]](layerId, name, value);
            }
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
                    const layers = map.getStyle().layers;
                    const ids = map.compositeLayersManager.getLayers(layerId);
                    const beforeIndex = layers.findIndex(el => el.id === ids[ids.length - 1]) + 1;
                    if (!layer) {
                        return;
                    }
                    const { source, sourceLayer, filter } = layer;
                    id = Util.createUniqueID('SuperMap.Symbol_');
                    const layerInfo = {
                        id,
                        source: source,
                        "source-layer": sourceLayer
                    };
                    filter && (layerInfo['filter'] = filter);
                    this.addSimpleSymbol(layerInfo, style, layers[beforeIndex]?.id);
                }
                map.compositeLayersManager.addLayer(layerId, id);
            });
        }
    }
};

export default MapboxSymbolLayerManager;