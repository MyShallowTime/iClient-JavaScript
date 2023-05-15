import React, { useEffect, useState } from 'react';
import ColorEditor from '../../components/color-editor';
import EditorLayout from '../../components/editor-layout';
import NumberEditor from '../../components/number-editor';
import InputNumbersEditor from '../../components/input-numbers-editor';

interface CircleStyleSettingProps {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
}

const CircleStyleSetting = (props: CircleStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle } = props;
    const defaultStyle = {
        radius: 0,
        color: '#000',
        translate: [0, 0],
        opacity: 1,
        blur: 0,
        strokeColor: '#FFF',
        strokeOpacity: 1,
        strokeWidth: 0
    };
    const [style, setStyle] = useState(defaultStyle);

    useEffect(() => {
        setStyle({
            radius: getLayerPropertyStyle(layerId, 'radius') ?? defaultStyle.radius,
            color: getLayerPropertyStyle(layerId, 'color') ?? defaultStyle.color,
            opacity: getLayerPropertyStyle(layerId, 'opacity') ?? defaultStyle.opacity,
            blur: getLayerPropertyStyle(layerId, 'blur') ?? defaultStyle.blur,
            strokeColor: getLayerPropertyStyle(layerId, 'strokeColor') ?? defaultStyle.strokeColor,
            strokeOpacity: getLayerPropertyStyle(layerId, 'strokeOpacity') ?? defaultStyle.strokeOpacity,
            strokeWidth: getLayerPropertyStyle(layerId, 'strokeWidth') ?? defaultStyle.strokeWidth,
            translate: getLayerPropertyStyle(layerId, 'translate') ?? defaultStyle.translate
        });
    }, [layerId]);

    const { radius, color, translate=[], opacity, blur, strokeColor, strokeOpacity, strokeWidth } = style;

    const changeStyle = (key, value): void => {
        changeLayerStyle(layerId, key, value);
        setStyle({ ...style, [key]: value });
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('color', rgba);
    };

    const onStrokeColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('strokeColor', rgba);
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
                        value={radius * 2}
                        onChange={(v: any) => {
                            changeStyle('radius', v / 2);
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
                <EditorLayout title='模糊度'>
                    <NumberEditor
                        value={blur}
                        onChange={(v: any) => {
                            changeStyle('blur', v);
                        }}
                        min={0}
                        max={10}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='图形边框颜色'>
                    <ColorEditor color={strokeColor} onColorChange={onStrokeColorChange} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='图形边框透明度'>
                    <NumberEditor
                        min={0}
                        max={1}
                        step={0.1}
                        size={'middle'}
                        value={strokeOpacity}
                        onChange={(v: any) => {
                            changeStyle('strokeOpacity', v);
                        }}
                        precision={2}
                    />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='图形边框大小'>
                    <NumberEditor
                        min={0}
                        max={100}
                        step={1}
                        size={'middle'}
                        value={strokeWidth}
                        onChange={(v: any) => {
                            changeStyle('strokeWidth', v);
                        }}
                        suffix={'PX'}
                        precision={2}
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

export default CircleStyleSetting;