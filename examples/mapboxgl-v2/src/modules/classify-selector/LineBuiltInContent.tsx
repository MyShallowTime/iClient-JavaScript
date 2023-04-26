import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles,AutoCategoryOptions, AutoStyleIconIds, LandStyleIconIds } from '../../../static/symbol-infos/LineInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface LineBuiltInContentProps {
    onIconClick: (id: string) => void;
}

const LineBuiltInContent = (props: LineBuiltInContentProps) => {
    const { onIconClick } = props;
    const baseSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds}  type='line' />
    const autoSelectorConent = <SymbolSelector onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='line' />
    const landSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType='land' iconIds={LandStyleIconIds} type='line' />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default LineBuiltInContent;