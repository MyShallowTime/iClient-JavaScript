/**
 * 单个符号
 * @returns {Object}
 * @private
 */
class SingleSymbolRender {
    constructor(map) {
        this.map = map;
    }

    /**
     * 符号转换成图层
     * @param {*} layer 
     * @param {*} before 
     * @returns {undefined}
     */
    addLayer(layer, symbol, before) {
        delete symbol.layout?.visibility;
        layer.paint && Object.assign(symbol.paint ?? {}, layer.paint);
        layer.layout && Object.assign(symbol.layout ?? {}, layer.layout);
        this.map.addLayerBak({ ...layer, ...symbol }, before);
    }
}

export default SingleSymbolRender;