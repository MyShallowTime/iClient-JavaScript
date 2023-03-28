import React from 'react';
import './style';

interface IconCardContentProps {
    src: string;
    title: string;
    onIconClick: () => void;
}

const IconCard = (props: IconCardContentProps) => {
    const { src, title, onIconClick } = props;

    return (
        <div className="icon-image" onClick={onIconClick}>
            <div className='img-content'><img src={src} /></div>
            <div className='title-content' title={title}>{title}</div>
        </div>
    )
}

export default IconCard;