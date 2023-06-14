import CompositeSymbolRender from "./CompositeSymbolRender";
import SingleSymbolRender from "./SingleSymbolRender";
import SymbolManager from "./SymbolManager";
import { getImageKey, isMultiSymbol, validateSymbol } from "./SymbolUtil";
/**
 * 符号图层管理器
 * @returns {Object}
 * @private
 */
class SymbolHandler {
    #layerSymbols; // 图层与symbol的映射关系

    constructor(map) {
        this.map = map;
        this.symbolManager = new SymbolManager();
        this.singleSymbolRender = new SingleSymbolRender(map);
        this.compositeSymbolRender = new CompositeSymbolRender(map);
        this.#layerSymbols = {};
    }

    /**
     * 添加符号图层
     * @param {*} layer 
     * @param {*} before 
     * @returns {undefined}
     */
    addLayer(layer, before) {
        if (typeof layer.symbol === 'string') {
            const id = layer.symbol;
            if (id) {
                const symbol = this.symbolManager.getSymbol(id);
                if (!symbol) {
                    console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                    return;
                }
                this.setSymbolTolayer(layer.id, id);
                this.getSymbolRender(symbol).addLayer(layer, symbol, before);
            }
        }
    }

    /**
     * 更新图层上的symbol
     * @param layerId 
     * @param symbol 
     * @returns {undefined}
     */
    setSymbol(layerId, symbolId) {
        if (typeof symbolId === 'string') {
            const symbol = this.symbolManager.getSymbol(symbolId);
            if (!symbol) {
                return this.map.fire('error', {
                    error: new Error(`Symbol "${symbolId}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`)
                });
            }
            const layers = this.map.getStyle().layers;
            const layerIndex = layers.findIndex(l => l.id === layerId);
            if (layerIndex === -1) {
                return this.map.fire('error', {
                    error: new Error(`Cannot set symbol "${symbolId}" to non-existing layer "${layerId}".`)
                });
            }
            this.setSymbolTolayer(layerId, symbolId);
            this.map.removeLayer(layerId);
            const before = this.getRealLayerId(layers[layerIndex + 1]?.id);
            this.addLayer({ ...layers[layerIndex],paint: {}, layout: {}, symbol: symbolId }, before);
        }
    }

    /**
     * 通过symbol判断使用管理器
     * @param {object | array} symbol 
     * @returns {SingleSymbolRender | CompositeSymbolRender}
     */
    getSymbolRender(symbol) {
        return isMultiSymbol(symbol) ? this.compositeSymbolRender : this.singleSymbolRender;
    }

    /**
     * 将Web符号中的image添加到地图上
     * @param {*} symbol 
     * @param {*} image 
     */
    addSymbolImageToMap(symbol, image) {
        const { type, name } = getImageKey(symbol);
        const id = symbol[type]?.[name];
        if (id && !this.map.hasImage(id)) {
            // 如果需要使用到image 的需要addImage
            this.map.addImage(id, image);
            // 为了解决sdf问题，需要把load后的image信息存下
            this.symbolManager.addImageInfo(id, image);
        }
    }

    /**
     * 给指定图层添加symbol
     * @param {*} id 
     * @param {*} symbol 
     */
    addSymbol(id, symbol) {
        if (this.symbolManager.getSymbol(id)) {
            return this.map.fire('error', {
                error: new Error('An symbol with this name already exists.')
            });
        }
        if (validateSymbol(symbol)) {
            this.symbolManager.addSymbol(id, symbol);
        } else {
            this.map.fire('error', {
                error: new Error('Symbol is not supported expressions。')
            });
        }
    }

    /**
     * 设置layer 对应的 symbol属性值
     * @param {string} layerId 
     * @param {string | array} symbol
     */
    setSymbolTolayer(layerId, symbol) {
        this.#layerSymbols[layerId] = symbol;
    }

    /**
     * 通过layerID获取symbol属性值
     * @param {string} layerId 
     * @return {string | array} symbol 
     */
    getSymbol(layerId) {
        return this.#layerSymbols[layerId];
    }

    /**
     * 判断是否有symbol
     * @return {boolean}  
     */
    hasSymbol() {
        return Object.keys(this.#layerSymbols).length > 0;
    }

    /**
    * 删除symbol
    */
    removeSymbol(id) {
        this.symbolManager.removeSymbol(id);
    }

    /**
     * 获取组合图层的子图层IDs
     * @param {string} layerId 
     * @returns {array}
     */
    getLayerIds(layerId) {
        return this.compositeSymbolRender.getLayerIds(layerId);
    }

    /**
     * 获取子图层ID对应的组合图层
     * @param {string} layerId 
     * @returns {string}
     */
    getLayerId(layerId) {
        return this.compositeSymbolRender.getLayerId(layerId);
    }

    /**
     * 删除图层ID
     * @param {string} layerId 
     * @returns {string}
     */
    removeLayerId(layerId) {
        return this.compositeSymbolRender.removeLayerId(layerId);
    }

    /**
     * 获取指定ID的layer
     * @param {string} layerId 
     * @returns {object}
     */
    getLayer(layerId) {
        const layer = this.map.getLayerBak(layerId);
        const symbol = this.getSymbol(layerId);
        if (layer) {
            return symbol ? { ...layer, symbol } : layer;
        } else {
            const layerIds = this.getLayerIds(layerId);
            if (layerIds?.[0]) {
                const reallayer = this.map.getLayerBak(layerIds[0]);
                return reallayer && { ...reallayer, symbol, id: layerId }
            }
        }
    }

    /**
     * 删除指定图层
     * @param {string} layerId 
     */
    removeLayer(layerId) {
        const layerIds = this.getLayerIds(layerId);
        if (layerIds?.length > 0) {
            layerIds.forEach(id => this.map.removeLayerBak(id));
            this.removeLayerId(layerId);
        } else {
            this.map.removeLayerBak(layerId);
        }
    }

    /**
     * 获取style
     * @returns 
     */
    getStyle() {
        const style = this.map.getStyleBak();
        if (this.hasSymbol()) {
            style.layers = style.layers.reduce((pre, layer) => {
                const compositeId = this.getLayerId(layer.id);
                if (compositeId) {
                    !pre.find(l => l.id === compositeId) && pre.push({ ...layer, symbol: this.getSymbol(compositeId), id: compositeId })
                } else if (this.getSymbol(layer.id)) {
                    pre.push({ ...layer, symbol: this.getSymbol(layer.id) })
                } else {
                    pre.push(layer);
                }
                return pre;
            }, []);
        }
        return style;
    }
    
    /**
     * 获取图层id的真实图层id
     * @param {string} layerId 
     * @returns 
     */
    getRealLayerId(layerId) {
        const layer = this.map.getLayerBak(layerId);
        if(layer) {
            return layer.id;
        }
        const layerIds = this.getLayerIds(layerId);
        return layerIds?.[0];
    }
}

export default SymbolHandler;