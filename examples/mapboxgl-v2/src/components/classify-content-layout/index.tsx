import { Tabs } from '@ispeco/iptl-components-react';
import React, { useState } from 'react';
import './style';
interface ClassifyContentLayoutProps {
    children: React.ReactNode;
}

const ClassifyContentLayout = (props: ClassifyContentLayoutProps) => {
    const { children } = props;
    const { Tab } = Tabs;
    const [activeTab, setActiveTab] = useState('init');

    return <Tabs
        activeTab={activeTab}
        onChange={(tab): void => {
            setActiveTab(tab.toString());
        }}
        className={"style-setting-classify-tabs"}
        forceRender>
        <Tab header={"内置符号"} value="init" children={
            children
        } />
        <Tab header={"自定义符号"} value="custom" children={
            <></>
        } />
    </Tabs>
}

export default ClassifyContentLayout;
