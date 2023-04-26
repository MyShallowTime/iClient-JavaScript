import React, { useEffect, useState } from 'react';
import View from './View';
import './style';
import { cloneDeep, uniqueId } from 'lodash';
import { getMapboxKey, isPaintKey } from '../utils/StyleSettingUtil';
import '../../../../src/maplibregl/core/MapExtend';

const App = () => {
    const [map, setMap] = useState<any>();
    const [layersInfo, setLayersInfo] = useState<any[]>([]);
    const url = 'http://172.16.14.12:8090/iserver/services/map-china400/rest/maps/China';
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
    const loadPreSymbol = async (preSymbolInfo): Promise<string> => {
        const { symbolId } = preSymbolInfo;
        // eslint-disable-next-line import/no-dynamic-require
        const symbolInfo = require(`../../static/symbols/${symbolId.split('-')[0]}/${symbolId}.json`);
        const id = uniqueId();
        await map.loadSymbol(cloneDeep(symbolInfo), (_err, symbol) => {
            map.addSymbol(id, symbol);
        });
        return id;
    };

    const loadCustomSymbol = (customSymbolInfo): string => {
        const id = uniqueId();
        map.addSymbol(id, customSymbolInfo);
        return id;
    };

    const addMVTLayer = (layerId: string, sourceLayer: string, type: string, symbol: string, layersInfo): void => {
        layersInfo.push({ id: layerId, type, sourceLayer, url });
        map.addLayer({
            "id": layerId,
            "type": "symbol",
            "source": "ChinaSource",
            "source-layer": sourceLayer,
            symbol
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
            type: SymbolType.Polygon,
            symbolId: 'polygon-23010124'
        });
        const provinceLineSymbol = await loadPreSymbol({
            type: SymbolType.SimpleLine,
            symbolId: 'line-49050402'
        });
        const capitalSymbol = await loadPreSymbol({
            type: SymbolType.Point,
            symbolId: 'point-83030559'
        });
        const citySymbol = loadCustomSymbol({
            type: SymbolType.Point,
            size: 8,
            color: '#fff',
            opacity: 1,
            strokeColor: "rgba(208,2,27,1)",
            strokeWidth: 2,
            stroleOpacity: 0.8,
            blur: 0.8
        });
        const chinaSymbol = loadCustomSymbol({
            type: SymbolType.Polygon,
            color: '#F5F3F0'
        });
        const riverLineSymbol = loadCustomSymbol({
            type: SymbolType.SimpleLine,
            cap: "round",
            color: "#91B9EA",
            dasharray: [26.67, 6.67],
            width: 1
        });
        const nationTextSymbol = loadCustomSymbol({
            type: SymbolType.Text,
            field: '{NAME}',
            size: 20,
            color: '#F5A623',
            opacity: 1,
            fontFamily: ['Microsoft YaHei Bold']
        });
        const cityTextSymbol = loadCustomSymbol({
            type: SymbolType.Text,
            field: '{NAME}',
            size: 12,
            color: '#000',
            opacity: 0.8,
            translate: [28, 10],
            allowOverlap: true
        });

        addMVTLayer('chinaPolygon', 'China_Province_pg@China', 'polygon', chinaSymbol, newLayersInfo);
        addMVTLayer('riverpolygon', 'Main_River_pg@China', 'polygon', riverPolygonSymbol, newLayersInfo);
        addMVTLayer('RiverLine', 'Main_River_ln@China', 'line', riverLineSymbol, newLayersInfo);
        addMVTLayer('provinceLine', 'China_Province_ln@China', 'line', provinceLineSymbol, newLayersInfo);
        addMVTLayer('capital', 'China_Capital_pt@China', 'point', capitalSymbol, newLayersInfo);
        addMVTLayer('city', 'China_ProCenCity_pt@China', 'circle', citySymbol, newLayersInfo);
        addMVTLayer('nationText', 'China_Nation_B_pt@China', 'text', nationTextSymbol, newLayersInfo);
        addMVTLayer('cityText', 'China_ProCenCity_pt@China', 'text', cityTextSymbol, newLayersInfo);
        setLayersInfo(newLayersInfo.reverse());
    };

    // 点击切换
    const onIconClick = async (symbolId, layerId) => {
        console.log(symbolId);
        if (!map) return;
        const type = getLayerType(layerId);
        // eslint-disable-next-line import/no-dynamic-require
        const symbolInfo = cloneDeep(require(`../../static/symbols/${type}/${type}-${symbolId}.json`));
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

        if (type === 'point' && key === 'color') {
            const ImageId: string = layer?.layout?.['icon-image'];
            if (ImageId && !ImageId.startsWith('sdf_')) {
                const sdfImageId = uniqueId('sdf_');
                const image = map.symbolManager.getImageInfo(ImageId);
                map.addImage(sdfImageId, image, { sdf: true });
                map.setSymbolProperty(layerId, 'image', sdfImageId);
            }
        } else if (type === 'line' && key === 'visibility') {
            const layerIds = map.compositeLayersManager.getLayers(layerId) ?? [layerId];
            layerIds.forEach((layerId) => {
                map.setSymbolProperty(layerId, key, value);
            });
            return;
        }
        map.setSymbolProperty(layerId, key, value);
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
