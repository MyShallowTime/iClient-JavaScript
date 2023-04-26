import { BasicCategoryOptions, BasicStyleIconIds, AutoCategoryOptions, AutoStyleIconIds, LandStyleIconIds, LandCategoryOptions } from '../../../static/symbol-infos/PolygonInfo';
import React from 'react';
import SymbolContent from './SymbolContent';

const PolygonSymbolContent = () => {
    return (
        <SymbolContent type='polygon' BasicStyleIconIds={BasicStyleIconIds} BasicCategoryOptions={BasicCategoryOptions} AutoCategoryOptions={AutoCategoryOptions} AutoStyleIconIds={AutoStyleIconIds} LandCategoryOptions={LandCategoryOptions} LandStyleIconIds={LandStyleIconIds} />
    )
}

export default PolygonSymbolContent;