import { BasicCategoryOptions, BasicStyleIconIds, BasicCategoryStyles, AutoCategoryOptions, AutoStyleIconIds, LandStyleIconIds } from '../../../static/symbol-infos/LineInfo';
import React from 'react';
import SymbolContent from './SymbolContent';

const LineSymbolContent = () => {
    return (
        <SymbolContent type='line' BasicStyleIconIds={BasicStyleIconIds} BasicCategoryOptions={BasicCategoryOptions} BasicCategoryStyles={BasicCategoryStyles} AutoCategoryOptions={AutoCategoryOptions} AutoStyleIconIds={AutoStyleIconIds} LandStyleIconIds={LandStyleIconIds} />
    )
}

export default LineSymbolContent;