import React, { useState, useEffect } from 'react';
import { ScrollPanel } from '@ispeco/iptl-components-react';
import SelectEditor from '../../components/select-editor';
import './style';
import IconCard from '../../components/icon-card';
import EditorLayout from '../../components/editor-layout';
import SearchEditor from '../../components/search-editor';
interface SymbolContentProps {
    onIconClick: (id: string) => void;
    symbolType: string;
    options?: {
        value: string;
        label: string;
    }[];
    styles?: any;
    iconIds?: any;
    type?: string;
    selectedSymbolId?: string;
}

const SymbolSelector = (props: SymbolContentProps) => {
    const { symbolType, onIconClick, options, styles, iconIds, type, selectedSymbolId } = props;
    const [activeCategory, setActiveCategory] = useState<any>(options?.[0]?.value);
    const [searchValue, setSearchValue] = useState('');
    const activeStyleOptions = styles?.[activeCategory];
    symbolType === "base" && activeStyleOptions && activeStyleOptions?.[0]?.value !== 'all' && activeStyleOptions.unshift({
        "value": "all",
        "label": "全部"
    });

    const [activeStyle, setActiveStyle] = useState(activeStyleOptions?.[0]?.value);

    const getIds = (style) => {
        const categoryIds = iconIds?.[activeCategory] ?? iconIds;
        return (style ? categoryIds[style] : categoryIds) ?? [];
    }
    const [ids, setIds] = useState(getIds(activeStyle));

    useEffect(() => {
        symbolType === "base" && setActiveStyle(activeStyleOptions?.[0]?.value);
    }, [activeCategory]);

    useEffect(() => {
        const newStyle = activeStyleOptions?.[0].value;
        setActiveStyle(newStyle);
        setIds(getIds(newStyle));
    }, [activeCategory]);

    useEffect(() => {
        setIds(getIds(activeStyle));
    }, [activeStyle]);

    const getImageUrl = (id) => {
        const isPolygon = type === 'polygon';
        if(isPolygon) {
            const { paint = {} } = isPolygon && require(`../../../libs/resources/symbols/${type}-${id}/${type}-${id}.json`), 
                {'fill-color': color, 'fill-pattern': imgId} = paint;   
            return {
                color,
                imageUrl: imgId ? `../../../libs/resources/symbols/${type}-${id}/${type}-${id}.png`: undefined
            }      
        }
        return {
            imageUrl: `../../../libs/resources/symbols/${type}-${id}/${type}-${id}.png`
        };
    }

    const getSymbol = (symbolInfos) => {
        return symbolInfos?.map(({ id, name }) => {
            const newSymbolId = type + '-' + id;
            const {color, imageUrl} = getImageUrl(id);  
            return <IconCard key={type + id} background={color} imgUrl={imageUrl} title={name} onIconClick={() => {
                onIconClick(newSymbolId);
            }} isSelected={newSymbolId === selectedSymbolId} />
        });
    };

    const getBaseAllSymbol = () => {
        const allSymbol = [] as any[];
        activeStyleOptions.forEach((activeStyleOption) => {
            const currentSymbol = [] as any[];
            iconIds[activeCategory][activeStyleOption.value]?.map(({ id, name }) => {
                currentSymbol.push({ id, name });
            });
            activeStyleOption.value !== 'all' && allSymbol.push({
                label: activeStyleOption.label,
                symbols: currentSymbol
            });
        });
        return allSymbol.map((el, index) => {
            return (
                <div className='symbol-setting-content' key={index}>
                    <div className='symbol-setting-type-label'>{el.label}</div>
                    <div className='symbol-setting-symbols'>
                        {getSymbol(el.symbols)}
                    </div>
                </div>
            )
        })
    };

    const getAllIconIds = (allIcons, iconIds) => {
        if (Array.isArray(iconIds)) {
            allIcons.push(...iconIds);
        } else {
            for (let ids in iconIds) {
                if (Array.isArray(iconIds[ids])) {
                    allIcons.push(...iconIds[ids]);
                } else {
                    getAllIconIds(allIcons, iconIds[ids]);
                }
            }
        }
        return allIcons;
    };

    const getSearchResultSymbol = () => {
        const allIcons: { id: string, name: string }[] = [];
        getAllIconIds(allIcons, iconIds);
        const searchResutl = allIcons.filter((el) => el.name.includes(searchValue));
        return getSymbol(searchResutl);
    };

    return (
        <div>
            <SearchEditor onSearchValueChange={(v) => {
                setSearchValue(v);
            }} />
            {searchValue ?
                <ScrollPanel hideScrollX small style={{ height: 516 }}>
                    {getSearchResultSymbol()}
                </ScrollPanel> :
                <div className='symbol-content'>
                    {options && <EditorLayout title='类别'>
                        <SelectEditor options={options} value={activeCategory} onChange={setActiveCategory} />
                    </EditorLayout>}
                    {activeStyle && <EditorLayout title='风格'>
                        <SelectEditor options={activeStyleOptions} value={activeStyle} onChange={setActiveStyle} />
                    </EditorLayout>}
                    <ScrollPanel hideScrollX small style={{ height: activeStyle ? 428 : 468, marginTop: 16 }}>
                        {
                            activeStyleOptions && activeStyle === 'all' ? getBaseAllSymbol() : getSymbol(ids)
                        }
                    </ScrollPanel>
                </div>
            }
        </div>
    )
}

export default SymbolSelector;