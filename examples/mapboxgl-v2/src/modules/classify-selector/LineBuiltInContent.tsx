import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles,AutoCategoryOptions, AutoStyleIconIds, LandStyleIconIds } from '../../../static/symbol-infos/LineInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface LineBuiltInContentProps {
    selectedSymbolId?: string;
    onIconClick: (id: string) => void;
}

const LineBuiltInContent = (props: LineBuiltInContentProps) => {
    const { selectedSymbolId, onIconClick } = props;
    const baseSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds}  type='line' />
    const autoSelectorConent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='line' />
    const landSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='land' iconIds={LandStyleIconIds} type='line' />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default LineBuiltInContent;