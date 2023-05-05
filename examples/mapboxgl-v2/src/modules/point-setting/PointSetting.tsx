import React from 'react';
import PanelLayout from '../../components/panel-layout'
import PointBuiltInContent from '../classify-selector/PointBuiltInContent';
import PointStyleSetting from '../style-setting-panel/PointStyleSetting';

type PointSettingProps = {
    layerId: string;
    selectedSymbolId: string;
    onIconClick: (selectedSymbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
    getImageInfo: (id: string) => any;
}

const PointSetting = (props: PointSettingProps) => {
    const { layerId, selectedSymbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, onClosePanal, getImageInfo } = props;

    return (
        <PanelLayout className='point-setting-panel' title={layerId} onClickClose={onClosePanal} >
            <PointBuiltInContent onIconClick={onIconClick} selectedSymbolId={selectedSymbolId} />
            <PointStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} selectedSymbolId={selectedSymbolId} getImageInfo={getImageInfo} />
        </PanelLayout >
    )
}

export default PointSetting;
