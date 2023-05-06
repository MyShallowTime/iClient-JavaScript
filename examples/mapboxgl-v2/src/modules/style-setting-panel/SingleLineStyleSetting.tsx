import React, { useEffect, useState } from 'react';
import EditorLayout from '../../components/editor-layout';
import ColorEditor from '../../components/color-editor';
import NumberEditor from '../../components/number-editor';
import SelectEditor from '../../components/select-editor';
import InputNumbersEditor from '../../components/input-numbers-editor';

interface SingleLineStyleContentProps {
    layerId: string;
    selectedSymbolId: string;
    wholeWidth: number;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    updateWholeWidth: () => void;
}

const SingleLineStyleSetting = (props: SingleLineStyleContentProps) => {
    const { layerId, selectedSymbolId, wholeWidth, changeLayerStyle, getLayerPropertyStyle, updateWholeWidth } = props;

    const defaultStyle = {
        width: 1,
        offset: 0,
        color: '#000',
        opacity: 1,
        blur: 0,
        join: 'miter',
        cap: 'butt',
        translate: [0, 0],
        image: ''
    };

    const [style, setStyle] = useState(defaultStyle);

    const changeStyle = (key, value): void => {
        changeLayerStyle(layerId, key, value);
        setStyle({ ...style, [key]: value });
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('color', rgba);
    };

    useEffect(() => {
        setStyle({
            width: getLayerPropertyStyle(layerId, 'width'),
            color: getLayerPropertyStyle(layerId, 'color'),
            offset: getLayerPropertyStyle(layerId, 'offset'),
            opacity: getLayerPropertyStyle(layerId, 'opacity'),
            blur: getLayerPropertyStyle(layerId, 'blur'),
            join: getLayerPropertyStyle(layerId, 'join'),
            cap: getLayerPropertyStyle(layerId, 'cap'),
            translate: getLayerPropertyStyle(layerId, 'translate'),
            image: getLayerPropertyStyle(layerId, 'image')
        });
    }, [layerId, selectedSymbolId, wholeWidth]);

    const { width, color, offset, opacity, blur, join, cap, translate, image } = style;


    return (
        <>
            <div className='style-setting-item'>
                {!image && <EditorLayout title='颜色'>
                    <ColorEditor color={color} onColorChange={onColorChange} />
                </EditorLayout>}
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='透明度'>
                    <NumberEditor
                        value={opacity}
                        onChange={(v: any) => {
                            changeStyle('opacity', v);
                        }}
                        min={0}
                        max={1}
                        precision={1}
                        step={0.1}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='线宽'>
                    <NumberEditor
                        value={width}
                        onChange={(v: any) => {
                            changeStyle('width', v);
                            updateWholeWidth();
                        }}
                        min={0.01}
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
                            changeStyle('offset', v);
                            updateWholeWidth();
                        }}
                        min={-100}
                        max={100}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='模糊度'>
                    <NumberEditor
                        value={blur}
                        onChange={(v: any) => {
                            changeStyle('blur', v);
                        }}
                        min={0}
                        max={100}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='线段连接方式'>
                    <SelectEditor options={[
                        { label: 'bevel', value: 'bevel' },
                        { label: 'round', value: 'round' },
                        { label: 'miter', value: 'miter' }
                    ]} value={join} onChange={(v) => {
                        changeStyle('join', v)
                    }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='线段端点样式'>
                    <SelectEditor options={[
                        { label: 'butt', value: 'butt' },
                        { label: 'round', value: 'round' },
                        { label: 'square', value: 'square' }
                    ]} value={cap} onChange={(v) => {
                        changeStyle('cap', v)
                    }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='相对偏移值'>
                    <InputNumbersEditor
                        className='input-number-content'
                        min={-100}
                        max={100}
                        size={'middle'}
                        values={translate}
                        onChange={(values: any) => {
                            changeStyle('translate', values);
                        }}
                        suffix={'PX'}
                        subfix={['X', 'Y']}
                        precision={2}
                    />
                </EditorLayout>
            </div>
        </>
    )
}

export default SingleLineStyleSetting;