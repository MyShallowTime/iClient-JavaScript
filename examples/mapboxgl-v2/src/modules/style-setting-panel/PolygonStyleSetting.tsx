import React, { useEffect, useState } from 'react';
import ColorEditor from '../../components/color-editor';
import EditorLayout from '../../components/editor-layout';
import NumberEditor from '../../components/number-editor';

interface PolygonStyleSettingtProps {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    selectedSymbolId: string;
}


const PolygonStyleSetting = (props: PolygonStyleSettingtProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, selectedSymbolId } = props;

    const defaultStyle = {
        color: '#fff',
        opacity: 1,
        image: ''
    };

    const [style, setStyle] = useState(defaultStyle);

    const changeStyle = (key, value): void => {
        changeLayerStyle(layerId, key, value);
        setStyle({ ...style, [key]: value });
    };

    useEffect(() => {
        setStyle({
            color: getLayerPropertyStyle(layerId, 'color') ?? defaultStyle.color,
            opacity: getLayerPropertyStyle(layerId, 'opacity') ?? defaultStyle.opacity,
            image: getLayerPropertyStyle(layerId, 'image') ?? defaultStyle.image
        });
    }, [selectedSymbolId]);

    const { color, opacity, image } = style;

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeStyle('color', rgba);
    };

    return (
        <div className='style-setting-content'>
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
        </div>
    )
}

export default PolygonStyleSetting;