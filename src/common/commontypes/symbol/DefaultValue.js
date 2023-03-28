
const COMMON_DEFAULT_VALUE = {
    color: '#000',
    opacity: 1,
    rotate: 0,
    translate: [0, 0],
    offset: 0,
    blur: 0
}

export const POINT_DEFAULT_VALUE = {
    size: 0.16,
    color: COMMON_DEFAULT_VALUE.color,
    opacity: COMMON_DEFAULT_VALUE.opacity
}

export const IMAGE_POINT_DEFAULT_VALUE = {
    ...POINT_DEFAULT_VALUE,
    rotate: COMMON_DEFAULT_VALUE.rotate,
    translate: COMMON_DEFAULT_VALUE.translate
}

export const SIMPLE_POINT_DEFAULT_VALUE = {
    ...POINT_DEFAULT_VALUE,
    shape: 'circle',
    strokeColor: '#FFF',
    strokeWidth: 0,
    strokeOpacity: COMMON_DEFAULT_VALUE.opacity,
    blur: COMMON_DEFAULT_VALUE.blur,
    translate: COMMON_DEFAULT_VALUE.translate
}

export const LINE_DEFAULT_VALUE = {
    width: 1,
    color: COMMON_DEFAULT_VALUE.color,
    opacity: COMMON_DEFAULT_VALUE.opacity,
    offset: COMMON_DEFAULT_VALUE.offset,
    blur: COMMON_DEFAULT_VALUE.blur,
    translate: COMMON_DEFAULT_VALUE.translate,
    dasharray: [1],
    cap: 'butt',
    join: 'miter'
}

export const POLYGON_DEFAULT_VALUE = {
    color: COMMON_DEFAULT_VALUE.color,
    opacity: COMMON_DEFAULT_VALUE.opacity
}

export const TEXT_DEFAULT_VALUE = {
    size: 16,
    color: COMMON_DEFAULT_VALUE.color,
    opacity: COMMON_DEFAULT_VALUE.opacity,
    translate: COMMON_DEFAULT_VALUE.translate,
    fontFamily: ["Open Sans Regular","Arial Unicode MS Regular"],
    haloWidth: 0,
    anchor: 'center',
    spacing: 0,
    allowOverlap: false,
    padding: 0
}