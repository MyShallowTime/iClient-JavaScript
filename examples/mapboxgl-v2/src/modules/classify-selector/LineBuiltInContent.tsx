import React, { useState } from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles, AutoCategoryOptions, AutoStyleIconIds, LandStyleIconIds } from '../../../static/symbol-infos/LineInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';
import SearchEditor from '../../components/search-editor';
import './style';

interface LineBuiltInContentProps {
    selectedSymbolId?: string;
    onIconClick: (id: string) => void;
}

const LineBuiltInContent = (props: LineBuiltInContentProps) => {
    const [searchValue, setSearchValue] = useState('');
    const { selectedSymbolId, onIconClick } = props;
    const baseSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds} type='line' searchValue={searchValue} />
    const autoSelectorConent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='line' searchValue={searchValue} />
    const landSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='land' iconIds={LandStyleIconIds} type='line' searchValue={searchValue} />

    return (
        <>
            <SearchEditor onSearchValueChange={(v) => {
                setSearchValue(v);
            }} />
            <ClassifyTabs
                baseSelectorContent={baseSelectorContent}
                autoSelectorConent={autoSelectorConent}
                landSelectorContent={landSelectorContent}
            />
        </>
    )
}

export default LineBuiltInContent;