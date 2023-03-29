import React, { useEffect, useState } from 'react';
import CheckBoxEditor from '../../components/check-box-editor';
import ColorEditor from '../../components/color-editor';
import EditorLayout from '../../components/editor-layout';
import NumberEditor from '../../components/number-editor';
import SelectEditor from '../../components/select-editor';

interface TextStyleSettingProps {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
}

const TextStyleSetting = (props: TextStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle } = props;
    const defaultStyle = {
        size: 1,
        color: '#000',
        translateX: 0,
        translateY: 0,
        opacity: 1,
        anchor: 'center',
        allowOverlap: false
    };
    const [style, setStyle] = useState(defaultStyle);

    useEffect(() => {
        setStyle({
            size: getLayerPropertyStyle(layerId, 'size'),
            color: getLayerPropertyStyle(layerId, 'color'),
            translateX: getLayerPropertyStyle(layerId, 'translate')?.[0] ?? 0,
            translateY: getLayerPropertyStyle(layerId, 'translate')?.[1] ?? 0,
            opacity: getLayerPropertyStyle(layerId, 'opacity'),
            anchor: getLayerPropertyStyle(layerId, 'anchor') ?? 'center',
            allowOverlap: getLayerPropertyStyle(layerId, 'allowOverlap')
        });
    }, [layerId]);

    const { size, color, translateX, translateY, opacity, anchor, allowOverlap } = style;

    const changeStyle = (key, value): void => {
        setStyle({ ...style, [key]: value })
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeLayerStyle(layerId, 'color', rgba);
        changeStyle('color', rgba);
    };
    
    return (
        <div className='style-setting-content style-setting-text-content'>
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
                            changeLayerStyle(layerId, 'size', v);
                            changeStyle('size', v)
                        }}
                        min={0}
                        max={100}
                        suffix={'PX'}
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
                            changeLayerStyle(layerId, 'opacity', v);
                            changeStyle('opacity', v)
                        }}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='允许文字压盖'>
                    <CheckBoxEditor
                        checked={allowOverlap} onChange={(v) => {
                            changeStyle('allowOverlap', v.target.checked)
                            changeLayerStyle(layerId, 'allowOverlap', v.target.checked);
                        }} />
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
                        changeLayerStyle(layerId, 'anchor', v);
                        changeStyle('anchor', v)
                    }} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='偏移量X'>
                    <NumberEditor
                        min={-100}
                        max={100}
                        size={'middle'}
                        value={translateX}
                        onChange={(v: any) => {
                            changeLayerStyle(layerId, 'translate', [v, translateY]);
                            changeStyle('translateX', v);
                        }}
                        suffix={'PX'}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='偏移量Y'>
                    <NumberEditor
                        className='input-number-content'
                        min={-100}
                        max={100}
                        size={'middle'}
                        value={translateY}
                        onChange={(v: any) => {
                            changeLayerStyle(layerId, 'translate', [translateX, v]);
                            changeStyle('translateY', v);
                        }}
                        suffix={'PX'}
                    />
                </EditorLayout>
            </div>
        </div>
    )
}

export default TextStyleSetting;