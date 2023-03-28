import React, { useState } from 'react';
import { Tabs } from '@ispeco/iptl-components-react';
import './style';

const { Tab } = Tabs;

interface ClassifyTabsProps {
    baseSelectorContent: React.ReactNode;
    autoSelectorConent: React.ReactNode;
    landSelectorContent: React.ReactNode;
}

const ClassifyTabs = (props: ClassifyTabsProps) => {
    const [selectTab, setSelectTab] = useState("base");
    const { baseSelectorContent, autoSelectorConent, landSelectorContent } = props;
    return (
        <Tabs
            activeTab={selectTab}
            onChange={(tab): void => {
                setSelectTab(tab.toString());
            }}
            className={`symbol-setting-types`}
            forceRender
        >
            <Tab header={"基础"} value="base" children={baseSelectorContent} />
            <Tab header={"自动制图"} value="auto" children={autoSelectorConent} />
            <Tab header={"国土三调"} value="land" children={landSelectorContent} />
        </Tabs>
    )
}

export default ClassifyTabs;