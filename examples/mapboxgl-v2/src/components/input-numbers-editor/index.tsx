import { InputNumberProps } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';
import NumberEditor from '../number-editor';

interface InputNumbersEditorProps extends InputNumberProps {
    values: any[];
    subfix?: string[];
    onChange?: (v: any) => void;
    onBlur?: (v: any) => void;
}
const InputNumbersEditor = (props: InputNumbersEditorProps) => {
    const { values, onChange, onBlur, min, max, suffix, subfix, disabled = false, className, ...restProps } = props;

    return (
        <div className="input-numbers-component">
            {values.map((value, index) => {
                return (
                    <div className='input-numbers-item' key={index}>
                        <NumberEditor
                            min={min}
                            max={max}
                            size={'middle'}
                            value={value}
                            onChange={(v) => {
                                values[index] = v;
                                onChange?.(values);
                            }}
                            onBlur={(v) => {
                                values[index] = v;
                                onBlur?.(values);
                            }}
                            suffix={suffix}
                            disabled={disabled}
                            {...restProps}
                        />
                        {subfix && (
                            <span className="input-numbers-item-subfix">{subfix?.[index] ?? subfix}</span>
                        )}
                    </div>
                )
            })}
        </div>

    )
}

export default InputNumbersEditor;
