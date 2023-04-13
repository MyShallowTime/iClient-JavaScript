import React from 'react';
import ClassifyContentLayout from '../../components/classify-content-layout';
import PanelLayout from '../../components/panel-layout';
import LineBuiltInContent from '../classify-selector/LineBuiltInContent';
import LineStyleSetting from '../style-setting-panel/LineStyleSetting';

type LineSettingProps = {
    layerId: string;
    symbolId: string;
    onIconClick: (symbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    getCompositeLayersIds: (layerId: string) => string[];
    onClosePanal: () => void;
};

const LineSetting = (props: LineSettingProps) => {
    const { layerId, symbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, getCompositeLayersIds, onClosePanal } = props;

    return <PanelLayout className='line-setting-panel' title={layerId} onClickClose={onClosePanal}>
        <ClassifyContentLayout>
            <LineBuiltInContent onIconClick={onIconClick} />
        </ClassifyContentLayout>
        <LineStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} symbolId={symbolId} getCompositeLayersIds={getCompositeLayersIds} />
    </PanelLayout>
}

export default LineSetting;
