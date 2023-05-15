import {LayerType} from "@supermap/iclient-common/commontypes/symbol/DefaultValue";
import { Util } from "@supermap/iclient-common/commontypes/Util";
import {isArray} from "lodash";
import { lineSymbolToPaintLayout, polygonSymbolToPaintLayout, /* textSymbolToPaintLayout, */ transformSymbol2LayerInfo, isPaintKey } from "./SymbolTransformUtil";

// 判断符号类型
const GET_TYPE_RULE = [{
    prefix: 'line-',
    type: LayerType.line
}, {
    prefix: 'fill-',
    type: LayerType.fill
}];
const TRANSFORM_SYMBOL_RULE = {
    [LayerType.symbol]: transformSymbol2LayerInfo,
    [LayerType.circle]: transformSymbol2LayerInfo,
    [LayerType.line]: lineSymbolToPaintLayout,
    [LayerType.fill]: polygonSymbolToPaintLayout
};
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
        isMultiSymbol(symbol) {
            return isArray(symbol);
        },
    
        /**
         * 符号转换成图层
         * @param {*} layer 
         * @param {*} symbol 
         * @returns {undefined}
         */
        addLayer(layer, symbol, before) {
            delete layer.symbol;
            if(this.isMultiSymbol(symbol)) {
                this.addMultiSymbol(layer, symbol, before);
                return;
            }
            this.addSimpleSymbol(layer, symbol, before);
        },

        /**
         * 通过符号属性获取该符号类型
         * @param {*} symbol 
         * @returns 
         */
        getSymbolType(symbol) {
            const {paint = {}, layout = {}} = symbol;
            const keys = Object.keys(paint).concat(Object.keys(layout));
            let type;
            for(const v of GET_TYPE_RULE) {
                const isMatch = keys.some(k => k.startsWith(v.prefix));
                if(isMatch) {
                    type = v.type;
                    break;
                }
            }
            return type ?? LayerType.symbol;
        },

        /**
         * 符号转换成图层样式
         * @param symbol 
         * @returns {Object}
         */
        symbolToLayerStyle(symbol) {
            const type = this.getSymbolType(symbol);
            const {paint, layout} = symbol;
            return {
                type,
                paint,
                layout
            }
            // return TRANSFORM_SYMBOL_RULE[type]?.(symbol) ?? {};
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
            Object.keys(style.paint ?? {}).forEach(k => {
                style.paint[k] !== undefined && (paint[k] = style.paint[k]);
            })
            Object.keys(style.layout ?? {}).forEach(k => {
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
        setSymbol(layerId, oldSymbol ,symbol) {
            const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
            const removeLayerIds = layerIds.slice(symbol.length ?? 1);
            removeLayerIds.forEach((l) => {
                map.removeLayer(l);
                map.compositeLayersManager.removeLayer(layerId, l);
            })
            if(this.isMultiSymbol(symbol)) {
                this.setMultiSymbol(layerId, oldSymbol, symbol, layerIds);
                return;
            }
            this.setSimpleSymbol(layerId, oldSymbol, symbol);
        },

        /**
         * 更新图层上的symbol属性
         * @param layerId 
         * @param name mapbox key
         * @param value 样式值
         * @returns {undefined}
         */
        setSymbolProperty(layerId, name, value) {
            const type = isPaintKey(name) ? 'paint' : 'layout';
            const rule = {
                paint: 'setPaintProperty',
                layout: 'setLayoutProperty'
            }
            map[rule[type]](layerId, name, value);
        },

        /**
         * 设置单个符号
         * @param layerId 
         * @param symbol 
         */
        setSimpleSymbol(layerId, oldSymbol, symbol) {
            const {paint: oldPaint = {}, layout: oldLayout = {}} = oldSymbol;
            const layerInfo = this.symbolToLayerStyle(symbol);
            const {paint = {}, layout = {}} = layerInfo, paintKeys = Object.keys(paint).concat(Object.keys(oldPaint)), 
                layoutKeys = Object.keys(layout).concat(Object.keys(oldLayout));

            Array.from(new Set(paintKeys)).forEach(key => {
                map.setPaintProperty(layerId, key, paint[key]);
            });
            Array.from(new Set(layoutKeys)).forEach(key => {
                map.setLayoutProperty(layerId, key, layout[key]);
            });
        },
    
        /**
         * 添加组合符号（同类型的图层切换）
         * @param {*} layerId 
         * @param {*} symbol 
         * @param {*} layerIds 
         */
        setMultiSymbol(layerId, oldSymbol, symbol, layerIds) {
            symbol.forEach((style, index) => {
                let id = layerIds[index];
                if (layerIds[index]) {
                    this.setSimpleSymbol(layerIds[index], oldSymbol, style);
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
        },
        getImageKey(symbol) {
            const symbolType = this.getSymbolType(symbol);
            const IMAGE_MAPBOX_KEY = {
                [LayerType.symbol]: {
                    type: 'layout',
                    name: 'icon-image'
                },
                [LayerType.line]:  {
                    type: 'paint',
                    name: 'line-pattern'  
                },
                [LayerType.fill]:  {
                    type: 'paint',
                    name: 'fill-pattern'  
                }
            }
            const result = IMAGE_MAPBOX_KEY[symbolType];
            return result;
        },
        /**
         * 更新符号图片对应的属性值
         * @param {*} symbol 
         * @param {*} imageId 
         * @returns 
         */
        updateImageProperty(symbol, imageId) {
            const {type, name} = this.getImageKey(symbol);
            symbol[type][name] = imageId;
            return symbol;
        },
        /**
         * 获取符号中关于图片的属性值
         * @param {*} symbol 
         * @returns 
         */
        getImage(symbol) {
            // 图片出图的只会是单图层
            if(isArray(symbol)) {return;}
            
            const {type, name} = this.getImageKey(symbol);
            return symbol[type]?.[name];
        }
    }
};

export default MapboxSymbolLayerManager;