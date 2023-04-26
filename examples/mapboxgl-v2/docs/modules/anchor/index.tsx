import React from 'react';
import './style';
import { anchorInfo } from '../../constants/AnchorInfo';

const Anchor = () => {
    const getAnchor = (labelInfos, level = 0) => {
        return labelInfos.map((el, index) => {
            return (
                <div key={index}>
                    <a className={'anchor anchor-level-' + level} href={'#' + el.value}>{el.label}</a>
                    {el.children && getAnchor(el.children, level + 1)}
                </div>
            )
        })
    };

    return (
        <div className='symbol-anchor'>
            {getAnchor(anchorInfo, 0)}
        </div>
    )
}

export default Anchor;
