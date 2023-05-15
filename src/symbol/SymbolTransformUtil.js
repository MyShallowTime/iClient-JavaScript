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
