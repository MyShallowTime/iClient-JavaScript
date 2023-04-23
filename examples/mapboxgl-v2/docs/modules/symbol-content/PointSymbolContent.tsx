import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles, AutoCategoryOptions, AutoStyleIconIds, LandCategoryOptions, LandStyleIconIds } from '../../../static/symbol-infos/PointInfo';
import React from 'react';
import SymbolContent from './SymbolContent';

const PointSymbolContent = () => {
    return (
        <SymbolContent type='point' BasicStyleIconIds={BasicStyleIconIds} BasicCategoryOptions={BasicCategoryOptions} BasicCategoryStyles={BasicCategoryStyles} AutoCategoryOptions={AutoCategoryOptions} AutoStyleIconIds={AutoStyleIconIds} LandCategoryOptions={LandCategoryOptions} LandStyleIconIds={LandStyleIconIds} />
    )
}

export default PointSymbolContent;