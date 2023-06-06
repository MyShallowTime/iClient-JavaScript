import React, { useState, useEffect } from 'react';
import { ScrollPanel } from '@ispeco/iptl-components-react';
import './style';
import IconCard from '../../components/icon-card';
import SearchEditor from '../../components/search-editor';
import SymbolContent from './SymbolContent';
import { updateUIContents } from './symbol-selector-util'

interface SymbolContentProps {
    onIconClick: (id: string) => void;
    symbolType: string;
    options?: {
        value: string;
        label: string;
    }[];
    styles?: any;
    iconIds?: any;
    type: string;
    selectedSymbolId?: string;
    searchValue: string;
}
const defaultActiveAll = {
    "value": "all",
    "label": "全部"
}
type UIContentTypes = {
    id:string,
    name:string,
    color?:string,
    imageUrl?:string
 }
const SymbolSelector = (props: SymbolContentProps) => {
    const { symbolType, onIconClick, options, styles, iconIds, type, selectedSymbolId, searchValue } = props;
    const [activeCategory, setActiveCategory] = useState<any>(options?.[0]?.value);
    const [UIContents, setUIContents] = useState<UIContentTypes[]>([]);// 类别 or 搜索下的所有图标列表
    const activeStyleOptions = styles?.[activeCategory];
    symbolType === "base" && activeStyleOptions && activeStyleOptions?.[0]?.value !== 'all' && activeStyleOptions.unshift(defaultActiveAll);
    const imgClass = {
        line: 'img-line',
        point: 'img-point',
        polygon: 'img-polygon'
    }
    const [activeStyle, setActiveStyle] = useState(activeStyleOptions?.[0]?.value);

    const getIds = (style) => {
        const categoryIds = iconIds?.[activeCategory] ?? iconIds;
        return (style ? categoryIds[style] : categoryIds) ?? [];
    }
    const ids = getIds(activeStyle);

    useEffect(() => {
        symbolType === "base" && setActiveStyle(activeStyleOptions?.[0]?.value);
    }, [activeCategory]);

    useEffect(() => {
        const newStyle = activeStyleOptions?.[0].value;
        setActiveStyle(newStyle);
    }, [activeCategory]);

    const changeContentValues = async () => {
        const newValues: any[] = await updateUIContents(searchValue, iconIds, activeStyleOptions, activeStyle, ids, type);
        setUIContents(newValues)
    }

    useEffect(() => {
        changeContentValues();
    }, [activeCategory]);

    const getSymbol = (symbolInfos) => {
        return symbolInfos?.map(({ id, name, color, imageUrl }) => {
            const newSymbolId = type + '-' + id;
            return <IconCard key={type + id}
                background={color} imgUrl={imageUrl}
                title={name}
                imgClassName={imgClass[type]}
                onIconClick={() => {
                    onIconClick(newSymbolId);
                }}
                id={id}
                isSelected={newSymbolId === selectedSymbolId} />
        });
    };

    const getRender = () => {
        if (searchValue) {
            return <ScrollPanel hideScrollX small style={{ height: 516 }}>
                {getSymbol(UIContents)}
            </ScrollPanel>
        }

        if (activeStyleOptions && activeStyle === 'all') {
            return <SymbolContent
                options={options}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeStyle={activeStyle}
                activeStyleOptions={activeStyleOptions}
                setActiveStyle={setActiveStyle}>
                <div className='symbol-setting-content'>
                    <div className='symbol-setting-type-label'>{defaultActiveAll.label}</div>
                    <div className='symbol-setting-symbols'>
                        {getSymbol(UIContents)}
                    </div>
                </div>
            </SymbolContent>
        }

        return <SymbolContent
            options={options}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeStyle={activeStyle}
            activeStyleOptions={activeStyleOptions}
            setActiveStyle={setActiveStyle}>
            {getSymbol(UIContents)}
        </SymbolContent>
    }

    return (
        <div>{getRender()}</div>
    )
}

export default SymbolSelector;
