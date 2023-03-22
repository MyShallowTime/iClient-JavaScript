/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * @class BaseLineSymbol
 * @classdesc 基本线符号类
 * @category BaseTypes Symbol
 * @extends {Symbol}
 * @param {object} options - 可选参数。
 * @param {object} [options.linear] - 渐变效果。
 * @param {string} [options.linear.sourceColor] - 线起始颜色。
 * @param {string} [options.linear.targetColor] - 线结尾颜色。
 * @param {string} [options.linear.linearDir] - 线渐变方向。
 * @param {object} [options.dash] - 虚线参数。
 * @param {[number, number]} [options.dash.dashArray] - 虚线的间隔
 * @param {string} [options.dash.color] - 虚线颜色
 * @usage
 * @private
 */
export class BaseLine extends Line {

    constructor(option) {
        super();
        const { linear, dash } = option ?? {};

        /**
         * @member {number} BaseLineSymbol.prototype.linear
         * @description 渐变效果。
         */
        this.linear = linear;

        /**
         * @member {number} BaseLineSymbol.prototype.dash
         * @description 虚线参数。
         */
        this.dash = dash;
      
        this.type = "BaseLine";
        this.CLASS_NAME = "SuperMap.Symbol.BaseLine";
    }

    /**
     * @function LineSymbol.prototype.clone
     * @description 克隆点符号。
     * @returns {LineSymbol} 克隆后的点符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new BaseLine();
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
        this.linear = null;
        this.dash = null;
        super.destroy();
    }
}