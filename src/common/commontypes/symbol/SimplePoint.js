/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Point} from './Point';
import {Util} from '../Util';
import { SIMPLE_POINT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class SimplePointSymbol
 * @aliasclass Symbol.SimplePoint
 * @classdesc 简单点符号类。
 * @category BaseTypes Symbol
 * @extends {Point}
 * @param {number} [strokeColor = "#FFF"] - 符号边框颜色。
 * @param {string} [strokeWidth = 0] - 符号边框宽度。
 * @param {number} [strokeOpacity = 1] - 符号边框透明度。
 * @param {number} [translate = [0, 0]] - 符号偏移值。
 * @param {number} [blur = 0] - 符号模糊半径。
 * @param {string} [type = 'SimplePoint'] - 符号类型。
 * @example
 * const symbol = new SimplePointSymbol();
 * @usage
 */
export class SimplePoint extends Point {

    constructor(option) {
        super();
        const { strokeColor, strokeWidth, strokeOpacity, translate, blur } = option ?? {};

        /**
         * @member {number} SimplePointSymbol.prototype.strokeColor
         * @description 符号边框颜色，默认值："#FFF"。
         */
        this.strokeColor = strokeColor ?? SIMPLE_POINT_DEFAULT_VALUE.strokeColor;

        /**
         * @member {string} SimplePointSymbol.prototype.strokeWidth
         * @description 符号边框宽度，默认值：0。
         */
        this.strokeWidth = strokeWidth ?? SIMPLE_POINT_DEFAULT_VALUE.strokeWidth;

        /**
         * @member {string} SimplePointSymbol.prototype.strokeOpacity
         * @description 符号边框透明度，默认值：1。
         */
        this.strokeOpacity = strokeOpacity ?? SIMPLE_POINT_DEFAULT_VALUE.strokeOpacity;

        /**
         * @member {number} SimplePointSymbol.prototype.translate
         * @description  符号偏移值，默认值：[0, 0]
         */
        this.translate = translate ?? SIMPLE_POINT_DEFAULT_VALUE.translate;

        /**
         * @member {number} SimplePointSymbol.prototype.blur
         * @description 符号模糊半径，默认值：0
         */
        this.blur = blur ?? SIMPLE_POINT_DEFAULT_VALUE.blur;

        /**
         * @member {string} SimplePointSymbol.prototype.type
         * @description 符号类型。
         */
        this.type = "SimplePoint";
        this.CLASS_NAME = "SuperMap.Symbol.SimplePoint";
    }

    /**
     * @function SimplePointSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {SimplePointSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new SimplePoint();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function SimplePointSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.strokeColor = null;
        this.strokeWidth = null;
        this.strokeOpacity = null;
        this.translate = null;
        this.blur = null;
        super.destroy();
    }
}
