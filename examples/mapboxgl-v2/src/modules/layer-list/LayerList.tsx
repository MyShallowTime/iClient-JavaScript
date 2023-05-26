import React from 'react';
import ListItem from '../../components/list-item';
import { Icon, ScrollPanel } from '@ispeco/iptl-components-react';
import './style';

interface LayerListProps {
    layersInfo: any[];
    setLayerId: React.Dispatch<any>;
    layerId: string;
    changeLayerStyle: (layerId: string, key: string, value: any) => void;
    setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayerList = (props: LayerListProps) => {
    const { layersInfo = [], layerId, setLayerId, changeLayerStyle, setIsSettingOpen } = props;

    const iconName = {
        point: "ms-icons-type-point",
        line: "ms-icons-type-line",
        polygon: "ms-icons-type-face"
    }

    return (
        <div className='layer-list'>
            <div className='layer-list-title'>
                <Icon type={'ms-icons-layer'} />
                图层列表
            </div>
            <div className='layer-list-content'>
                <ScrollPanel style={{ height: 828, width: '100%' }}>
                    {
                        layersInfo.map((el, index) =>
                            <ListItem
                                key={index}
                                title={el.id}
                                icon={iconName[el.type]}
                                isActive={el.id === layerId}
                                onClickItem={() => {
                                    setLayerId(el.id);
                                    setIsSettingOpen(true);
                                }}
                                onChangeLayerVisible={(visible: boolean): void => {
                                    changeLayerStyle(el.id, 'visibility', visible ? 'visible' : 'none');
                                }}
                            />)
                    }
                </ScrollPanel>

            </div>
        </div>
    )
}

export default LayerList;