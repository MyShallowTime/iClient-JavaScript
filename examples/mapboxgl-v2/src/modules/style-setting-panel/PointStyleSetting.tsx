import React, { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import ColorEditor from '../../components/color-editor';
import NumberEditor from '../../components/number-editor';
import EditorLayout from '../../components/editor-layout';
import './style';
import InputNumbersEditor from '../../components/input-numbers-editor';

interface PointStyleSettingProps {
    layerId: string;
    selectedSymbolId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    getImageInfo: (id: string) => any;
}


const PointStyleSetting = (props: PointStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, getImageInfo, selectedSymbolId } = props;
    const defaultStyle = {
        size: 1,
        color: '#000',
        rotate: 0,
        opacity: 1,
        translate: [0, 0]
    };
    const [style, setStyle] = useState(defaultStyle);

    useEffect(() => {
        setStyle({
            size: getLayerPropertyStyle(layerId, 'size') ?? defaultStyle.size,
            color: getLayerPropertyStyle(layerId, 'color') ?? defaultStyle.color,
            rotate: getLayerPropertyStyle(layerId, 'rotate') ?? defaultStyle.rotate,
            opacity: getLayerPropertyStyle(layerId, 'opacity') ?? defaultStyle.opacity,
            translate: getLayerPropertyStyle(layerId, 'translate') ?? defaultStyle.translate
        });
    }, [selectedSymbolId]);

    const { size, color, translate=[], rotate, opacity } = style
    const isDataDrivenRotation = isArray(rotate) && isArray(rotate[1]);

    const changeStyle = (key, value): void => {
        changeLayerStyle(layerId, key, value);
        setStyle({ ...style, [key]: value })
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('color', rgba);
    };

    const image = getLayerPropertyStyle(layerId, 'image');
    const width = getImageInfo(image)?.width ?? 100;

    return (
        <div className='style-setting-content'>
            <div className='style-setting-item'>
                <EditorLayout title='颜色'>
                    <ColorEditor color={color} onColorChange={onColorChange} />
                </EditorLayout>
            </div>
            <div className='style-setting-item'>
                <EditorLayout title='大小'>
                    <NumberEditor
                        value={size * width}
                        onChange={(v: any) => {
                            changeStyle('size', v / width);
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
            <div className='style-setting-item'>
                <EditorLayout title='旋转角'>
                    <NumberEditor
                        value={isDataDrivenRotation ? rotate[1][1] : rotate}
                        onChange={(v: any) => {
                            changeStyle('rotate', v);
                        }}
                        suffix={!isDataDrivenRotation && '°'}
                        disabled={isDataDrivenRotation}
                        min={0}
                        max={100}
                        precision={2}
                    />
                </EditorLayout>
            </div>
        </div>
    )
}

export default PointStyleSetting;