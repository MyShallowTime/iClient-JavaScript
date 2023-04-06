import React from 'react';
import PanelLayout from '../../components/panel-layout';
import CircleStyleSetting from '../style-setting-panel/CircleStyleSetting';

type CircleSettingProps = {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
};

const CircleSetting = (props: CircleSettingProps) => {
    const { layerId, changeLayerStyle, getLayerPropertyStyle, onClosePanal } = props;

    return (
        <PanelLayout className='circle-setting-panel' title={layerId} onClickClose={onClosePanal}>
            <CircleStyleSetting layerId={layerId} changeLayerStyle={changeLayerStyle} getLayerPropertyStyle={getLayerPropertyStyle} />
        </PanelLayout>
    )
};

export default CircleSetting;