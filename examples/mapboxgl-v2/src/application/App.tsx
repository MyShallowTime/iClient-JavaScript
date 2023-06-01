import React, { useEffect, useState } from 'react';
import View from './View';
import './style';
import { uniqueId } from 'lodash';
import { getMapboxKey, isPaintKey } from '../utils/StyleSettingUtil';
// import '../../../../src/mapboxgl/core/MapExtend';

const SET_PROPERTY_RULE = {
    paint: 'setPaintProperty',
    layout: 'setLayoutProperty'
}
const App = () => {
    const [map, setMap] = useState<any>();
    const [layersInfo, setLayersInfo] = useState<any[]>([]);
    const url = 'http://172.16.14.182:8090/iserver/services/map-China100/rest/maps/China';

    // 初始化
    useEffect(() => {
        !!map && addStyle();
    }, [!!map]);

    const onLoadedMap = async (map: any) => {
        (window as any).mapboxgl.supermap.WebSymbol.symbolUrl = "../../libs/resources/symbols";
        setMap(map);
    }

    // 添加图层
    const loadPreSymbol = async (preSymbolInfo) => {
        const { symbolId, style = {} } = preSymbolInfo;
        const id = uniqueId();
        await map.loadSymbol(symbolId, (_err, symbol) => {
            style.paint &&  Object.assign(symbol.paint, style.paint);
            style.layout &&  Object.assign(symbol.layout, style.layout);
            map.addSymbol(id, symbol);
        });
        return { id, symbolId };
    };

    const loadCustomSymbol = (customSymbolInfo) => {
        let symbolId;
        if (customSymbolInfo?.paint?.['fill-color'] && !customSymbolInfo?.paint?.['fill-pattern']) {
            symbolId = 'polygon-0'
        }
        const id = uniqueId();
        map.addSymbol(id, customSymbolInfo);
        return { id, symbolId };
    };

    const addMVTLayer = (options: {
        layerId: string;
        sourceLayer: string;
        type: string;
        layerType: string;
        symbol: any;
        layersInfo: any;
    }): void => {
        const {layerId, sourceLayer, type, layerType, symbol, layersInfo} = options;
        const { id, symbolId } = symbol;
        if (type !== 'text') {
            layersInfo.push({ id: layerId, type, sourceLayer, url, symbolId });
        }
        map.addLayer({
            "id": layerId,
            "type": layerType,
            "source": "ChinaSource",
            "source-layer": sourceLayer,
            symbol: id
        });
    };

    const addStyle = async (): Promise<void> => {
        map.addSource("ChinaSource", {
            "tiles": [url + "/tileFeature.mvt?returnAttributes=true&width=512&height=512&z={z}&x={x}&y={y}"],
            "bounds": [-180, -90, 180, 90],
            "type": "vector"
        });

        const newLayersInfo = [];

        const riverPolygonSymbol = await loadPreSymbol({
            symbolId: 'polygon-23010124'
        });
        const provinceLineSymbol = await loadPreSymbol({
            symbolId: 'line-49050402'
        });
        const capitalSymbol = await loadPreSymbol({
            symbolId: 'point-83030559',
            style: {
                layout: {
                    'icon-size': 0.16,
                    'icon-allow-overlap': true
                }
            }
        });
        const citySymbol = await loadPreSymbol({
            symbolId: 'point-909063',
            style: {
                layout: {
                    'icon-size': 0.16,
                    'icon-allow-overlap': true
                }
            }
        });

        const chinaSymbol = loadCustomSymbol({
            paint: {
                'fill-color': '#F5F3F0'
            }
        });
        const riverLineSymbol = loadCustomSymbol({
            paint: {
                'line-color': "#91B9EA",
                'line-dasharray': [26.67, 6.67],
                'line-width': 1
            },
            layout: {
                'line-cap': "round"
            }
        });
        const nationTextSymbol = loadCustomSymbol({
            paint: {
                'text-color': '#F5A623',
                'text-opacity': 1
            },
            layout: {
                'text-field': '{NAME}',
                'text-size': 20,
                'text-font': ['Microsoft YaHei Bold']
            }
        });
        const cityTextSymbol = loadCustomSymbol({
            paint: {
                'text-color': '#000',
                'text-opacity': 0.8,
                'text-translate': [28, 10]
            },
            layout: {
                'text-field': '{NAME}',
                'text-size': 12,
                'text-allow-overlap': true
            }
        });

        addMVTLayer({
            layerId:'chinaPolygon',
            sourceLayer:'China_Province_pg@China',
            type:'polygon',
            layerType: 'fill',
            symbol: chinaSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'riverpolygon',
            sourceLayer: 'Main_River_pg@China',
            type:'polygon',
            layerType: 'fill',
            symbol: riverPolygonSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'RiverLine',
            sourceLayer: 'Main_River_ln@China',
            type:'line',
            layerType: 'line',
            symbol: riverLineSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'provinceLine',
            sourceLayer: 'China_Province_ln@China',
            type:'line',
            layerType: 'line',
            symbol: provinceLineSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'capital',
            sourceLayer: 'China_Capital_pt@China',
            type:'point',
            layerType: 'symbol',
            symbol: capitalSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'city',
            sourceLayer: 'China_ProCenCity_pt@China',
            type:'point',
            layerType: 'symbol',
            symbol: citySymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'nationText',
            sourceLayer: 'China_Nation_B_pt@China',
            type:'text',
            layerType: 'symbol',
            symbol: nationTextSymbol,
            layersInfo: newLayersInfo
        });
        addMVTLayer({
            layerId:'cityText',
            sourceLayer: 'China_ProCenCity_pt@China',
            type:'text',
            layerType: 'symbol',
            symbol: cityTextSymbol,
            layersInfo: newLayersInfo
        });
        setLayersInfo(newLayersInfo.reverse());
    };

    // 点击切换
    const onIconClick = async (symbolId, layerId) => {
        console.log(symbolId);
        if (!map) return;
        const type = getLayerType(layerId);
        const id = uniqueId();
        await map.loadSymbol(symbolId, (_err, symbol) => {
            if(type === 'point') {
                symbol.layout['icon-allow-overlap'] = true;
                symbol.layout['icon-size'] = 0.16;
            }
            map.addSymbol(id, symbol);
        });
        map.setSymbol(layerId, id);
    };

    // 样式
    const getLayerType = (layerId: string) => {
        return layersInfo.find(el => el.id === layerId)?.type;
    };

    const getLayer = (layerId) => {
        return map.getStyle().layers.find(layer => layer?.id === layerId);
    };

    const getLayerPropertyStyle = (layerId: string, key: string) => {
        const compositeLayerId = map.compositeLayersManager.getCompositeLayerId(layerId);
        const type = getLayerType(compositeLayerId ?? layerId);
        const layer = getLayer(layerId);
        const mapboxKey = type && getMapboxKey[type](key);
        return isPaintKey(mapboxKey) ? layer?.paint?.[mapboxKey] : layer?.layout?.[mapboxKey];
    };

    const changeLayerStyle = (layerId: string, key: string, value: string): void => {
        const compositeLayerId = map.compositeLayersManager.getCompositeLayerId(layerId);
        const type = getLayerType(compositeLayerId ?? layerId);
        const layer = getLayer(layerId);
        const mapboxKey = type && getMapboxKey[type](key);
        const paintOrLayout = isPaintKey(mapboxKey) ? 'paint' : 'layout';

        if (type === 'point' && key === 'color') {
            const ImageId: string = layer?.layout?.['icon-image'];
            if (ImageId && !ImageId.startsWith('sdf_')) {
                const sdfImageId = uniqueId('sdf_');
                const image = map.symbolManager.getImageInfo(ImageId);
                map.addImage(sdfImageId, image, { sdf: true });
                map.setLayoutProperty(layerId, 'icon-image', sdfImageId);
            }
        } else if (type === 'line' && key === 'visibility') {
            const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
            layerIds.forEach((layerId) => {
                map[SET_PROPERTY_RULE[paintOrLayout]](layerId, mapboxKey, value);
            });
            return;
        }
        map[SET_PROPERTY_RULE[paintOrLayout]](layerId, mapboxKey, value);
    };

    const getCompositeLayersIds = (layerId: string): string[] => {
        return map.compositeLayersManager.getLayers(layerId);
    };
    const getImageInfo = (id: string) => {
        return map.symbolManager.getImageInfo(id);
    }
    return <View
        layerListParams={{
            layersInfo,
            setLayersInfo,
            onIconClick
        }}
        mapParams={{
            onLoadedMap
        }}
        styleSettingParams={{
            changeLayerStyle,
            getLayerPropertyStyle,
            getCompositeLayersIds,
            getImageInfo
        }}
    />
}

export default App;
