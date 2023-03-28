import { Button, ColorPicker } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';

interface ColorEditorProps {
    color: string;
    onColorChange: (color: any) => void;
}

const ColorEditor = (props: ColorEditorProps) => {
    const { color, onColorChange } = props;

    return (
        <div className='color-picker-content' style={{ backgroundColor: "#FFFFFF" }}>
            <ColorPicker color={color} onChange={onColorChange}>
                <Button style={{ backgroundColor: color }} id='selected-color'></Button>
            </ColorPicker>
        </div>
    )

}

export default ColorEditor;
