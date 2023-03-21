import MapboxSymbolLayerManager from "./MapboxSymbolLayerManager";

const SymbolLayerManager = () => {
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
export default SymbolLayerManager;