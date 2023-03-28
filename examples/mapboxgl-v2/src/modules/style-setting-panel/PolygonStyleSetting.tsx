import React, { useEffect, useState } from 'react';
import ColorEditor from '../../components/color-editor';
import EditorLayout from '../../components/editor-layout';

interface PolygonStyleSettingtProps {
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    getLayerPropertyStyle: (id: string, key: string) => any;
    symbolId: string;
}


const PolygonStyleSetting = (props: PolygonStyleSettingtProps) => {
    const { changeLayerStyle, layerId, getLayerPropertyStyle, symbolId } = props;

    const defaultStyle = {
        color: '#fff'
    };

    const [style, setStyle] = useState(defaultStyle);

    const changeStyle = (key, value): void => {
        setStyle({ ...style, [key]: value });
    };

    useEffect(() => {
        setStyle({
            color: getLayerPropertyStyle(layerId, 'color')
        });
    }, [symbolId]);

    const { color } = style;

    const onColorChange = (color: any) => {
        const { r, g, b, a } = color.rgb;
        const rgba = `rgba(${r},${g},${b},${a})`;
        changeLayerStyle(layerId, 'color', rgba);
        changeStyle('color', rgba);
    };

    return (
        <div className='style-setting-content'>
            <div className='style-setting-item'>
                <EditorLayout title='颜色'>
                    <ColorEditor color={color} onColorChange={onColorChange} />
                </EditorLayout>
            </div>
        </div>
    )
}

export default PolygonStyleSetting;