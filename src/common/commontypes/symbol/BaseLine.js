/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * 渐变色线型模式
 * @typedef {Object} Linear
 * @property {string} sourceColor - 线起始颜色。
 * @property {string} targetColor - 线结尾颜色。
 * @property {('vertical' | 'horizontal')} [linearDir='vertical'] - 线渐变方向。
 */

/**
 * 直线型模式
 * @typedef {Object} Solid
 * @property {string} [color='#000'] - 线颜色。
 */

/**
 * 虚线型模式
 * @typedef {Object} Dash
 * @property {Array<number>} dashArray - 虚线的间隔。 // todo
 * @property {string} [color='#000'] - 线颜色。
 */

/**
 * @class BaseLineSymbol
 * @aliasclass Symbol.BaseLine
 * @classdesc 基础线符号类
 * @category Symbol Line
 * @extends {LineSymbol}
 * @param {object} options - 可选参数。
 * @param {Linear | Solid | Dash} [options.pattern] - 线型模式。
 */
export class BaseLine extends Line {

    constructor(option) {
        super();
        const { pattern } = option ?? {};

        /**
         * @member {Linear | Solid | Dash} BaseLineSymbol.prototype.pattern
         * @description 线型模式。
         */
        this.pattern = pattern;
      
        this.type = "BaseLine";
        this.CLASS_NAME = "SuperMap.Symbol.BaseLine";
    }

    /**
     * @function BaseLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {BaseLineSymbol} 克隆后的线符号。
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
     * @function BaseLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.pattern = null;
        super.destroy();
    }
}