import React, { useEffect, useState } from 'react';
import PanelLayout from '../../components/panel-layout';
import TextStyleSetting from '../style-setting-panel/TextStyleSetting';
import { getFieldsBySourceLayer } from '../../utils/IserverRequestUtil';

type TextSettingProps = {
    layerId: string;
    url: string;
    sourceLayer: string;
    changeLayerStyle: (layerId: string, key: string, value: string) => void;
    getLayerPropertyStyle: (layerId: string, key: string) => any;
    onClosePanal: () => void;
};

const TextSetting = (props: TextSettingProps) => {
    const { layerId, url, sourceLayer, changeLayerStyle, getLayerPropertyStyle, onClosePanal } = props;
    const [fields, setFields] = useState<string[]>([]);
    const getFields = async () => {
        const f = await getFieldsBySourceLayer(url, sourceLayer);
        setFields(f);
    };
    useEffect(() => {
        getFields();
    }, [sourceLayer]);

    return <PanelLayout className='text-setting-panel' title={layerId} onClickClose={onClosePanal}>
        <TextStyleSetting layerId={layerId} changeLayerStyle={changeLayerStyle} getLayerPropertyStyle={getLayerPropertyStyle} fields={fields} />
    </PanelLayout>
}

export default TextSetting;