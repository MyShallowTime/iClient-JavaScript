import { IptlCheckbox, IptlCheckboxProps } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';
interface CheckBoxEditorProps extends IptlCheckboxProps {}

const CheckBoxEditor = (props: CheckBoxEditorProps) => {

    return <IptlCheckbox {...props} />
}

export default CheckBoxEditor;
