import { Util } from "@supermap/iclient-common/commontypes/Util";
import { isArray } from "lodash";

const LayerType = {
    circle: 'circle',
    symbol: 'symbol',
    line: 'line',
    fill: 'fill'
}

// 判断符号类型
const GET_TYPE_RULE = [{
    prefix: 'line-',
    type: LayerType.line
}, {
    prefix: 'fill-',
    type: LayerType.fill
}, {
    prefix: 'circle-',
    type: LayerType.circle
}];

/**
 * 符号图层管理器
 * @returns {Object}
 */
const MapboxSymbolLayer = (m) => {
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
         * 取所有symbol的key值合集，并过滤不支持数据驱动的参数
         * @param {*} symbolInfos 
         * @param {*} type 
         * @returns {Array}
         */
        getKeys(symbolInfos, type) {
            return [...new Set(Object.values(symbolInfos).reduce((pre, s) => {
                pre.push(...Object.keys(s[type] ?? {}));
                return pre;
            }, []))]/* .filter(k => ![].includes(k)) */;
        },

        /**
         * 获取单个style 的表达式
         * @param {*} style 
         * @param {*} symbolInfos 
         * @param {*} type 
         * @param {*} key 
         * @returns {Array}
         */
        getStyleExpression(expression, symbolInfos, type, key) {
            const result = [];
            expression.forEach((r, index) => {
                const style = symbolInfos[r]?.[type]?.[key];
                if (!style) { return; }
                if (index % 2 === 1) {
                    result.push(expression[index - 1], style);
                } else if (index === expression.length - 1) {
                    result.push(style);
                }
            });
            return result;
        },

        /**
         * 将symbol 的表达式拆解为paint、layout的表达式
         * @param {*} type 
         * @param {*} symbolInfos 
         * @param {*} symbolExpression 
         * @returns {object}
         */
        getExpression(type, symbolInfos, symbolExpression) {
            // 表达式公式
            const expression = [symbolExpression[0], symbolExpression[1]];
            const style = symbolExpression.slice(2);
            const result = {};
            const keys = this.getKeys(symbolInfos, type);
            // 组装每个key的表达式
            keys.forEach(k => {
                const expressionRest = this.getStyleExpression(style, symbolInfos, type, k);
                if (expressionRest.length > 0) {
                    result[k] = [...expression, ...expressionRest];
                    if (expressionRest.length % 2 === 0) {
                        result[k].push(result[k][result[k].length - 1]);
                    }
                }
            })
            return result;
        },

        /**
         * 解析数据驱动， 遍历数组, 请求symbol
         * @param {*} style 
         * @returns {object}
         */
        getAllSymbolInfos(style) {
            const symbolInfos = {};
            style.forEach((value, index) => {
                if (index === style.length - 1 || index % 2 === 1) {
                    const symbolInfo = map.symbolManager.getSymbol(value);
                    if (!symbolInfo) {
                        console.warn(`Symbol "${value}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                        return;
                    }
                    //换成最新的数据结构, 暂时不考虑数组情况
                    if (!symbolInfo.length) {
                        symbolInfos[value] = symbolInfo;
                    }
                }
            });
            return symbolInfos;
        },

        /**
         * 添加symbol为表达式的图层
         * @param {*} layer 
         * @param {*} symbol 
         * @param {*} before 
         */
        addExpressionSymbolLayer(layer, symbol, before) {
            const symbolInfos = this.getAllSymbolInfos(symbol.slice(2));
            const paint = this.getExpression("paint", symbolInfos, symbol);
            const layout = this.getExpression("layout", symbolInfos, symbol);
            map.addLayerBak({ ...layer, paint, layout }, before);
        },

        /**
         * 将symbol为表达式的线图层拆分为多图层
         * @param {*} layer 
         * @param {*} symbol 
         * @returns {Array}
         */
        getExpresionLineLayers(layer, symbol) {
            const layers = [];
            const filter = ["all"];
            if (layer.filter) {
                filter.push(layer.filter);
            }
            const expression = symbol.slice(2);
            expression.forEach((r, index) => {
                if (index % 2 === 1) {
                    layers.push({
                        ...layer, "filter": [
                            ...filter,
                            [
                                "==",
                                symbol[1][1],
                                expression[index - 1]
                            ]
                        ], symbol: r
                    });
                } else if (index === expression.length - 1) {
                    layers.unshift({ ...layer, symbol: r });
                }
            });
            return layers;
        },

        /**
         * 添加symbol为表达式的线图层
         * @param {*} layer 
         * @param {*} symbol 
         * @param {*} before 
         */
        addExpressionLineLayer(layer, symbol, before) {
            const layers = this.getExpresionLineLayers(layer, symbol);
            layers.forEach((l, index) => {
                l.id = index === 0 ? layer.id : Util.createUniqueID('SuperMap.Symbol_');
                map.addLayer(l, before);
                map.compositeLayersManager.addLayer(layer.id, l.id);
            })
        },

        /**
         * 符号转换成图层
         * @param {*} layer 
         * @param {*} symbol 
         * @returns {undefined}
         */
        addLayer(layer, symbol, before) {
            if (typeof symbol === 'string') {
                const id = layer.symbol;
                if (id) {
                    map.symbolManager.setSymbolTolayer(layer.id, id);
                    const symbolInfo = map.symbolManager.getSymbol(id);
                    if (!symbolInfo) {
                        console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                        return;
                    }
                    if (this.isMultiSymbol(symbolInfo)) {
                        this.addMultiSymbol(layer, symbolInfo, before);
                        return;
                    }
                    this.addSimpleSymbol(layer, symbolInfo, before);
                }
            } else {
                this.addExpressionLineLayer(layer, symbol, before);
            }
            delete layer.symbol;
        },

        /**
         * 通过符号属性获取该符号类型
         * @param {*} symbol 
         * @returns {string}
         */
        getSymbolType(symbol) {
            const { paint = {}, layout = {} } = symbol;
            const keys = Object.keys(paint).concat(Object.keys(layout));
            let type;
            for (const v of GET_TYPE_RULE) {
                const isMatch = keys.some(k => k.startsWith(v.prefix));
                if (isMatch) {
                    type = v.type;
                    break;
                }
            }
            return type ?? LayerType.symbol;
        },

        /**
         * 添加单个符号
         * @param {*} layer 
         * @param {*} symbol 
         */
        addSimpleSymbol(layer, symbol, before) {
            layer.paint && Object.assign(symbol.paint, layer.paint);
            layer.layout && Object.assign(symbol.layout, layer.layout);
            map.addLayerBak({ ...layer, ...symbol }, before);
        },

        /**
         * 添加组合符号
         * @param {*} layer 
         * @param {*} symbol 
         */
        addMultiSymbol(layer, symbol, before) {
            symbol.forEach((style, index) => {
                const id = index === 0 ? layer.id : Util.createUniqueID('SuperMap.Symbol_');
                this.addSimpleSymbol({ ...layer, id }, style, before);
                map.compositeLayersManager.addLayer(layer.id, id);
            })
        },

        /**
         * 更新图层上的symbol
         * @param layerId 
         * @param symbol 
         * @returns {undefined}
         */
        setSymbol(layerId, symbolInfo) {
            if (typeof symbolInfo === 'string') {
                const symbol = map.symbolManager.getSymbol(symbolInfo);
                if (!symbol) {
                    console.warn(`Symbol "${symbolInfo}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                    return;
                }
                const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
                const removeLayerIds = layerIds.slice(symbol.length ?? 1);
                removeLayerIds.forEach((l) => {
                    map.removeLayer(l);
                    map.compositeLayersManager.removeLayer(layerId, l);
                })
                if (this.isMultiSymbol(symbol)) {
                    this.setMultiSymbol(layerId, symbol, layerIds);
                    return;
                }
                const layerInfo = symbol;
                this.setSimpleSymbol(layerId, layerInfo);
            } else {
                const symbolInfos = this.getAllSymbolInfos(symbolInfo.slice(2));
                const paint = this.getExpression("paint", symbolInfos, symbolInfo);
                const layout = this.getExpression("layout", symbolInfos, symbolInfo);
                this.setSimpleSymbol(layerId, { paint, layout });
            }
        },

        /**
         * 设置单个符号
         * @param layerId 
         * @param symbol 
         */
        setSimpleSymbol(layerId, symbol) {
            const layers = map.getStyle().layers, layer = layers.find(l => l.id === layerId);
            if (!layer) { return; }

            const { paint: oldPaint = {}, layout: oldLayout = {} } = layer;
            const layerInfo = symbol;
            const { paint = {}, layout = {} } = layerInfo, paintKeys = Object.keys(paint).concat(Object.keys(oldPaint)),
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
        setMultiSymbol(layerId, symbol, layerIds) {
            symbol.forEach((style, index) => {
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
                    const type = this.getSymbolType(style);
                    const layerInfo = {
                        type,
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

        /**
         * 获取不同图层类型使用image的属性名
         * @param {object} symbol 
         * @returns {object}
         */
        getImageKey(symbol) {
            const symbolType = this.getSymbolType(symbol);
            const IMAGE_MAPBOX_KEY = {
                [LayerType.symbol]: {
                    type: 'layout',
                    name: 'icon-image'
                },
                [LayerType.line]: {
                    type: 'paint',
                    name: 'line-pattern'
                },
                [LayerType.fill]: {
                    type: 'paint',
                    name: 'fill-pattern'
                }
            }
            const result = IMAGE_MAPBOX_KEY[symbolType];
            return result;
        }
    }
};

const SymbolLayer = () => {
    let result;
    return (map) => {
        if (!result) {
            result = MapboxSymbolLayer(map);
        }
        return result;
    }
}
export default SymbolLayer;