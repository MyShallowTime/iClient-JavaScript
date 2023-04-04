/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Polygon } from './Polygon';
import {Util} from '../Util';
import { SIMPLE_POLYGON_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class SimplePolygonSymbol
 * @aliasclass Symbol.SimplePolygon
 * @classdesc 简单面符号类。
 * @category Symbol Polygon
 * @extends {PolygonSymbol}
 * @param {object} [options] - 参数。 
 * @param {string} [options.color = "#000"] - 符号颜色。
 * @param {number} [options.raisingHeight = 0] - 抬升高度。
 * @param {string} [options.opacityLinearDir = 'none'] - 透明度渐变方向。
 * @example
 * const symbol = new SimplePolygonSymbol();
 * @usage
 */
export class SimplePolygon extends Polygon {

    constructor(options) {
        super(options);
        const { color, raisingHeight, opacityLinearDir } = options ?? {};

        /**
         * @member {string} SimplePolygonSymbol.prototype.color
         * @description 符号颜色，默认值：'#000'。
         */
        this.color = color ?? SIMPLE_POLYGON_DEFAULT_VALUE.color;

        /**
         * @member {number} SimplePolygonSymbol.prototype.raisingHeight
         * @description 符号抬升高度，默认值：0
         */
        this.raisingHeight = raisingHeight ?? SIMPLE_POLYGON_DEFAULT_VALUE.raisingHeight;

        /**
         * @member {string} SimplePolygonSymbol.prototype.opacityLinearDir
         * @description 透明度渐变方向，默认值："none"。
         */
        this.opacityLinearDir = opacityLinearDir ?? SIMPLE_POLYGON_DEFAULT_VALUE.opacityLinearDir;

        /**
         * @member {string} SimplePolygonSymbol.prototype.type
         * @description  面符号的类型。
         */
        this.type = "SimplePolygon";
        this.CLASS_NAME = "SuperMap.Symbol.SimplePolygon";
    }

    /**
     * @function SimplePolygonSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {SimplePolygonSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new SimplePolygon();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function SimplePolygonSymbol.prototype.destroy
     * @description 释放符号资源。
     */
    destroy() {
        this.color = null;
        this.raisingHeight = null;
        this.opacityLinearDir = null;
        super.destroy();
    }
}
