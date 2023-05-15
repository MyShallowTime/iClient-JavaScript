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
         * 取所有symbol的key值合集，并过滤不支持数据驱动的参数
         * @param {*} symbolInfos 
         * @param {*} type 
         * @returns 
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
         * @returns 
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
         * @returns 
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
         * @returns 
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
                        symbolInfos[value] = this.symbolToLayerStyle(symbolInfo);
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
         * @returns 
         */
        getExpresionLineLayers(layer, symbol) {
            const layers = [];
            const filter = ["all"];
            if(layer.filter) {
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
                    const symbolInfo = map.symbolManager.getSymbol(id);
                    if (!symbolInfo) {
                        console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                        return;
                    }
                    if (this.isMultiSymbol(symbolInfo.type)) {
                        this.addMultiSymbol(layer, symbolInfo, before);
                        return;
                    }
                    this.addSimpleSymbol(layer, symbolInfo, before);
                }
            } else if (layer.type === 'line') {
                this.addExpressionLineLayer(layer, symbol, before);
            } else {
                this.addExpressionSymbolLayer(layer, symbol, before);
            }
            delete layer.symbol;
        },

        /**
         * 符号转换成图层样式
         * @param symbol 
         * @returns {Object}
         */
        symbolToLayerStyle(symbol) {
            // TODO Point、Line、Polyogn需要移除
            const transRules = {
                Point: transformSymbol2LayerInfo,
                SimplePoint: transformSymbol2LayerInfo,
                ImagePoint: transformSymbol2LayerInfo,
                Line: lineSymbolToPaintLayout,
                SimpleLine: lineSymbolToPaintLayout,
                ImageLine: lineSymbolToPaintLayout,
                Polygon: polygonSymbolToPaintLayout,
                SimplePolygon: polygonSymbolToPaintLayout,
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
            const properties = { ...layer?.paint, ...layer?.layout };
            Object.assign(symbol, properties);
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
            map.addLayerBak({ ...layer, ...style, paint, layout }, before);
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
                const removeLayerIds = layerIds.slice(symbol.styles?.length ?? 1);
                removeLayerIds.forEach((l) => {
                    map.removeLayer(l);
                    map.compositeLayersManager.removeLayer(layerId, l);
                })
                if (this.isMultiSymbol(symbol.type)) {
                    this.setMultiSymbol(layerId, symbol, layerIds);
                    return;
                }
                const layerInfo = this.symbolToLayerStyle(symbol);
                this.setSimpleSymbol(layerId, layerInfo);
            } else {
                const symbolInfos = this.getAllSymbolInfos(symbolInfo.slice(2));
                const paint = this.getExpression("paint", symbolInfos, symbolInfo);
                const layout = this.getExpression("layout", symbolInfos, symbolInfo);
                this.setSimpleSymbol(layerId, { paint, layout });
            }
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
            if (result) {
                const { type, name, value } = result;
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
        setSimpleSymbol(layerId, layerInfo) {
            const { paint, layout } = layerInfo;
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
                    const layerInfo = this.symbolToLayerStyle(style);
                    this.setSimpleSymbol(layerIds[index], layerInfo);
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