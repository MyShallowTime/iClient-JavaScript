import React, { useState, useEffect } from 'react';
import { ScrollPanel } from '@ispeco/iptl-components-react';
import SelectEditor from '../../components/select-editor';
import './style';
import IconCard from '../../components/icon-card';
import EditorLayout from '../../components/editor-layout';
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
    secondSelectionName?: string;
}

const SymbolSelector = (props: SymbolContentProps) => {
    const { symbolType, onIconClick, options, styles, iconIds, secondSelectionName, type } = props;

    const [activeCategory, setActiveCategory] = useState<any>(options?.[0]?.value);

    const activeStyleOptions = styles?.[activeCategory];

    ["base", 'auto'].includes(symbolType) && activeStyleOptions && activeStyleOptions?.[0]?.value !== 'all' && activeStyleOptions.unshift({
        "value": "all",
        "label": "全部"
    });

    const [activeStyle, setActiveStyle] = useState(activeStyleOptions?.[0]?.value);

    const getIds = (style) => {
        const categoryIds = iconIds?.[activeCategory];
        return (style ? categoryIds[style] : categoryIds) ?? [];
    }

    const [ids, setIds] = useState(getIds(activeStyle));

    useEffect(() => {
        symbolType !== "land" && setActiveStyle(activeStyleOptions?.[0]?.value);
    }, [activeCategory])

    useEffect(() => {
        const newStyle = activeStyleOptions?.[0].value;
        setActiveStyle(newStyle);
        setIds(getIds(newStyle));
    }, [activeCategory]);

    useEffect(() => {
        setIds(getIds(activeStyle));
    }, [activeStyle]);

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
        })
        return allSymbol.map((el, index) => {
            return (
                <div className='symbol-setting-content' key={index}>
                    <div className='symbol-setting-type-label'>{el.label}</div>
                    <div className='symbol-setting-symbols'>
                        {
                            el.symbols.map(({ id, name }) => {
                                const src = `../../../static/images/${type}/${id}.png`
                                return <IconCard key={type + id} src={src} title={name} onIconClick={() => {
                                    onIconClick(id)
                                }} />
                            })}
                    </div>
                </div>
            )
        })
    };

    const getAutoAllSymbol = () => {
        const allSymbol = [] as any[];
        for (let i = 1; i < activeStyleOptions.length; i++) {
            if (activeStyleOptions[i].value === 'dedup') {
                continue;
            }
            iconIds[activeCategory][activeStyleOptions[i].value]?.map(({ id, name }) => {
                allSymbol.push({ id, name });
            });
        };
        return (
            <div className='symbol-setting-content'>
                <div className='symbol-setting-symbols'>
                    {
                        allSymbol.sort((a, b) => {
                            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            // names must be equal
                            return 0;
                        }).map(({ id, name }) => {
                            const src = `../../../static/images/${type}/${id}.png`
                            return <IconCard key={type + id} src={src} title={name} onIconClick={() => {
                                onIconClick(id)
                            }} />
                        })}
                </div>
            </div>
        )
    };
    const getSymbol = (symbolInfos) => {
        return symbolInfos?.map(({ id, name }) => {
            const src = `../../../static/images/${type}/${id}.png`
            return <IconCard key={type + id} src={src} title={name} onIconClick={() => {
                onIconClick(id)
            }} />
        })
    }
    const getSymbolContent = () => {
        if (symbolType === 'base') {
            return (
                <div className="basic-symbol-content">
                    {
                        activeStyleOptions && activeStyle === 'all' ? getBaseAllSymbol() : getSymbol(ids)
                    }
                </div>
            )
        } else if (symbolType === "auto") {
            return (
                <div className="automake-symbol-content">
                    {
                        activeStyleOptions && activeStyle === 'all' ? getAutoAllSymbol() : getSymbol(iconIds[activeCategory][activeStyle])
                    }
                </div>
            )
        } else {
            return (
                <div className="land-symbol-content">
                    {
                        getSymbol(iconIds[activeCategory])
                    }
                </div>
            )
        }
    };
    return (
        <div>
            <div>
                <EditorLayout title='类别'>
                    <SelectEditor options={options} value={activeCategory} onChange={setActiveCategory as any} />
                </EditorLayout>
                {activeStyle && <EditorLayout title={secondSelectionName}>
                    <SelectEditor options={activeStyleOptions} value={activeStyle} onChange={setActiveStyle} />
                </EditorLayout>}
            </div>
            <ScrollPanel hideScrollX small style={{ width: "106%", height: activeStyle ? 420 : 460, marginTop: 24 }}>
                {getSymbolContent()}
            </ScrollPanel>
        </div>
    )
}

export default SymbolSelector;