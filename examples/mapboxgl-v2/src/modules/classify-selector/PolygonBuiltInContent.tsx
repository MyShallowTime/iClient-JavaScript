import React, { useState } from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, AutoCategoryOptions, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../../static/symbol-infos/PolygonInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';
import SearchEditor from '../../components/search-editor';
import './style';

interface PolygonBuiltInContentProps {
    onIconClick: (id: string) => void;
    selectedSymbolId?: string;
}

const PolygonBuiltInContent = (props: PolygonBuiltInContentProps) => {
    const [searchValue, setSearchValue] = useState('');
    const { selectedSymbolId, onIconClick } = props;
    const baseSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} iconIds={BasicStyleIconIds} type='polygon' searchValue={searchValue} />
    const autoSelectorConent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='polygon' searchValue={searchValue} />
    const landSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='land' options={LandCategoryOptions} iconIds={LandStyleIconIds} type='polygon' searchValue={searchValue} />

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

export default PolygonBuiltInContent;