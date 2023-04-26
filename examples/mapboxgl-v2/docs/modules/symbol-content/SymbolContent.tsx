import React from 'react';
import SymbolLayoutPanel from '../symbol-layout-panel';
import './style';

interface SymbolContentProps {
    type: string;
    BasicCategoryOptions?: {
        value: string;
        label: string;
    }[];
    BasicCategoryStyles?: {
        [name: string]: {
            value: string;
            label: string;
        }[]
    };
    BasicStyleIconIds?: {
        [name: string]: {
            [name: string]: {
                id: string;
                name: string;
            }[]
        } | {
            id: string;
            name: string;
        }[]
    };
    AutoCategoryOptions?: {
        value: string;
        label: string;
    }[];
    AutoCategoryStyles?: {
        [name: string]: {
            value: string;
            label: string;
        }[]
    };
    AutoStyleIconIds?: {
        [name: string]: {
            id: string;
            name: string;
        }[]
    };
    LandCategoryOptions?: {
        value: string;
        label: string;
    }[];
    LandStyleIconIds?: {
        id: string;
        name: string;
    }[] | {
        [name: string]: {
            id: string;
            name: string;
        }[]
    }
    ;
}
const SymbolContent = (props: SymbolContentProps) => {
    const { type, BasicStyleIconIds, BasicCategoryOptions, BasicCategoryStyles, AutoStyleIconIds, AutoCategoryOptions, LandStyleIconIds, LandCategoryOptions } = props;
    return (
        <div className='symbol-classify-content'>
            <div className='symbol-classify-title' id={type + '-base'}>基础符号</div>
            <SymbolLayoutPanel ids={BasicStyleIconIds} options={BasicCategoryOptions} styles={BasicCategoryStyles} type={type} />
            <div className='symbol-classify-title' id={type + '-auto'}>自动制图符号</div>
            <SymbolLayoutPanel ids={AutoStyleIconIds} options={AutoCategoryOptions} type={type} />
            <div className='symbol-classify-title' id={type + '-land'}>国土三调符号</div>
            <SymbolLayoutPanel ids={LandStyleIconIds} options={LandCategoryOptions} type={type} />
        </div>
    )
}

export default SymbolContent;