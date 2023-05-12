import { number } from "../../../../libs/echarts/echarts-en"

const COMMON_DEFAULT_VALUE = {
    color: '#000',
    opacity: 1,
    rotate: 0,
    translate: [0, 0],
    offset: 0,
    blur: 0,
    height: 0,
    raisingHeight: 0,
    heightfixed: false
}

export const POINT_DEFAULT_VALUE = {
    color: COMMON_DEFAULT_VALUE.color,
    opacity: COMMON_DEFAULT_VALUE.opacity
}

export const IMAGE_POINT_DEFAULT_VALUE = {
    size: 0.16,
    ...POINT_DEFAULT_VALUE,
    rotate: COMMON_DEFAULT_VALUE.rotate,
    translate: COMMON_DEFAULT_VALUE.translate,
    raisingHeight: COMMON_DEFAULT_VALUE.raisingHeight,
    heightfixed: COMMON_DEFAULT_VALUE.heightfixed
}

export const SIMPLE_POINT_DEFAULT_VALUE = {
    size: 0.16,
    ...POINT_DEFAULT_VALUE,
    shape: 'circle',
    strokeColor: '#FFF',
    strokeWidth: 0,
    strokeOpacity: COMMON_DEFAULT_VALUE.opacity,
    blur: COMMON_DEFAULT_VALUE.blur,
    translate: COMMON_DEFAULT_VALUE.translate,
    raisingHeight: COMMON_DEFAULT_VALUE.raisingHeight,
    heightfixed: COMMON_DEFAULT_VALUE.heightfixed
}

export const ANIMATE_POINT_DEFAULT_VALUE = {
    size:1,
    speed:1
}

export const WAVE_ANIMATE_POINT_DEFAULT_VALUE = {
    rings: 3,
    translate: COMMON_DEFAULT_VALUE.translate
}

export const POINT_3D_DEFAULT_VALUE = {
    shape: 'cylinder',
    width: 1,
    length: 1,
    height: 10,
    depth: true,
    pickLight: false,
    lightEnable: true,
    heightfixed: false,
    opacityLinearDir: 'none'
}

export const ANIMATE_POINT_3D_DEFAULT_VALUE = {
    ...POINT_3D_DEFAULT_VALUE,
    repeat: 1,
    speed: 0.01
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
    join: 'miter',
    iconStep: 100,
    textureBlend: 'normal',
    heightFixed: false,
    rasingHeight: COMMON_DEFAULT_VALUE.height,
    borderColor: COMMON_DEFAULT_VALUE.color,
    borderWidth: 0,
    arrowWidth: 2,
    arrowHeight: 3,
    tailWidth: 1,
    segmentNumber: 30,
    thetaOffset: 0.314,
    iconStepCount: 1
}

// mapbox key对应的默认样式
export const MAPBOX_CIRCLE_DEFAULT = {
    paint: {
        'circle-blur': SIMPLE_POINT_DEFAULT_VALUE.blur,
        'circle-color': SIMPLE_POINT_DEFAULT_VALUE.color,
        'circle-opacity': SIMPLE_POINT_DEFAULT_VALUE.opacity,
        'circle-radius': SIMPLE_POINT_DEFAULT_VALUE.size / 2,
        'circle-stroke-color': SIMPLE_POINT_DEFAULT_VALUE.strokeColor,
        'circle-stroke-width': SIMPLE_POINT_DEFAULT_VALUE.strokeWidth,
        'circle-stroke-opacity': SIMPLE_POINT_DEFAULT_VALUE.strokeOpacity,
        'circle-translate': SIMPLE_POINT_DEFAULT_VALUE.translate
        // 符号库暂未支持的属性
        // 'circle-translate-anchor': symbolInfo.translateAnchor
    },
    layout: {
        visibility: 'visible'
    }
}

export const MAPBOX_SYMBOL_DEFAULT = {
    paint: {
        'icon-color': SIMPLE_POINT_DEFAULT_VALUE.color,
        'icon-opacity': SIMPLE_POINT_DEFAULT_VALUE.opacity,
        'icon-translate': SIMPLE_POINT_DEFAULT_VALUE.translate
    },
    layout: {
        'icon-size': SIMPLE_POINT_DEFAULT_VALUE.size,
        'icon-rotate': COMMON_DEFAULT_VALUE.rotate
    }
}
export const MAPBOX_LINE_DEFAULT = {
    paint: {
        'line-color': LINE_DEFAULT_VALUE.color,
        'line-width': LINE_DEFAULT_VALUE.width,
        'line-opacity': LINE_DEFAULT_VALUE.opacity,
        'line-dasharray': LINE_DEFAULT_VALUE.dasharray,
        'line-translate': LINE_DEFAULT_VALUE.translate,
        'line-offset': LINE_DEFAULT_VALUE.offset,
        'line-blur': LINE_DEFAULT_VALUE.blur
    },
    layout: {
        'line-join': LINE_DEFAULT_VALUE.join,
        'line-cap': LINE_DEFAULT_VALUE.cap
    }
}
export const MAPBOX_FILL_DEFAULT = {
    paint: {
        "fill-color": COMMON_DEFAULT_VALUE.color,
        'fill-opacity': COMMON_DEFAULT_VALUE.opacity
    }
}

export const POLYGON_DEFAULT_VALUE = {
    opacity: COMMON_DEFAULT_VALUE.opacity
}

export const IMAGE_POLYGON_DEFAULT_VALUE = {
    ...POLYGON_DEFAULT_VALUE,
    color: COMMON_DEFAULT_VALUE.color
}

export const SIMPLE_POLYGON_DEFAULT_VALUE = {
    ...POINT_DEFAULT_VALUE,
    color: COMMON_DEFAULT_VALUE.color,
    raisingHeight: COMMON_DEFAULT_VALUE.raisingHeight,
    opacityLinearDir: COMMON_DEFAULT_VALUE.opacityLinearDir
}

export const OCEAN_POLYGON_DEFAULT_VALUE = {
    ...POINT_DEFAULT_VALUE,
    shallowWaterColor: '#6D99A8',
    deepWaterColor: '#0F121C'
}

export const WATER_POLYGON_DEFAULT_VALUE = {
    ...POINT_DEFAULT_VALUE,
    texture: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*EojwT4VzSiYAAAAAAAAAAAAAARQnAQ',
    color: COMMON_DEFAULT_VALUE.color,
    speed: 0.1
}

export const POLYGON_3D_DEFAULT_VALUE = {
    height: 0,
    topsurface: true,
    sidesurface: true,
    raisingHeight: COMMON_DEFAULT_VALUE.raisingHeight,
    heightfixed: COMMON_DEFAULT_VALUE.heightfixed
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
    padding: 0,
    strokeColor:'#fff',
    strokeWidth:0,
    fontPath:'',
    heightfixed:COMMON_DEFAULT_VALUE.heightfixed,
    raisingHeiht:COMMON_DEFAULT_VALUE.raisingHeight,
    gamma:2,
    fontWeight:400,
    blur:COMMON_DEFAULT_VALUE.blur
}

/**
 * @enum {string}
 */
const SimplePointShapeType = {
    /** 圆形 */
    circle: 'circle',
    /** 正方形 */
    square: 'square',
    /** 三角形 */
    triangle: 'triangle',
    /** 六边形 */
    hexagon: 'hexagon',
    /** 五角形 */
    pentagon: 'pentagon',
    /** 八角形 */
    octogn: 'octogn',
    /** 六角形 */
    hexagram: 'hexagram',
    /** 菱形 */
    rhombus: 'rhombus',
    /** 两端尖的椭圆形 */
    vesica: 'vesica'
}
/**
 * @enum {string}
 */
const Point3DShapeType = {
    /** 圆柱体 */
    cylinder: 'cylinder',
    /** 正方体 */
    squareColumn: 'squareColumn',
    /** 三角体 */
    triangleColumn: 'triangleColumn',
    /** 六边体 */
    hexagonColumn: 'hexagonColumn'
}

export {
    SimplePointShapeType,
    Point3DShapeType
}

export const LayerType = {
    circle: 'circle',
    symbol: 'symbol',
    line: 'line',
    fill: 'fill'
}