import React from 'react';
import PointSymbolContent from '../symbol-content/PointSymbolContent';
import LineSymbolContent from '../symbol-content/LineSymbolContent';
import PolygonSymbolContent from '../symbol-content/PolygonSymbolContent';
import Anchor from '../anchor';
import './style';

const SymbolContainer = () => {

    return (
        <div className='symbol-content'>
            <div className='symbol-type-content'>
                <div className='symbol-content-title' id='point'>点符号</div>
                <PointSymbolContent />
            </div>
            <div className='symbol-type-content'>
                <div className='symbol-content-title' id='line'>线符号</div>
                <LineSymbolContent />
            </div>
            <div className='symbol-type-content'>
                <div className='symbol-content-title' id='polygon'>面符号</div>
                <PolygonSymbolContent />
            </div>
            <Anchor />
        </div>
    )
}

export default SymbolContainer;
