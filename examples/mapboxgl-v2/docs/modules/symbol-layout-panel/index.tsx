import React from 'react';
import IconCard from '../icon-card';
import './style';

interface SymbolLayoutPanelProps {
    ids: any;
    type: string;
    options?: {
        value: string;
        label: string;
    }[];
    styles?: {
        [name: string]: {
            value: string;
            label: string;
        }[]
    };
}
const SymbolLayoutPanel = (props: SymbolLayoutPanelProps) => {
    const { options, ids, styles, type } = props;

    const idsInfos = options ? options.map((option) => {
        if (!styles?.[option.value]) {
            return {
                label: option.label,
                categoryIdsInfo: ids[option.value]
            }
        } else {
            return {
                label: option.label,
                styleInfos: styles[option.value].map((style) => {
                    return {
                        label: style.label,
                        styleIdsInfo: ids[option.value][style.value]
                    }
                })
            }
        }
    }) : [];

    const getSymbolConent = () => {
        if (!options) {
            return (
                <div className='symbol-layout-item'>
                    <div className='symbol-category-content'>
                        {ids.map((i) => {
                            return <IconCard iconInfo={i} type={type} key={type + i.id} />
                        })}
                    </div>
                </div>
            )
        }
        return idsInfos.map((info, index) => {
            return (
                <div className='symbol-layout-item' key={'category' + index}>
                    <div className='symbol-category-title'>{info.label}</div>
                    <div className='symbol-category-content'>
                        {info.styleInfos ?
                            info?.styleInfos.map((styleInfo, idx) => {
                                return (
                                    <div className='symbol-style' key={'style' + idx}>
                                        <div className='symbol-style-title'>{styleInfo.label}</div>
                                        <div className='symbol-style-content'>
                                            {styleInfo?.styleIdsInfo?.map((i) => {
                                                return <IconCard iconInfo={i} type={type} key={type + i.id} />
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                            : info?.categoryIdsInfo?.map((i) => {
                                return <IconCard iconInfo={i} type={type} key={type + i.id} />
                            })}
                    </div>

                </div>
            )
        })
    };

    return (
        <div className='symbol-layout-panel'>
            {getSymbolConent()}
        </div>
    )
}

export default SymbolLayoutPanel;