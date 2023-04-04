export const isPaintKey = (key: string): boolean => {
    return [
        'icon-color',
        'icon-opacity',
        'icon-translate',
        'line-opacity',
        'line-blur',
        'line-translate',
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
        'text-translate-anchor',
        'circle-blur',
        'circle-color',
        'circle-opacity',
        'circle-translate',
        'circle-radius',
        'circle-stroke-color',
        'circle-stroke-opacity',
        'circle-stroke-width'
    ].includes(key);
}
const getMapboxPointKey = (key: string): string => {
    const rules = {
        image: 'icon-image',
        color: 'icon-color',
        size: 'icon-size',
        rotate: 'icon-rotate',
        opacity: 'icon-opacity',
        translate: 'icon-translate',
        visibility: 'visibility'
    };
    return rules[key];
}

const getMapboxCircleKey = (key:string): string => {
    const rules = {
        color: 'circle-color',
        radius: 'circle-radius',
        rotate: 'circle-rotate',
        opacity: 'circle-opacity',
        translate: 'circle-translate',
        blur: 'circle-blur',
        strokeColor: 'circle-stroke-color',
        strokeOpacity: 'circle-stroke-opacity',
        strokeWidth: 'circle-stroke-width',
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
        blur: 'line-blur',
        offset: 'line-offset',
        dasharray: 'line-dasharray',
        image: 'line-pattern',
        opacity: 'line-opacity',
        translate: 'line-translate',
        visibility: 'visibility'
    };
    return rules[key];
}

const getMapboxPolygonKey = (key: string): string => {
    const rules = {
        color: 'fill-color',
        opacity: 'fill-opacity',
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
        fontFamily: 'text-font',
        translate: 'text-translate',
        anchor: 'text-anchor',
        allowOverlap: 'text-allow-overlap',
        haloWidth: 'text-halo-width',
        spacing: 'text-letter-spacing',
        visibility: 'visibility'
    };
    return rules[key];
}

export const getMapboxKey = {
    point: getMapboxPointKey,
    polygon: getMapboxPolygonKey,
    line: getMapboxLineKey,
    text: getMapboxTextKey,
    circle: getMapboxCircleKey
}

