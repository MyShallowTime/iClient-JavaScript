import React, { useEffect, useState } from 'react';
import { ScrollPanel } from '@ispeco/iptl-components-react';
import SingleLineStyleSetting from './SingleLineStyleSetting';
// import SingleLineStyleContent from './SingleLineStyleContent';

interface LineStyleSettingProps {
    layerId: string;
    symbolId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    getCompositeLayersIds: (layerId: string) => string[];
}


const LineStyleSetting = (props: LineStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, symbolId, getCompositeLayersIds } = props;
    const [lineIds, setLineIds] = useState<string[]>([]);
    useEffect(() => {
        setLineIds(getCompositeLayersIds(layerId) ?? [layerId]);
    }, [symbolId]);
    
    const getContent = () => {
        return lineIds?.map((id, index) => {
            return (
                <SingleLineStyleSetting key={id} layerId={id} changeLayerStyle={changeLayerStyle} getLayerPropertyStyle={getLayerPropertyStyle} symbolId={symbolId} index={index} />
            )
        })
    }
    return (
        <div className='style-setting-content'>
            <ScrollPanel style={{ height: 150, width: '100%' }}>
                {getContent()}
            </ScrollPanel>
        </div>
    )
}

export default LineStyleSetting;