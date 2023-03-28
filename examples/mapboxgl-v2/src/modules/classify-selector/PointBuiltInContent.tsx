import React from 'react';
import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles,AutoCategoryOptions, AutoCategoryStyles, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../constants/PointInfo';
import ClassifyTabs from '../../components/classify-tabs';
import SymbolSelector from '../symbol-selector';

interface PointBuiltInContentProps {
    onIconClick: (id: string) => void;
}

const PointBuiltInContent = (props: PointBuiltInContentProps) => {
    const { onIconClick } = props;
    const baseSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'base'} options={BasicCategoryOptions} styles={BasicCategoryStyles} iconIds={BasicStyleIconIds} secondSelectionName='风格' type={'point'} />
    const autoSelectorConent = <SymbolSelector onIconClick={onIconClick} symbolType={'auto'} options={AutoCategoryOptions} styles={AutoCategoryStyles} iconIds={AutoStyleIconIds} secondSelectionName='比例尺' type={'point'} />
    const landSelectorContent = <SymbolSelector onIconClick={onIconClick} symbolType={'land'} options={LandCategoryOptions} iconIds={LandStyleIconIds} type={'point'} />

    return (
        <ClassifyTabs
            baseSelectorContent={baseSelectorContent}
            autoSelectorConent={autoSelectorConent}
            landSelectorContent={landSelectorContent}
        />
    )
}

export default PointBuiltInContent;