import React, { useRef } from 'react';
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

    return (
        <>
            <div className="icon-image" onClick={() => {
                // modal.current.showModal();
            }}>
                <div className={classNames('img-content', { 'line-img-content': type === 'line' })}><img src={`../../static/images/${type}/${id}.png`} /></div>
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