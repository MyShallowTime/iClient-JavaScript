import { getSymbolBaseUrl } from '../../utils/symbol-resource-util';

const getImageUrl = async (type, id) => {
    const isPolygon = type === 'polygon';
    const baseUrl = getSymbolBaseUrl();
    if (isPolygon) {
        const jsonUrl = `${baseUrl}/${type}-${id}/${type}-${id}.json`;
        const json = await fetch(jsonUrl, { method: "GET" })
            .then(result => result.ok ? result.json() : null)
            .catch(() => null);
        const color = json?.['paint']?.['fill-color'];
        const imgId = json?.['paint']?.['fill-pattern'];
        return {
            color,
            imageUrl: imgId ? `${baseUrl}/${type}-${id}/${type}-${id}.png` : undefined
        }
    }
    return {
        imageUrl: `${baseUrl}/${type}-${id}/${type}-${id}.png`
    };
}


const getBaseAllSymbol = (activeStyleOptions, ids) => {
    const allSymbol: any[] = [];
    activeStyleOptions.forEach((activeStyleOption) => {
        const currentSymbol: any[] = [];
        ids[activeStyleOption.value]?.forEach((item) => {
            const { id, name } = item;
            currentSymbol.push({ id, name });
        });
        activeStyleOption.value !== 'all' && allSymbol.push({
            label: activeStyleOption.label,
            symbols: currentSymbol
        });
    });
    return allSymbol
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

export async function updateUIContents(searchValue, iconIds, activeStyleOptions, activeStyle, ids, type,activeCategory) {
    const uiParams: any[] = [];
    if (searchValue) {
        const allIcons: { id: string, name: string }[] = [];
        getAllIconIds(allIcons, iconIds);
        const searchResutl = allIcons.filter((el) =>  (el.name.includes(searchValue) || el.id.includes(searchValue)));
        for (const item of searchResutl) {
            const cardInfo = await getImageUrl(type, item.id);
            uiParams.push({
                ...item,
                ...cardInfo
            });
        }
        return uiParams;
    }
    if (activeStyleOptions && activeStyle === 'all') {
        const symbolIds = iconIds[activeCategory]
        const allSymbol = getBaseAllSymbol(activeStyleOptions, symbolIds);
        for (const item of allSymbol) {
            for(const citem of item.symbols){
                const cardInfo = await getImageUrl(type, citem.id);
                uiParams.push({
                    ...citem,
                    ...cardInfo
                });
            }
        }
        return uiParams
    }
    for (const item of ids) {
        const cardInfo = await getImageUrl(type, item.id);
        uiParams.push({
            ...item,
            ...cardInfo
        });
    }
    return uiParams;
}
