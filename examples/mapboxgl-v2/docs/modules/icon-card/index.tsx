import React, { useRef } from 'react';
import './style';
import SymbolModal from '../modal';

interface IconCardContentProps {
    iconInfo: any;
    type: string;
}

const IconCard = (props: IconCardContentProps) => {
    const { iconInfo, type } = props;
    const modal = useRef<any>(null);
    const title = iconInfo.name;
    const id = iconInfo.id;

    return (
        <>
            <div className="icon-image" onClick={() => {
                modal.current.showModal();
            }}>
                <div className='img-content'><img src={`../../static/images/${type}/${id}.png`} /></div>
                <div className='title-content' title={title}>{title}</div>
            </div>
            <SymbolModal modalRef={modal} title={title} id={id} type={type} />
        </>
    )
}

export default IconCard;