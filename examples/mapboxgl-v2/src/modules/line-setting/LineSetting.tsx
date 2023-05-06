import React from 'react';
import PanelLayout from '../../components/panel-layout';
import LineBuiltInContent from '../classify-selector/LineBuiltInContent';
import LineStyleSetting from '../style-setting-panel/LineStyleSetting';

type LineSettingProps = {
    layerId: string;
    selectedSymbolId: string;
    onIconClick: (selectedSymbolId: string) => Promise<void>;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    getCompositeLayersIds: (layerId: string) => string[];
    onClosePanal: () => void;
};

const LineSetting = (props: LineSettingProps) => {
    const { layerId, selectedSymbolId, onIconClick, changeLayerStyle, getLayerPropertyStyle, getCompositeLayersIds, onClosePanal } = props;

    return (
        <PanelLayout className='line-setting-panel' title={layerId} onClickClose={onClosePanal}>
            <LineBuiltInContent onIconClick={onIconClick} selectedSymbolId={selectedSymbolId} key={layerId} />
            <LineStyleSetting layerId={layerId} getLayerPropertyStyle={getLayerPropertyStyle} changeLayerStyle={changeLayerStyle} selectedSymbolId={selectedSymbolId} getCompositeLayersIds={getCompositeLayersIds} />
        </PanelLayout>
    )
}

export default LineSetting;
