import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles,AutoCategoryOptions, AutoCategoryStyles, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../constants/LineInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface LineBuiltInContentProps {
    onIconClick: (id: string) => void;
}

const LineBuiltInContent = (props: LineBuiltInContentProps) => {
    const { onIconClick } = props;
    const baseSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'base'} options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds} secondSelectionName='风格' type={'line'} />
    const autoSelectorConent = <SymbolSelector onIconClick={onIconClick} symbolType={'auto'} options={AutoCategoryOptions} styles={AutoCategoryStyles} iconIds={AutoStyleIconIds} secondSelectionName='比例尺' type={'line'} />
    const landSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'land'} options={LandCategoryOptions} iconIds={LandStyleIconIds} type={'line'} />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default LineBuiltInContent;