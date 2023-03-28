import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, AutoCategoryOptions, AutoCategoryStyles, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../constants/PolygonInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface PointBuiltInContentProps {
    onIconClick: (id: string) => void;
}

const PointBuiltInContent = (props: PointBuiltInContentProps) => {
    const { onIconClick } = props;
    const baseSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'base'} options={BasicCategoryOptions} iconIds={BasicStyleIconIds} secondSelectionName='风格' type={'polygon'} />
    const autoSelectorConent = <SymbolSelector onIconClick={onIconClick} symbolType={'auto'} options={AutoCategoryOptions} styles={AutoCategoryStyles} iconIds={AutoStyleIconIds} secondSelectionName='比例尺' type={'polygon'} />
    const landSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'land'} options={LandCategoryOptions} iconIds={LandStyleIconIds} type={'polygon'} />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default PointBuiltInContent;