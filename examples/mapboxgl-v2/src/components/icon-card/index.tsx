import React from 'react';
import './style';
import classNames from 'classnames';

interface IconCardContentProps {
    imgUrl?: string;
    background?: string;
    title: string;
    onIconClick: () => void;
    isSelected?: boolean;
}

const IconCard = (props: IconCardContentProps) => {
    const { imgUrl, title, isSelected, background, onIconClick } = props;
    return (
        <div className={classNames("icon-image", { 'selected': isSelected })} onClick={onIconClick}>
            <div className='img-content'>
                {
                    imgUrl ? <img src={imgUrl} /> : <div style={{ background }} />
                }
            </div>
            <div className='title-content' title={title}>{title}</div>
        </div>
    )
}

export default IconCard;