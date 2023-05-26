import React, { useState } from 'react';
import LayerList from '../modules/layer-list/LayerList';
import LineSetting from '../modules/line-setting/LineSetting';
import PointSetting from '../modules/point-setting/PointSetting';
import PolygonSetting from '../modules/polygon-setting/PolygonSetting';
import Map, { MapProps } from './Map';
import './ComponentsStyle';

type PanelLayoutProps = {
    mapParams: MapProps,
    layerListParams: {
        layersInfo: any;
        onIconClick: (symbolId: string, layerId: string) => Promise<void>;
        setLayersInfo: React.Dispatch<React.SetStateAction<any[]>>;
    },
    styleSettingParams: {
        changeLayerStyle: (layerId: string, key: string, value: string) => void;
        getLayerPropertyStyle: (layerId: string, key: string) => any;
        getCompositeLayersIds: (layerId: string) => string[];
        getImageInfo: (id: string) => any;
    }
}

const View = (props: PanelLayoutProps) => {
    const { layersInfo, onIconClick, setLayersInfo } = props.layerListParams;
    const { changeLayerStyle, getLayerPropertyStyle, getCompositeLayersIds, getImageInfo } = props.styleSettingParams;
    const [layerId, setLayerId] = useState('');
    const type = layersInfo?.find(el => el?.id === layerId)?.type;
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const selectedSymbolId = layersInfo.find(el => el.id === layerId)?.symbolId;
    const onClosePanal = () => {
        setIsSettingOpen(false);
    };

    const onClickCard = async (id) => {
        if (id === selectedSymbolId) return;
        await onIconClick(id, layerId);
        layersInfo.find(el => el.id === layerId).symbolId = id;
        setLayersInfo([...layersInfo]);
    };

    const settingRender = {
        line: <LineSetting key={layerId} layerId={layerId} selectedSymbolId={selectedSymbolId} onIconClick={onClickCard} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} getCompositeLayersIds={getCompositeLayersIds} onClosePanal={onClosePanal} />,
        point: <PointSetting key={layerId} layerId={layerId} selectedSymbolId={selectedSymbolId} onIconClick={onClickCard} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} onClosePanal={onClosePanal} getImageInfo={getImageInfo} />,
        polygon: <PolygonSetting key={layerId} layerId={layerId} selectedSymbolId={selectedSymbolId} onIconClick={onClickCard} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} onClosePanal={onClosePanal} />
    };

    return <>
        <LayerList layersInfo={layersInfo} layerId={layerId} setLayerId={setLayerId} changeLayerStyle={changeLayerStyle} setIsSettingOpen={setIsSettingOpen} />
        <Map {...props.mapParams} />
        {isSettingOpen && settingRender[type]}
    </>
}

export default View;
