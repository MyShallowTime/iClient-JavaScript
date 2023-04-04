/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {AnimatePolygon} from './AnimatePolygonSymbol';
import {Util} from '../Util';
import { WATER_POLYGON_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class WaterAnimatePolygonSymbol
 * @aliasclass Symbol.WaterAnimatePolygon
 * @classdesc 水面符号类。
 * @category BaseTypes Symbol
 * @extends {AnimatePolygonSymbol}
 * @param {object} [options] - 参数。 
 * @param {string} [options.texture = 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*EojwT4VzSiYAAAAAAAAAAAAAARQnAQ'] - 水面纹理。
 * @param {string} [options.color = '#000'] - 水面颜色。
 * @param {number} [options.speed = 0.1] - 流动速度。
 * @usage
 */
export class WaterAnimatePolygon extends AnimatePolygon {

    constructor(options) {
        super(options);
        const { texture, color, speed } = options ?? {};

        /**
         * @member {string} WaterAnimatePolygonSymbol.prototype.texture
         * @description 符号图片。
         */
        this.texture = texture;

        /**
         * @member {string} WaterAnimatePolygonSymbol.prototype.speed
         * @description 阴影颜色，默认值：'#6D99A8'
         */
        this.speed = speed ?? WATER_POLYGON_DEFAULT_VALUE.speed;

        /**
         * @member {string} WaterAnimatePolygonSymbol.prototype.color
         * @description 深度颜色，默认值：'#0F121C'
         */
        this.color = color ?? WATER_POLYGON_DEFAULT_VALUE.color;

        /**
         * @member {string} WaterAnimatePolygonSymbol.prototype.type
         * @description 符号的类型。
         */
        this.type = "WaterAnimatePolygon";
        this.CLASS_NAME = "SuperMap.Symbol.WaterAnimatePolygon";
    }

    /**
     * @function WaterAnimatePolygonSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {WaterAnimatePolygonSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new WaterAnimatePolygon();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function WaterAnimatePolygonSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.texture = null;
        this.color = null;
        this.speed = null;
        super.destroy();
    }
}
