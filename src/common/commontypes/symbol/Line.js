/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Symbol} from '../Symbol';
import {Util} from '../Util';
import { LINE_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class LineSymbol
 * @aliasclass Symbol.Line
 * @classdesc 线符号类。
 * @category BaseTypes Symbol
 * @param {object} [options] - 参数。 
 * @param {number} [options.width = 1] - 线宽度。
 * @param {number} [options.opacity = 1] - 符号透明度。
 * @example
 * const symbol = new LineSymbol();
 * @usage
 */
export class Line extends Symbol {

    constructor(options) {
        super();
        const { width, opacity } = options ?? {};

        /**
         * @member {number} LineSymbol.prototype.width
         * @description 线宽，默认值：1。
         */
        this.width = width ?? LINE_DEFAULT_VALUE.width;

        /**
         * @member {number} LineSymbol.prototype.opacity
         * @description 点符号的透明度，默认值：1
         */
        this.opacity = opacity ?? LINE_DEFAULT_VALUE.opacity;

        /**
         * @member {string} LineSymbol.prototype.type
         * @description 点符号的类型。
         */
        this.type = "Line";
        this.CLASS_NAME = "SuperMap.Symbol.Line";
    }

    /**
     * @function LineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {LineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Line();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function LineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.width = null;
        this.opacity = null;
        super.destroy();
    }
}
