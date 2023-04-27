import { Button, ScrollPanel } from '@ispeco/iptl-components-react';
import React from 'react';
import './style';
type PanelLayoutProps = {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    onClickClose?: any;
    isHideClose?: boolean;
}

const PanelLayout = (props: PanelLayoutProps) => {
    const { children, className, title, onClickClose, isHideClose = false } = props;

    return <div className={'style-setting ' + className}>
        <div className='style-setting-header'>
            <div className='style-setting-title'>{title}</div>
            {!isHideClose && <Button
                icon="ms-icons-close"
                type="empty"
                className="style-setting-panel-close"
                onClick={onClickClose}
            />}
        </div>
        <ScrollPanel style={{ height: '100%' }}>
            <div className='style-setting-panel'>
                {children}
            </div>
        </ScrollPanel>
    </div>;
}

export default PanelLayout;
