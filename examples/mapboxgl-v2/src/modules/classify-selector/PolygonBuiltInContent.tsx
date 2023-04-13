import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, AutoCategoryOptions, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../constants/PolygonInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface PolygonBuiltInContentProps {
    onIconClick: (id: string) => void;
}

const PolygonBuiltInContent = (props: PolygonBuiltInContentProps) => {
    const { onIconClick } = props;
    const baseSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType='base' options={BasicCategoryOptions} iconIds={BasicStyleIconIds}  type='polygon' />
    const autoSelectorConent = <SymbolSelector onIconClick={onIconClick} symbolType='auto' options={AutoCategoryOptions} iconIds={AutoStyleIconIds} type='polygon' />
    const landSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType='land' options={LandCategoryOptions} iconIds={LandStyleIconIds} type='polygon' />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default PolygonBuiltInContent;