/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {AnimateLine} from './AnimateLine';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class SimpleAnimateLineSymbol
 * @aliasclass Symbol.SimpleAnimateLine
 * @classdesc 简单线图片符号
 * @category BaseTypes Symbol
 * @extends {AnimateLineSymbol}
 * @param {object} options - 参数。
 * @param {number} [options.blur] - 图形模糊分布。
 * @param {boolean} [options.heightFixed=false] - 抬升高度是否随 zoom 变化。
 * @param {number} [options.rasingHeight=0] - 抬升高度。
 * @param {string} [options.borderColor='#000'] - 图形边框颜色。
 * @param {number} [options.borderWidth=0] - 图形边框半径。
 * @param {('butt' | 'round' | 'square')} [options.cap='butt'] - 线端点样式。
 * @param {('bevel' | 'round' | 'miter')} [options.join='miter'] - 线连接处样式。
 * @param {number} [options.arrowWidth=2] - 箭头的宽度。
 * @param {number} [options.arrowHeight=3] - 箭头的长度。
 * @param {string} [options.tailWidth=1] - 箭头尾部宽度。
 * @param {number} [options.offset=0] - 线偏移。
 * @example
 * const symbol = new SimpleAnimateLine();
 * @usage
 */
export class SimpleAnimateLine extends AnimateLine {

    constructor(options) {
        super(options);
        const { blur, heightFixed, rasingHeight, borderColor, borderWidth, cap, join, arrowWidth, arrowHeight, tailWidth, offset } = options ?? {};

        /**
     * @member {number} SimpleAnimateLineSymbol.prototype.blur
     * @description 线模糊度。
     */
        this.blur = blur;

        /**
         * @member {boolean} SimpleAnimateLineSymbol.prototype.heightFixed
         * @description 抬升高度是否随 zoom 变化。
         */
        this.heightFixed = heightFixed ?? LINE_DEFAULT_VALUE.heightFixed;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.rasingHeight
         * @description 抬升高度。
         */
        this.rasingHeight = rasingHeight ?? LINE_DEFAULT_VALUE.rasingHeight
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.borderColor
         * @description 图形边框颜色。
         */
        this.borderColor = borderColor ?? LINE_DEFAULT_VALUE.borderColor;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.borderWidth
         * @description 图形边框半径。
         */
        this.borderWidth = borderWidth ?? LINE_DEFAULT_VALUE.borderWidth;
  
        /**
         * @member {string} SimpleAnimateLineSymbol.prototype.cap
         * @description 线端点样式，
         */
        this.cap = cap ?? LINE_DEFAULT_VALUE.cap;
  
        /**
         * @member {string} SimpleAnimateLineSymbol.prototype.join
         * @description 线连接样式
         */
        this.join = join ?? LINE_DEFAULT_VALUE.join;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.arrowWidth
         * @description 箭头的宽度。
         */
        this.arrowWidth = arrowWidth ?? LINE_DEFAULT_VALUE.arrowWidth;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.arrowHeight
         * @description 箭头的长度。
         */
        this.arrowHeight = arrowHeight ?? LINE_DEFAULT_VALUE.arrowHeight;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.tailWidth
         * @description 箭头尾部宽度。
         */
        this.tailWidth = tailWidth ?? LINE_DEFAULT_VALUE.tailWidth;
  
        /**
         * @member {number} SimpleAnimateLineSymbol.prototype.offset
         * @description 线偏移。
         */
        this.offset = offset ?? LINE_DEFAULT_VALUE.offset;
      
        this.type = "SimpleAnimateLine";
        this.CLASS_NAME = "SuperMap.Symbol.SimpleAnimateLine";
    }

    /**
     * @function SimpleAnimateLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {SimpleAnimateLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new SimpleAnimateLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function SimpleAnimateLineSymbol.prototype.destroy 
     * @description 释放图片线符号的资源。
     */
    destroy() {
        this.blur = null;
        this.heightFixed = null;
        this.rasingHeight = null;
        this.borderColor = null;
        this.borderWidth = null;
        this.cap = null;
        this.join = null;
        this.arrowWidth = null;
        this.arrowHeight = null;
        this.tailWidth = null;
        this.offset = null;
        super.destroy();
    }
}