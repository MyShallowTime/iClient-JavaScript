class SymbolManager {
    symbols;// addSymbol接口添加的symbol信息
    images; // 在loadImage的时候存下image
    #layerSymbols; // 图层与symbol的映射关系

    constructor() {
        this.symbols = {};
        this.images = {};
        this.#layerSymbols = {};
    }

    addSymbol(id, symbol) {
        this.symbols[id] = symbol;
    }

    getSymbol(id) {
        return this.symbols[id];
    }

    removeSymbol(id) {
        delete this.symbols[id];
    }

    addImageInfo(id, image) {
        this.images[id] = image;
    }

    getImageInfo(id) {
        return this.images[id];
    }

    getImageInfoByLayerId(layerId) {
        return this.getImageInfo(this.getSymbolByLayerId(layerId)?.image);
    }

    setSymbolTolayer(layerId, symbolId) {
        this.#layerSymbols[layerId] = symbolId;
    }

    getSymbolByLayerId(layerId) {
        return this.getSymbol(this.#layerSymbols[layerId]);
    }
}

export default SymbolManager;

