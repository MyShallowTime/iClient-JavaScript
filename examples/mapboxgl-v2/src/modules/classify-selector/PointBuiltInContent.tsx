import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles, AutoCategoryOptions, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../../static/symbol-infos/PointInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface PointBuiltInContentProps {
    onIconClick: (id: string) => void;
    selectedSymbolId?: string;
}

const PointBuiltInContent = (props: PointBuiltInContentProps) => {
    const { selectedSymbolId, onIconClick } = props;
    const baseSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds} type='point' />
    const autoSelectorConent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='point' />
    const landSelectorContent = <SymbolSelector selectedSymbolId={selectedSymbolId} onIconClick={onIconClick} symbolType='land' options={LandCategoryOptions} iconIds={LandStyleIconIds} type='point' />

    return (
        <>
            <ClassifyTabs
                baseSelectorContent={baseSelectorContent}
                autoSelectorConent={autoSelectorConent}
                landSelectorContent={landSelectorContent}
            />
        </>
    )
}

export default PointBuiltInContent;