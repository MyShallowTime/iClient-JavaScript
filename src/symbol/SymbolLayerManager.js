import MapboxSymbolLayerManager from "./MapboxSymbolLayerManager";

const SymbolLayerManager = () => {
    let result;
    return (map) => {
        if(!result) {
            result = MapboxSymbolLayerManager(map);
        }
        return result;
    }
}
export default SymbolLayerManager;