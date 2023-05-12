import { TEXT_DEFAULT_VALUE, MAPBOX_LINE_DEFAULT, MAPBOX_FILL_DEFAULT, MAPBOX_SYMBOL_DEFAULT, MAPBOX_CIRCLE_DEFAULT } from "@supermap/iclient-common/commontypes/symbol/DefaultValue";

/**
 * 根据symbol类型，获取图层类型
 * @param {*} symbolInfo 
 * @returns {string}
 */
export function getLayerTypeByRender(symbolInfo) {
    const {paint = {}, layout = {}} = symbolInfo;
    const keys = Object.keys(paint).concat(Object.keys(layout));
    const isCircle = keys.some(v => v.startsWith('circle-'));
    return isCircle ? 'circle' : 'symbol';
}

/**
 * 获取symbol图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function getSymbolPaintLayout(symbolInfo) {
    const {paint={}, layout={}} = symbolInfo;
    return {
        paint: Object.assign({}, MAPBOX_SYMBOL_DEFAULT.paint, paint),
        layout: Object.assign({}, MAPBOX_SYMBOL_DEFAULT.layout, layout)
    }

}

/**
 * 获取circle图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function getCirclePaintLayout(symbolInfo) {
    const {paint={}, layout={}} = symbolInfo;
    return {
        paint: Object.assign({}, MAPBOX_CIRCLE_DEFAULT.paint, paint),
        layout: Object.assign({}, MAPBOX_CIRCLE_DEFAULT.layout, layout)
    }
}

const getPaintLayout = {
    'symbol': getSymbolPaintLayout,
    "circle": getCirclePaintLayout
}


/**
 * SimplePointSymbol、ImagePointSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function transformSymbol2LayerInfo(symbolInfo) {
    const layerType = getLayerTypeByRender(symbolInfo)
    const paintLayout = getPaintLayout[layerType](symbolInfo)
    return {
        type: layerType,
        ...paintLayout
    }
}

/**
 * LineSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function lineSymbolToPaintLayout(symbolInfo) {
    const {paint={}, layout={}} = symbolInfo;
    return {
        type: 'line',

        paint: Object.assign({}, MAPBOX_LINE_DEFAULT.paint, paint),
        layout: Object.assign({}, MAPBOX_LINE_DEFAULT.layout, layout)
    }
}
/**
 * PolygonSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object} 
 */
export function polygonSymbolToPaintLayout(symbolInfo) {
    const {paint={}, layout={}} = symbolInfo;
    return {
        type: 'fill',
        // 需要加上fill-pattern这样从图片=>矢量，图片才会被清空
        paint: Object.assign({}, MAPBOX_FILL_DEFAULT.paint, paint),
        layout: Object.assign({}, layout)
    }
}

/**
 * TextSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object} 
 */
export function textSymbolToPaintLayout(symbolInfo) {
    const { field, color, opacity, size, fontFamily, translate, haloWidth, anchor, allowOverlap, padding, spacing } = symbolInfo;
    return {
        type: 'symbol',
        paint: {
            'text-color': color ?? TEXT_DEFAULT_VALUE.color,
            'text-opacity': opacity ?? TEXT_DEFAULT_VALUE.opacity,
            'text-translate': translate ?? TEXT_DEFAULT_VALUE.translate,
            'text-halo-width': haloWidth ?? TEXT_DEFAULT_VALUE.haloWidth
            // 符号库暂未支持的属性
            // 'text-halo-blur': symbolInfo.textHaloBlur,
            // 'text-halo-color': symbolInfo.textHaloColor,
            // 'text-translate-anchor': symbolInfo.textTranslateAnchor
        },
        layout: {
            'text-field': field ?? TEXT_DEFAULT_VALUE.field,
            'text-size': size ?? TEXT_DEFAULT_VALUE.size,
            'text-font': fontFamily ?? TEXT_DEFAULT_VALUE.fontFamily,
            'text-anchor': anchor ?? TEXT_DEFAULT_VALUE.anchor,
            'text-allow-overlap': allowOverlap ?? TEXT_DEFAULT_VALUE.allowOverlap,
            'text-padding': padding ?? TEXT_DEFAULT_VALUE.padding,
            'text-letter-spacing': spacing ?? TEXT_DEFAULT_VALUE.spacing
            // 符号库暂未支持的属性
            // 'text-ignore-placement': symbolInfo.textIgnorePlacement,
            // 'text-justify': symbolInfo.justify,
            // 'text-line-height': symbolInfo.lineHeight,
            // 'text-max-width': symbolInfo.maxWidth,
            // 'text-rotate': symbolInfo.textRotate,
            // 'text-transform': symbolInfo.transform,
        }
    }
}
const circleProperty = {
    'circle-color': {
        type: 'paint'
    },
    'circle-opacity': {
        type: 'paint'
    },
    'circle-radius': {
        type: 'paint'
    },
    'circle-stroke-color': {
        type: 'paint',
        name: 'circle-stroke-color'
    },
    strokeWidth: {
        type: 'paint',
        name: 'circle-stroke-width'
    },
    strokeOpacity: {
        type: 'paint',
        name: 'circle-stroke-opacity'
    },
    translate: {
        type: 'paint',
        name: 'circle-translate'
    },
    blur: {
        type: 'paint',
        name: 'circle-blur'
    },
    visibility: {
        type: 'layout',
        name: 'visibility'
    }
};
export function getCircleProperty(key, value) {
    if(circleProperty[key]) {
        const {type, name} = circleProperty[key];
        return {
            type,
            name,
            value
        }
    }
}
const symbolProperty = {
    color: {
        type: 'paint',
        name: 'icon-color'
    },
    opacity: {
        type: 'paint',
        name: 'icon-opacity'
    },
    translate: {
        type: 'paint',
        name: 'icon-translate'
    },
    size: {
        type: 'layout',
        name: 'icon-size'
        // transform: (v, imageWidth) => {
        //     return v / (imageWidth ?? 100);
        // }
    },
    image: {
        type: 'layout',
        name: 'icon-image'
    },
    rotate: {
        type: 'layout',
        name: 'icon-rotate'
    },
    visibility: {
        type: 'layout',
        name: 'visibility'
    }
};
export function getSymbolProperty(key, value, imageWidth) {
    if(symbolProperty[key]) {
        const {type, name, transform} = symbolProperty[key];
        return {
            type,
            name,
            value: transform?.(value, imageWidth) ?? value //此处有些别扭，如果是其他key有转换， 并且参数不是imagewidth呢？
        }
    }
}
const lineProperty = {
    color: {
        type: 'paint',
        name: 'line-color'
    },
    opacity: {
        type: 'paint',
        name: 'line-opacity'
    },
    width: {
        type: 'paint',
        name: 'line-width'
    },
    offset: {
        type: 'paint',
        name: 'line-offset'
    },
    blur: {
        type: 'paint',
        name: 'line-blur'
    },
    dasharray: {
        type: 'paint',
        name: 'line-dasharray'
    },
    translate: {
        type: 'paint',
        name: 'line-translate'
    },
    image: {
        type: 'paint',
        name: 'line-pattern'
    },
    cap: {
        type: 'layout',
        name: 'line-cap'
    },
    join: {
        type: 'layout',
        name: 'line-join'
    },
    visibility: {
        type: 'layout',
        name: 'visibility'
    }
};
export function getLineProperty(key, value) {
    if(lineProperty[key]) {
        const {type, name} = lineProperty[key];
        return {
            type,
            name,
            value
        }
    }
}
const fillProperty = {
    color: {
        type: 'paint',
        name: 'fill-color'
    },
    opacity: {
        type: 'paint',
        name: 'fill-opacity'
    },
    image: {
        type: 'paint',
        name: 'fill-pattern'
    },
    visibility: {
        type: 'layout',
        name: 'visibility'
    }
};
export function getFillProperty(key, value) {
    if(fillProperty[key]) {
        const {type, name} = fillProperty[key];
        return {
            type,
            name,
            value
        }
    }
}
const textProperty = {
    color: {
        type: 'paint',
        name: 'text-color'
    },
    opacity: {
        type: 'paint',
        name: 'text-opacity'
    },
    translate: {
        type: 'paint',
        name: 'text-translate'
    },
    haloWidth: {
        type: 'paint',
        name: 'text-halo-width'
    },
    size: {
        type: 'layout',
        name: 'text-size'
    },
    field: {
        type: 'layout',
        name: 'text-field'
    },
    fontFamily: {
        type: 'layout',
        name: 'text-font'
    },
    anchor: {
        type: 'layout',
        name: 'text-anchor'
    },
    allowOverlap: {
        type: 'layout',
        name: 'text-allow-overlap'
    },
    padding: {
        type: 'layout',
        name: 'text-padding'
    },
    spacing: {
        type: 'layout',
        name: 'text-letter-spacing'
    },
    visibility: {
        type: 'layout',
        name: 'visibility'
    }
};
export function getTextProperty(key, value) {
    if(textProperty[key]) {
        const {type, name} = textProperty[key];
        return {
            type,
            name,
            value
        }
    }
}
export const isPaintKey = (key) => {
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
