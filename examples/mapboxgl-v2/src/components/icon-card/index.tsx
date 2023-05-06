import React from 'react';
import './style';
import classNames from 'classnames';

interface IconCardContentProps {
    src: string;
    title: string;
    onIconClick: () => void;
    isSelected?: boolean;
}

const IconCard = (props: IconCardContentProps) => {
    const { src, title, isSelected, onIconClick } = props;
    return (
        <div className={classNames("icon-image", { 'selected': isSelected })} onClick={onIconClick}>
            <div className='img-content'><img src={src} /></div>
            <div className='title-content' title={title}>{title}</div>
        </div>
    )
}

export default IconCard;