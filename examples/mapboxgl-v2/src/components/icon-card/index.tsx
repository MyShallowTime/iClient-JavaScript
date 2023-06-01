import React from 'react';
import './style';
import classNames from 'classnames';

interface IconCardContentProps {
    imgUrl?: string;
    background?: string;
    title: string;
    onIconClick: () => void;
    isSelected?: boolean;
    imgClassName?: string;
}

const IconCard = (props: IconCardContentProps) => {
    const { imgUrl, title, isSelected, background, imgClassName, onIconClick } = props;
    return (
        <div className={classNames("icon-image", { 'selected': isSelected })} onClick={onIconClick}>
            <div className='img-content'>
                {
                    imgUrl ? <div style={{backgroundImage: `url(${imgUrl})`}} className={imgClassName}></div> : <div className={imgClassName} style={{ background }} />
                }
            </div>
            <div className='title-content' title={title}>{title}</div>
        </div>
    )
}

export default IconCard;