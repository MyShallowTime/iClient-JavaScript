import React from 'react';
import ClassifyContentLayout from '../../components/classify-content-layout';
import PanelLayout from '../../components/panel-layout'
import PointBuiltInContent from '../classify-selector/PointBuiltInContent';
import PointStyleSetting from '../style-setting-panel/PointStyleSetting';

type PointSettingProps = {
    layerId: string;
    symbolId: string;
    onIconClick: (symbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
    getImageInfo: (id: string) => any;
}

const PointSetting = (props: PointSettingProps) => {
    const { layerId, symbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, onClosePanal, getImageInfo } = props;

    return (
        <PanelLayout className='point-setting-panel' title={layerId} onClickClose={onClosePanal} >
            <ClassifyContentLayout>
                <PointBuiltInContent onIconClick={onIconClick} />
            </ClassifyContentLayout>
            <PointStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} symbolId={symbolId} getImageInfo={getImageInfo} />
        </PanelLayout >
    )
}

export default PointSetting;
