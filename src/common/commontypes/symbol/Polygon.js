/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Symbol} from '../Symbol';
import {Util} from '../Util';
import { POLYGON_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class PolygonSymbol
 * @aliasclass Symbol.Polygon
 * @classdesc 面符号抽象类。
 * @category Symbol Polygon
 * @param {object} [options] - 参数。 
 * @param {number} [options.opacity = 1] - 符号透明度。
 */
export class Polygon extends Symbol {

    constructor(options) {
        super();
        const { opacity } = options ?? {};

        /**
         * @member {number} PolygonSymbol.prototype.opacity
         * @description 面符号的透明度，默认值：1
         */
        this.opacity = opacity ?? POLYGON_DEFAULT_VALUE.opacity;

        /**
         * @member {string} PolygonSymbol.prototype.type
         * @description 面符号的类型。
         */
        this.type = "Polygon";
        this.CLASS_NAME = "SuperMap.Symbol.Polygon";
    }

    /**
     * @function PolygonSymbol.prototype.clone
     * @description 克隆面符号。
     * @returns {PolygonSymbol} 克隆后的面符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Polygon();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function PolygonSymbol.prototype.destroy
     * @description 释放面符号的资源。
     */
    destroy() {
        this.opacity = null;
        super.destroy();
    }
}
