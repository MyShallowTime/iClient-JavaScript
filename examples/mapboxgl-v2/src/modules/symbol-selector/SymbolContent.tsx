import React from 'react';
import SelectEditor from '../../components/select-editor';
import { ScrollPanel } from '@ispeco/iptl-components-react';
import EditorLayout from '../../components/editor-layout';

const SymbolContent = (props: any) => {
    const { options, activeCategory, setActiveCategory, activeStyle, activeStyleOptions, setActiveStyle, children } = props;
    return (
        <div className='symbol-content'>
            {options && <EditorLayout title='类别'>
                <SelectEditor options={options} value={activeCategory} onChange={setActiveCategory} />
            </EditorLayout>}
            {activeStyle && <EditorLayout title='风格'>
                <SelectEditor options={activeStyleOptions} value={activeStyle} onChange={setActiveStyle} />
            </EditorLayout>}
            <ScrollPanel hideScrollX small style={{ height: activeStyle ? 428 : 468, marginTop: 16 }}>
                {children}
            </ScrollPanel>
        </div>
    )
}

export default SymbolContent;
