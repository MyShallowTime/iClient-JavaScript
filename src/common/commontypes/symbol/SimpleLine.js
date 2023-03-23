/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {Line} from './Line';

/**
 * @class SimpleLineSymbol
 * @classdesc 基本线符号类
 * @category BaseTypes Symbol
 * @extends {LineSymbol}
 * @param {object} [options] - 参数。
 * @param {Array<number>} [options.dashArray] - 虚线的间隔。
 * @param {string} [options.color] - 线颜色。
 * @param {number} [options.offset] - 线偏移值。
 * @param {Array<number>} [options.translate] - 线相对偏移值。
 * @param {number} [options.blur] - 线模糊度。
 * @param {string} [options.cap] - 线端点样式，"butt", "round", "square"。
 * @param {string} [options.join] - 线连接样式, "bevel", "round", "miter"。
 * 
 * @usage
 */
export class SimpleLine extends Line {

    constructor(options) {
        super(options);
        const { dashArray, color, offset, translate, blur, cap, join } = options ?? {};

        /**
         * @member {Array<number>} SimpleLineSymbol.prototype.dashArray
         * @description 虚线的间隔。
         */
        this.dashArray = dashArray;

        /**
         * @member {string} SimpleLineSymbol.prototype.color
         * @description 虚线颜色。
         */
        this.color = color ?? LINE_DEFAULT_VALUE.color;

        /**
         * @member {number} SimpleLineSymbol.prototype.offset
         * @description 线偏移值。
         */
        this.offset = offset ?? LINE_DEFAULT_VALUE.offset;

        /**
         * @member {Array<number>} SimpleLineSymbol.prototype.translate
         * @description 线相对偏移值。
         */
        this.translate = translate ?? LINE_DEFAULT_VALUE.translate;

        /**
         * @member {number} SimpleLineSymbol.prototype.blur
         * @description 线模糊度。
         */
        this.blur = blur ?? LINE_DEFAULT_VALUE.blur;

        /**
         * @member {string} SimpleLineSymbol.prototype.cap
         * @description 线端点样式，
         */
        this.cap = cap ?? LINE_DEFAULT_VALUE.cap;

        /**
         * @member {string} SimpleLineSymbol.prototype.join
         * @description 线连接样式
         */
        this.join = join ?? LINE_DEFAULT_VALUE.join;
      
        this.type = "SimpleLine";
        this.CLASS_NAME = "SuperMap.Symbol.SimpleLine";
    }

    /**
     * @function LineSymbol.prototype.clone
     * @description 克隆点符号。
     * @returns {LineSymbol} 克隆后的点符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new SimpleLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function LineSymbol.prototype.destroy
     * @description 释放点符号的资源。
     */
    destroy() {
        this.dashArray = null;
        this.color = null;
        this.offset = null;
        this.translate = null;
        this.blur = null;
        this.cap = null;
        this.join = null;
        super.destroy();
    }
}