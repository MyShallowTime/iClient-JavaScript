import React, { useEffect, useState } from 'react';
import CheckBoxEditor from '../../components/check-box-editor';
import ColorEditor from '../../components/color-editor';
import EditorLayout from '../../components/editor-layout';
import NumberEditor from '../../components/number-editor';
import SelectEditor from '../../components/select-editor';
import InputNumbersEditor from '../../components/input-numbers-editor';

interface TextStyleSettingProps {
    layerId: string;
    fields: string[];
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
}

const TextStyleSetting = (props: TextStyleSettingProps) => {
    const { layerId, fields, changeLayerStyle, getLayerPropertyStyle } = props;
    const defaultStyle = {
        size: 1,
        color: '#000',
        opacity: 1,
        anchor: 'center',
        allowOverlap: false,
        haloWidth: 0,
        spacing: 0,
        fontFamily: ["Open Sans Regular", "Arial Unicode MS Regular"],
        field: '',
        translate: [0, 0]
    };
    const [style, setStyle] = useState(defaultStyle);

    useEffect(() => {
        setStyle({
            size: getLayerPropertyStyle(layerId, 'size'),
            color: getLayerPropertyStyle(layerId, 'color'),
            opacity: getLayerPropertyStyle(layerId, 'opacity'),
            anchor: getLayerPropertyStyle(layerId, 'anchor'),
            allowOverlap: getLayerPropertyStyle(layerId, 'allowOverlap'),
            haloWidth: getLayerPropertyStyle(layerId, 'haloWidth'),
            spacing: getLayerPropertyStyle(layerId, 'spacing'),
            fontFamily: getLayerPropertyStyle(layerId, 'fontFamily'),
            field: getLayerPropertyStyle(layerId, 'field'),
            translate: getLayerPropertyStyle(layerId, 'translate')
        });
    }, [layerId]);

    const { size, color, opacity, anchor, allowOverlap, haloWidth, spacing, fontFamily, field, translate } = style;

    const changeStyle = (key, value): void => {
        changeLayerStyle(layerId, key, value);
        setStyle({ ...style, [key]: value })
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('color', rgba);
    };

    return (
        <div className='style-setting-content style-setting-text-content'>
            <div className='style-setting-item'>
                <EditorLayout title='文本字段'>
                    <SelectEditor
                        options={fields.map((field) => {
                            return {
                                label: field,
                                value: `{${field}}`
                            }
                        })}
                        value={field} onChange={(v) => {
                            changeStyle('field', v);
                        }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='颜色'>
                    <ColorEditor color={color} onColorChange={onColorChange} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='大小'>
                    <NumberEditor
                        value={size}
                        onChange={(v: any) => {
                            changeStyle('size', v);
                        }}
                        min={0}
                        max={100}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='透明度'>
                    <NumberEditor
                        min={0}
                        max={1}
                        step={0.1}
                        size={'middle'}
                        value={opacity}
                        onChange={(v: any) => {
                            changeStyle('opacity', v);
                        }}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='文本间距'>
                    <NumberEditor
                        min={0}
                        max={100}
                        size={'middle'}
                        value={spacing}
                        onChange={(v: any) => {
                            changeStyle('spacing', v);
                        }}
                        suffix={'ems'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='允许文字压盖'>
                    <CheckBoxEditor
                        checked={allowOverlap} onChange={(v) => {
                            changeStyle('allowOverlap', v.target.checked);
                        }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='晕轮宽度'>
                    <NumberEditor
                        value={haloWidth}
                        onChange={(v: any) => {
                            changeStyle('haloWidth', v);
                        }}
                        min={0}
                        max={size / 4}
                        suffix={'PX'}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='文字排版锚点'>
                    <SelectEditor options={[
                        { label: 'left', value: 'left' },
                        { label: 'center', value: 'center' },
                        { label: 'right', value: 'right' },
                        { label: 'top', value: 'top' },
                        { label: 'bottom', value: 'bottom' },
                        { label: 'top-left', value: 'top-left' },
                        { label: 'top-right', value: 'top-right' },
                        { label: 'bottom-left', value: 'bottom-left' },
                        { label: 'bottom-right', value: 'bottom-right' }
                    ]} value={anchor} onChange={(v) => {
                        changeStyle('anchor', v);
                    }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='字体' className='font-family-layout'>
                    <SelectEditor
                        value={fontFamily}
                        mode={'tags'}
                        disabled={true}
                    />
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
        </div>
    )
}

export default TextStyleSetting;