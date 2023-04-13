import { Input, Icon } from '@ispeco/iptl-components-react';
import React, { useState } from 'react';
import './style';
type SearchEditorProps = {
    onSearchValueChange: (v: string) => void;
}

const SearchEditor = (props: SearchEditorProps) => {
    const { onSearchValueChange } = props;
    const [value, setValue] = useState('');
    const onClose = () => {
        setValue('');
        onSearchValueChange('');
    };
    return <Input
        className='style-setting-search'
        placeholder='请输入符号名称搜索'
        value={value}
        onChange={(v) => {
            setValue(v.target.value);
            onSearchValueChange(v.target.value);
        }}
        suffix={<>
            {value && <Icon
                type="ms-icons-close"
                className="style-setting-search-close"
                onClick={onClose} />}
        </>}
    />
}

export default SearchEditor;
