export const isPaintKey = (key: string): boolean => {
    return [
        'icon-color',
        'icon-opacity',
        'line-opacity',
        'line-color',
        'line-width',
        'line-offset',
        'line-dasharray',
        'line-pattern',
        'fill-color',
        'fill-opacity',
        'fill-pattern',
        'fill-outline-color',
        'text-color',
        'text-halo-blur',
        'text-halo-color',
        'text-halo-width',
        'text-opacity',
        'text-translate',
        'text-translate-anchor'
    ].includes(key);
}
const getMapboxPointKey = (key: string): string => {
    const rules = {
        image: 'icon-image',
        color: 'icon-color',
        size: 'icon-size',
        rotate: 'icon-rotate',
        visibility: 'visibility'
    };
    return rules[key];
}

const getMapboxLineKey = (key: string): string => {
    const rules = {
        width: 'line-width',
        color: 'line-color',
        cap: 'line-cap',
        join: 'line-join',
        offset: 'line-offset',
        dasharray: 'line-dasharray',
        image: 'line-pattern',
        visibility: 'visibility'
    };
    return rules[key];
}

const getMapboxPolygonKey = (key: string): string => {
    const rules = {
        color: 'fill-color',
        image: 'fill-pattern',
        visibility: 'visibility'
    };
    return rules[key];
}

const getMapboxTextKey = (key: string): string => {
    const rules = {
        field: 'text-field',
        size: 'text-size',
        color: 'text-color',
        opacity: 'text-opacity',
        font: 'text-font',
        translate: 'text-translate',
        anchor: 'text-anchor',
        allowOverlap: 'text-allow-overlap',
        visibility: 'visibility'
    };
    return rules[key];
}

export const getMapboxKey = {
    point: getMapboxPointKey,
    polygon: getMapboxPolygonKey,
    line: getMapboxLineKey,
    text: getMapboxTextKey
}

