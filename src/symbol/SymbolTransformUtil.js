import {  IMAGE_POINT_DEFAULT_VALUE, LINE_DEFAULT_VALUE, POLYGON_DEFAULT_VALUE, SIMPLE_POINT_DEFAULT_VALUE, TEXT_DEFAULT_VALUE } from "@supermap/iclient-common/commontypes/symbol/DefaultValue";

/**
 * 根据symbol类型，获取图层类型
 * @param {*} symbolInfo 
 * @returns {string}
 */
export function getLayerTypeByRender(symbolInfo) {
    // renderSetting中以下key值满足这些条件，即可使用circle图层渲染，否则使用'symbol'
    const CircleRenderSymbolRules = {
        textField: ['', undefined],
        shape: ['', undefined, 'circle'],
        image: ['', undefined, 'circle'],
        anchor: [undefined, 'center'],
        allowOverlap: [undefined, true],
        ignorePlacement: [undefined, true]
    };
    // 需要渲染的参数
    const keys = Object.keys(CircleRenderSymbolRules);
    // 是否含有仅symbol才可渲染的参数，如果symbolProperty.length>0则说明有
    const symbolProperty = keys.filter((key) => !CircleRenderSymbolRules[key].includes(symbolInfo[key]));
    return symbolProperty.length ? 'symbol' : 'circle';
}

/**
 * 获取symbol图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function getSymbolPaintLayout(symbolInfo) {
    return {
        paint: {
            'icon-color': symbolInfo.color ?? IMAGE_POINT_DEFAULT_VALUE.color,
            'icon-opacity': symbolInfo.opacity ?? IMAGE_POINT_DEFAULT_VALUE.opacity,
            'icon-translate': symbolInfo.translate ?? IMAGE_POINT_DEFAULT_VALUE.translate
        },
        layout: {
            'icon-size': symbolInfo.size ?? IMAGE_POINT_DEFAULT_VALUE.size,
            'icon-image': symbolInfo.image,
            'icon-rotate': symbolInfo.rotate ?? IMAGE_POINT_DEFAULT_VALUE.rotate
            // 符号库暂未支持的属性
            // 'icon-anchor': symbolInfo.anchor,
            // 'icon-allow-overlap': symbolInfo.allowOverlap,
            // 'icon-ignore-placement': symbolInfo.ignorePlacement,
            // 'symbol-placement': symbolInfo.symbolPlacement
        }
    }

}

/**
 * 获取circle图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
export function getCirclePaintLayout(symbolInfo) {
    return {
        paint: {
            'circle-blur': symbolInfo.blur ?? SIMPLE_POINT_DEFAULT_VALUE.blur,
            'circle-color': symbolInfo.color ?? SIMPLE_POINT_DEFAULT_VALUE.color,
            'circle-opacity': symbolInfo.opacity ?? SIMPLE_POINT_DEFAULT_VALUE.opacity,
            'circle-radius': symbolInfo.size / 2 ?? SIMPLE_POINT_DEFAULT_VALUE.size / 2,
            'circle-stroke-color': symbolInfo.strokeColor ?? SIMPLE_POINT_DEFAULT_VALUE.strokeColor,
            'circle-stroke-width': symbolInfo.strokeWidth ?? SIMPLE_POINT_DEFAULT_VALUE.strokeWidth,
            'circle-stroke-opacity': symbolInfo.strokeOpacity ?? SIMPLE_POINT_DEFAULT_VALUE.strokeOpacity,
            'circle-translate': symbolInfo.translate ?? SIMPLE_POINT_DEFAULT_VALUE.translate
            // 符号库暂未支持的属性
            // 'circle-translate-anchor': symbolInfo.translateAnchor
        },
        layout: {
            visibility: 'visible'
        }
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
    const {opacity, color, width, offset, translate, blur, dasharray, image, cap, join} = symbolInfo;
    
    return {
        type: 'line',
        paint: {
            "line-opacity": opacity ?? LINE_DEFAULT_VALUE.opacity,
            "line-color": color ?? LINE_DEFAULT_VALUE.color,
            "line-width": width ?? LINE_DEFAULT_VALUE.width,
            "line-offset": offset ?? LINE_DEFAULT_VALUE.offset,
            "line-translate": translate ?? LINE_DEFAULT_VALUE.translate,
            "line-blur": blur ?? LINE_DEFAULT_VALUE.blur,
            "line-dasharray": dasharray ?? LINE_DEFAULT_VALUE.dasharray,
            "line-pattern": image
            // 符号库暂未支持的属性
            // "line-translate-anchor": "",
            // "line-gap-width": "",
            // "line-gradient": ""
        },
        layout: {
            "line-cap": cap ?? LINE_DEFAULT_VALUE.cap,
            "line-join": join ?? LINE_DEFAULT_VALUE.join
            // 符号库暂未支持的属性
            // "line-miter-limit": "",
            // "line-round-limit": "",
            // "line-sort-key": ""
        }
    }
}
/**
 * PolygonSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object} 
 */
export function polygonSymbolToPaintLayout(symbolInfo) {
    const {opacity, color, image} = symbolInfo;

    return {
        type: 'fill',
        paint: {
            "fill-opacity": opacity ?? POLYGON_DEFAULT_VALUE.opacity,
            "fill-color": color ?? POLYGON_DEFAULT_VALUE.color,
            "fill-pattern": image
            // 符号库暂未支持的属性
            // "fill-antialias": "",
            // "fill-outline-color": "",
            // "fill-translate": "",
            // "fill-translate-anchor": "",
        },
        layout: {
            // 符号库暂未支持的属性
            // "fill-sort-key": "";
        }
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
    color: {
        type: 'paint',
        name: 'circle-color'
    },
    opacity: {
        type: 'paint',
        name: 'circle-opacity'
    },
    radius: {
        type: 'paint',
        name: 'circle-radius'
    },
    strokeColor: {
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
