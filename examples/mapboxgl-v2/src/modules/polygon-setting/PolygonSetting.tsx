import React from 'react';
import ClassifyContentLayout from '../../components/classify-content-layout';
import PanelLayout from '../../components/panel-layout'
import PolygonBuiltInContent from '../classify-selector/PolygonBuiltInContent';
import PolygonStyleSetting from '../style-setting-panel/PolygonStyleSetting';

type PolygonSettingProps = {
    layerId: string;
    symbolId: string;
    onIconClick: (symbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
}

const PolygonSetting = (props: PolygonSettingProps) => {
    const { layerId, symbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, onClosePanal } = props;

    return <PanelLayout className='polygon-setting-panel' title={layerId} onClickClose={onClosePanal} >
        <ClassifyContentLayout>
            <PolygonBuiltInContent onIconClick={onIconClick} />
        </ClassifyContentLayout>
        <PolygonStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} symbolId={symbolId} />
    </PanelLayout>
}

export default PolygonSetting;
