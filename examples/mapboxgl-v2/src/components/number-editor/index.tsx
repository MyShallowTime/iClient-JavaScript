import { InputNumber, InputNumberProps } from '@ispeco/iptl-components-react';
import React from 'react';
import classnames from 'classnames';
import './style';

interface NumberEditorProps extends InputNumberProps {

}
const NumberEditor = (props: NumberEditorProps) => {
    const { value, onChange, min, max, suffix, disabled = false, className, ...restProps } = props;

    return (
        <InputNumber
            className={classnames('input-number-content', className)}
            min={min}
            max={max}
            size={'middle'}
            value={value}
            onChange={onChange}
            suffix={suffix}
            disabled={disabled}
            {...restProps}
        />
    )
}

export default NumberEditor;
