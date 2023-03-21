import MapboxSymbolLayerManager from "./MapboxSymbolLayerManager";

export const SymbolLayerManager = () => {
    const result = {};
    return (type) => {
        if(!result[type]) {
            result[type] = {
                mapbox: MapboxSymbolLayerManager
            }[type]
        }
        return result[type];
    }
}