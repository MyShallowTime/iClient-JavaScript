/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Symbol} from '../Symbol';
import {Util} from '../Util';
import { POINT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class PointSymbol
 * @aliasclass Symbol.Point
 * @classdesc 点符号抽象类。
 * @category Symbol Point
 * @param {object} [options] - 参数。 
 * @param {string} [options.color = "#000"] - 符号颜色。
 * @param {number} [options.opacity = 1] - 符号透明度。
 */
export class Point extends Symbol {

    constructor(options) {
        super();
        const { color, opacity } = options ?? {};

        /**
         * @member {string} PointSymbol.prototype.color
         * @description 点符号的颜色，默认值："#000"。
         */
        this.color = color ?? POINT_DEFAULT_VALUE.color;

        /**
         * @member {number} PointSymbol.prototype.opacity
         * @description 点符号的透明度，默认值：1
         */
        this.opacity = opacity ?? POINT_DEFAULT_VALUE.opacity;

        /**
         * @member {string} PointSymbol.prototype.type
         * @description 点符号的类型。
         */
        this.type = "Point";
        this.CLASS_NAME = "SuperMap.Symbol.Point";
    }

    /**
     * @function PointSymbol.prototype.clone
     * @description 克隆点符号。
     * @returns {PointSymbol} 克隆后的点符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Point();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function PointSymbol.prototype.destroy
     * @description 释放点符号的资源。
     */
    destroy() {
        this.size = null;
        this.color = null;
        this.opacity = null;
        super.destroy();
    }
}
