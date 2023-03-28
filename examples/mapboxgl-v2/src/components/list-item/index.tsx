import React, { useState } from 'react';
import { Button, Icon } from '@ispeco/iptl-components-react';
import classnames from 'classnames';
import './style';

interface ListItemProps {
    title: string;
    icon: string;
    isActive: boolean;
    onClickItem: () => void;
    onChangeLayerVisible: (visible: boolean) => void;
}

const ListItem = (props: ListItemProps) => {
    const { title, isActive, icon, onClickItem, onChangeLayerVisible } = props;
    const [visible, setVisible] = useState(true);
    return (
        <div className={'list-item-content'}>
            <div className={classnames('list-item', { 'list-item-disable': !visible, 'list-item-active': isActive })} onClick={onClickItem}><Icon type={icon} />{title}</div>
            <Button
                className="list-item-visibility"
                icon={visible ? 'ms-icons-visible' : 'ms-icons-invisible'}
                type="empty"
                onClick={() => {
                    onChangeLayerVisible(!visible);
                    setVisible(!visible);
                }}
                size={"normal"}
            />
        </div>

    )
}

export default ListItem;