import React from 'react';
import PanelLayout from '../../components/panel-layout'
import PolygonBuiltInContent from '../classify-selector/PolygonBuiltInContent';
import PolygonStyleSetting from '../style-setting-panel/PolygonStyleSetting';

type PolygonSettingProps = {
    layerId: string;
    selectedSymbolId: string;
    onIconClick: (selectedSymbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
}

const PolygonSetting = (props: PolygonSettingProps) => {
    const { layerId, selectedSymbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, onClosePanal } = props;

    return (
        <PanelLayout className='polygon-setting-panel' title={layerId} onClickClose={onClosePanal} >
            <PolygonBuiltInContent onIconClick={onIconClick} selectedSymbolId={selectedSymbolId} />
            <PolygonStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} selectedSymbolId={selectedSymbolId} />
        </PanelLayout>
    )
}

export default PolygonSetting;
