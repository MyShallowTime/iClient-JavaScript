import MapboxSymbolLayerManager from "./MapboxSymbolLayerManager";

const SymbolLayerManager = () => {
    const result = {};
    return (type, map) => {
        if(!result[type]) {
            result[type] = {
                mapbox: MapboxSymbolLayerManager
            }[type]
        }
        return result[type]?.(map);
    }
}
export default SymbolLayerManager;