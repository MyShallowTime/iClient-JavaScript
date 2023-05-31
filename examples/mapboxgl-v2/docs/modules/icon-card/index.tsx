import React, { useEffect, useRef, useState } from 'react';
import './style';
import SymbolModal from '../modal';
import classNames from 'classnames';

interface IconCardContentProps {
    iconInfo: any;
    type: string;
}

const IconCard = (props: IconCardContentProps) => {
    const { iconInfo, type } = props;
    const modal = useRef<any>(null);
    const title = iconInfo.name;
    const id = iconInfo.id;

    const getImageUrl = (id) => {
        const isPolygon = type === 'polygon';
        if(isPolygon) {
            const { paint = {} } = isPolygon && require(`../../../libs/resources/symbols/${type}-${id}/${type}-${id}.json`),
                {'fill-color': color, 'fill-pattern': imgId} = paint;   
            return {
                color,
                imageUrl: imgId ? `../../../libs/resources/symbols/${type}-${id}/${type}-${id}.png`: undefined
            }      
        }
        return {
            imageUrl: `../../../libs/resources/symbols/${type}-${id}/${type}-${id}.png`
        };
    }

    const {imageUrl: imgUrl, color} = getImageUrl(id);
    return (
        <>
            <div className="icon-image" onClick={() => {
                // modal.current.showModal();
            }}>
                <div className={classNames('img-content', { 'line-img-content': type === 'line' })}>
                    {imgUrl ?
                        <div style={{backgroundImage: `url(${imgUrl})`}}></div> :
                        <div style={{ background: color }} />}
                </div>
                <div className='img-title' title={title}>
                    {`Name: ${title}`}
                </div>
                <div className='img-id' title={`${type}-${id}`}>
                    {`ID: ${type}-${id}`}
                </div>
            </div>
            <SymbolModal modalRef={modal} title={title} id={id} type={type} />
        </>
    )
}

export default IconCard;