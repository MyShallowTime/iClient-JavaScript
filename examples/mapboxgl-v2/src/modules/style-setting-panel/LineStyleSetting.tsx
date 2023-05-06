import React, { useEffect, useState } from 'react';
import SingleLineStyleSetting from './SingleLineStyleSetting';
import EditorLayout from '../../components/editor-layout';
import NumberEditor from '../../components/number-editor';

interface LineStyleSettingProps {
    layerId: string;
    selectedSymbolId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    getCompositeLayersIds: (layerId: string) => string[];
}


const LineStyleSetting = (props: LineStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, selectedSymbolId, getCompositeLayersIds } = props;
    const [lineIds, setLineIds] = useState<string[]>([]);
    const [wholeWidth, setWholeWidth] = useState(0);
    const isSingleLine = lineIds.length === 1;

    const updateWholeWidth = (): void => {
        let topBoundary;
        let bottomBoundary;
        lineIds.forEach((id) => {
            const width = getLayerPropertyStyle(id, 'width');
            const offset = getLayerPropertyStyle(id, 'offset');
            const top = offset + width / 2;
            const bottom = offset - width / 2;
            (top > topBoundary || topBoundary === undefined) && (topBoundary = top);
            (bottom < bottomBoundary || bottomBoundary === undefined) && (bottomBoundary = bottom);
        });
        setWholeWidth(topBoundary - bottomBoundary);
    };

    useEffect(() => {
        const ids = getCompositeLayersIds(layerId);
        setLineIds(ids ?? [layerId]);
    }, [selectedSymbolId]);

    useEffect(() => {
        updateWholeWidth();
    }, [lineIds, selectedSymbolId]);

    const getDashArray = (id, percent) => {
       const beforeDash = getLayerPropertyStyle(id, 'dasharray'); 
       const result = beforeDash.map(v => {
            return v / percent;
       });
       return result;
    }

    return (
        <div className='style-setting-content'>
            {!isSingleLine && <div className='style-setting-item'>
                <EditorLayout title='整体线宽'>
                    <NumberEditor
                        value={wholeWidth}
                        onChange={(v: any) => {
                            if (v === 0) return;
                            const percent = v / wholeWidth;
                            lineIds.forEach(id => {
                                changeLayerStyle(id, 'width', getLayerPropertyStyle(id, 'width') * percent);
                                changeLayerStyle(id, 'offset', getLayerPropertyStyle(id, 'offset') * percent);
                                changeLayerStyle(id, 'dasharray', getDashArray(id, percent));
                                setWholeWidth(v);
                            });
                        }}
                        min={0.01}
                        max={100}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>}
            {lineIds?.map((id, index) => {
                return (
                    <div key={id}>
                        {!isSingleLine && <div className='style-item-title'>{`线段${index + 1}:`}</div>}
                        <SingleLineStyleSetting layerId={id} changeLayerStyle={changeLayerStyle} getLayerPropertyStyle={getLayerPropertyStyle} selectedSymbolId={selectedSymbolId} wholeWidth={wholeWidth} updateWholeWidth={updateWholeWidth} />
                    </div>
                )
            })}
        </div>
    )
}

export default LineStyleSetting;