/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DASH_DEFAULT_VALUE} from './DefaultValue';
import {Line} from './Line';

/**
 * @class SimpleLineSymbol
 * @aliasclass Symbol.SimpleLine
 * @classdesc 简单线符号类
 * @category BaseTypes Symbol
 * @extends {Symbol}
 * @param {object} options - 可选参数。
 * @param {[number, number, number]} [options.blur] - 模糊分布。
 * @param {boolean} [options.heightFixed] - 抬升高度是否随zoom变化。
 * @param {number} [options.raisingHeight] - 抬升高度。
 * @param {object} [options.arrow] - 箭头样式参数
 * @param {number} [options.arrow.arrowWidth] - 箭头的宽度。
 * @param {number} [options.arrow.arrowHeight] - 箭头的长度。
 * @param {number} [options.arrow.tailWidth] - 箭头尾部宽度。
 * @param {object} [options.solid] - 直线样式参数
 * @param {string} [options.solid.borderColor] - 边框颜色。
 * @param {string} [options.solid.borderWidth] - 边框半径。
 * @param {string} [options.solid.color] - 直线颜色。
 * @example
 * const symbol = new SimpleLineSymbol();
 * @usage
 */
export class SimpleLine extends Line {

    constructor(option) {
        super();
        const { blur, heightFixed, raisingHeight, arrow, solid } = option ?? {};

        /**
         * @member {[number, number, number]} SimpleLineSymbol.prototype.blur
         * @description 模糊分布。
         */
        this.blur = blur;

        /**
         * @member {boolean} SimpleLineSymbol.prototype.heightFixed
         * @description 抬升高度是否随zoom变化。
         */
        this.heightFixed = heightFixed;
        
        /**
         * @member {number} SimpleLineSymbol.prototype.raisingHeight
         * @description 抬升高度。
         */
        this.raisingHeight = raisingHeight;

        /**
         * @member {number} SimpleLineSymbol.prototype.arrow
         * @description 箭头样式参数。
         */
        this.arrow = arrow;

        /**
         * @member {number} SimpleLineSymbol.prototype.solid
         * @description 直线样式参数。
         */
        this.solid = solid ?? LINE_DASH_DEFAULT_VALUE;
      
        this.type = "SimpleLine";
        this.CLASS_NAME = "SuperMap.Symbol.SimpleLine";
    }

    /**
     * @function SimpleLineSymbol.prototype.clone
     * @description 克隆简单线符号。
     * @returns {SimpleLineSymbol} 克隆后的点符号。
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
     * @function SimpleLineSymbol.prototype.destroy
     * @description 释放简单线符号的资源。
     */
    destroy() {
        this.blur = null;
        this.heightFixed = null;
        this.raisingHeight = null;
        this.arrow = null;
        this.solid = null;
        super.destroy();
    }
}