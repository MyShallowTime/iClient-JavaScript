import React from 'react';
import PanelLayout from '../../components/panel-layout';
import TextStyleSetting from '../style-setting-panel/TextStyleSetting';

type TextSettingProps = {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
};

const TextSetting = (props: TextSettingProps) => {
    const { layerId, changeLayerStyle, getLayerPropertyStyle, onClosePanal } = props;

    return <PanelLayout className='text-setting-panel' title={layerId} onClickClose={onClosePanal}>
        <TextStyleSetting layerId={layerId} changeLayerStyle={changeLayerStyle} getLayerPropertyStyle={getLayerPropertyStyle} />
    </PanelLayout>
}

export default TextSetting;