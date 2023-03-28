import { Input, Icon } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';
type SearchEditorProps = {
}

const SearchEditor = (props: SearchEditorProps) => {
    const { } = props;
    return <Input placeholder='请输入符号名称搜索' suffix={<Icon type="ms-icons-search" className="style-setting-search-button" />} className='style-setting-search' />
}

export default SearchEditor;
