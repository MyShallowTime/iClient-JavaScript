import React, { useEffect, useState } from 'react';
import View from './View';
import './style';
import { cloneDeep, uniqueId } from 'lodash';
import { getMapboxKey, isPaintKey } from '../utils/StyleSettingUtil';
import '../../../../src/mapboxgl/core/MapExtend';

const App = () => {
    const [map, setMap] = useState<any>();
    const [layersInfo, setLayersInfo] = useState<any[]>([]);
    const url = 'http://172.16.14.182:8090/iserver/services/map-China100/rest/maps/China';
    enum SymbolType {
        Polygon = 'Polygon',
        SimpleLine = 'SimpleLine',
        Point = 'Point',
        Text = 'Text'
    }
    // 初始化
    useEffect(() => {
        !!map && addStyle();
    }, [!!map]);

    const onLoadedMap = async (map: any) => {
        setMap(map);
    }

    // 添加图层
    const loadPreSymbol = async (preSymbolInfo) => {
        const { symbolId } = preSymbolInfo;
        // eslint-disable-next-line import/no-dynamic-require
        const symbolInfo = require(`../../static/symbols/${symbolId.split('-')[0]}/${symbolId}.json`);
        const id = uniqueId();
        await map.loadSymbol(cloneDeep(symbolInfo), (_err, symbol) => {
            map.addSymbol(id, symbol);
        });
        return { id, symbolId };
    };

    const loadCustomSymbol = (customSymbolInfo) => {
        let symbolId;
        if (customSymbolInfo.type === SymbolType.Polygon) {
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
        if (type === 'point') {
            map.setLayoutProperty(layerId, 'icon-allow-overlap', true);
        }
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
            symbolId: 'point-83030559'
        });
        const citySymbol = await loadPreSymbol({
            symbolId: 'point-909063'
        });
        // const citySymbol = loadCustomSymbol({
        //     type: SymbolType.Point,
        //     size: 8,
        //     color: '#fff',
        //     opacity: 1,
        //     strokeColor: "rgba(208,2,27,1)",
        //     strokeWidth: 2,
        //     stroleOpacity: 0.8,
        //     blur: 0.8
        // });
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
                'icon-color': '#F5A623',
                'icon-opacity': 1
            },
            layout: {
                'text-field': '{NAME}',
                'icon-size': 20
                // fontFamily: ['Microsoft YaHei Bold'] // TODO
            }
        });
        const cityTextSymbol = loadCustomSymbol({
            paint: {
                'icon-color': '#000',
                'icon-opacity': 0.8,
                'icon-translate': [28, 10]
            },
            layout: {
                'text-field': '{NAME}',
                'icon-size': 12,
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
        // eslint-disable-next-line import/no-dynamic-require
        const symbolInfo = cloneDeep(require(`../../static/symbols/${type}/${symbolId}.json`));
        console.log(symbolInfo, 'symbolInfo');
        const id = uniqueId();
        await map.loadSymbol(symbolInfo, (_err, symbol) => {
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

        if (type === 'point' && key === 'color') {
            const ImageId: string = layer?.layout?.['icon-image'];
            if (ImageId && !ImageId.startsWith('sdf_')) {
                const sdfImageId = uniqueId('sdf_');
                const image = map.symbolManager.getImageInfo(ImageId);
                map.addImage(sdfImageId, image, { sdf: true });
                map.setSymbolProperty(layerId, 'icon-image', sdfImageId);
            }
        } else if (type === 'line' && key === 'visibility') {
            const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
            layerIds.forEach((layerId) => {
                map.setSymbolProperty(layerId, mapboxKey, value);
            });
            return;
        }
        map.setSymbolProperty(layerId, mapboxKey, value);
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
