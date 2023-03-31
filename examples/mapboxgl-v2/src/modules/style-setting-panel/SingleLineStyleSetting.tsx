import React, { useEffect, useState } from 'react';
import EditorLayout from '../../components/editor-layout';
import ColorEditor from '../../components/color-editor';
import NumberEditor from '../../components/number-editor';

interface SingleLineStyleContentProps {
    layerId: string;
    symbolId: string;
    wholeWidth: number;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    updateWholeWidth: () => void;
}

const SingleLineStyleSetting = (props: SingleLineStyleContentProps) => {
    const { layerId, symbolId, wholeWidth, changeLayerStyle, getLayerPropertyStyle, updateWholeWidth } = props;

    const defaultStyle = {
        width: 1,
        offset: 0,
        color: '#000'
    };

    const [style, setStyle] = useState(defaultStyle);

    const changeStyle = (key, value): void => {
        setStyle({ ...style, [key]: value });
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeLayerStyle(layerId, 'color', rgba);
        changeStyle('color', rgba);
    };

    useEffect(() => {
        setStyle({
            width: getLayerPropertyStyle(layerId, 'width'),
            color: getLayerPropertyStyle(layerId, 'color'),
            offset: getLayerPropertyStyle(layerId, 'offset') ?? 0
        });
    }, [layerId, symbolId, wholeWidth]);

    const { width, color, offset } = style;

    useEffect(() => {
        updateWholeWidth();
    }, [width, offset]);

    return (
        <>
            <div className='style-setting-item'>
                <EditorLayout title='颜色'>
                    <ColorEditor color={color} onColorChange={onColorChange} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='线宽'>
                    <NumberEditor
                        value={width}
                        onChange={(v: any) => {
                            changeLayerStyle(layerId, 'width', v);
                            changeStyle('width', v);
                        }}
                        min={0}
                        max={100}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='偏移量'>
                    <NumberEditor
                        value={offset}
                        onChange={(v: any) => {
                            changeLayerStyle(layerId, 'offset', v);
                            changeStyle('offset', v);
                        }}
                        min={-100}
                        max={100}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
        </>
    )
}

export default SingleLineStyleSetting;