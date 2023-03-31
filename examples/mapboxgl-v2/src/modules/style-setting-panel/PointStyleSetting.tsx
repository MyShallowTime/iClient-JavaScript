import React, { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import ColorEditor from '../../components/color-editor';
import NumberEditor from '../../components/number-editor';
import EditorLayout from '../../components/editor-layout';
import './style';

interface PointStyleSettingProps {
    layerId: string;
    symbolId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    getImageInfo: (id: string) => any;
}


const PointStyleSetting = (props: PointStyleSettingProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, getImageInfo, symbolId } = props;
    const defaultStyle = {
        size: 1,
        color: '#fff',
        rotate: 0
    };
    const [style, setStyle] = useState(defaultStyle);

    useEffect(() => {
        setStyle({
            ...style,
            size: getLayerPropertyStyle(layerId, 'size') ?? 1,
            color: getLayerPropertyStyle(layerId, 'color'),
            rotate: getLayerPropertyStyle(layerId, 'rotate') ?? 0
        });
    }, [symbolId]);

    const { size, color, rotate } = style
    const isDataDrivenRotation = isArray(rotate) && isArray(rotate[1]);

    const changeStyle = (key, value): void => {
        setStyle({ ...style, [key]: value })
    };

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeLayerStyle(layerId, 'color', rgba);
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
                            changeLayerStyle(layerId, 'size', v / width);
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
                <EditorLayout title='旋转角'>
                    <NumberEditor
                        value={isDataDrivenRotation ? rotate[1][1] : rotate}
                        onChange={(v: any) => {
                            changeLayerStyle(layerId, 'rotate', v);
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