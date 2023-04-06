/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {ImageLine} from './ImageLine';

/**
 * @class SimpleImageLineSymbol
 * @aliasclass Symbol.SimpleImageLine
 * @classdesc 简单线图片符号
 * @category Symbol Line
 * @extends {ImageLineSymbol}
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
 * const symbol = new SimpleImageLineSymbol({
 *  image: "xx.png"
 * });
 * @usage
 */
export class SimpleImageLine extends ImageLine {

    constructor(options) {
        super(options);
        const { blur, heightFixed, rasingHeight, borderColor, borderWidth, cap, join, arrowWidth, arrowHeight, tailWidth, offset } = options ?? {};

        /**
     * @member {number} SimpleImageLineSymbol.prototype.blur
     * @description 线模糊度。
     */
        this.blur = blur;

        /**
         * @member {boolean} SimpleImageLineSymbol.prototype.heightFixed
         * @description 抬升高度是否随 zoom 变化。
         */
        this.heightFixed = heightFixed ?? LINE_DEFAULT_VALUE.heightFixed;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.rasingHeight
         * @description 抬升高度。
         */
        this.rasingHeight = rasingHeight ?? LINE_DEFAULT_VALUE.rasingHeight
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.borderColor
         * @description 图形边框颜色。
         */
        this.borderColor = borderColor ?? LINE_DEFAULT_VALUE.borderColor;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.borderWidth
         * @description 图形边框半径。
         */
        this.borderWidth = borderWidth ?? LINE_DEFAULT_VALUE.borderWidth;
  
        /**
         * @member {string} SimpleImageLineSymbol.prototype.cap
         * @description 线端点样式，
         */
        this.cap = cap ?? LINE_DEFAULT_VALUE.cap;
  
        /**
         * @member {string} SimpleImageLineSymbol.prototype.join
         * @description 线连接样式
         */
        this.join = join ?? LINE_DEFAULT_VALUE.join;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.arrowWidth
         * @description 箭头的宽度。
         */
        this.arrowWidth = arrowWidth ?? LINE_DEFAULT_VALUE.arrowWidth;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.arrowHeight
         * @description 箭头的长度。
         */
        this.arrowHeight = arrowHeight ?? LINE_DEFAULT_VALUE.arrowHeight;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.tailWidth
         * @description 箭头尾部宽度。
         */
        this.tailWidth = tailWidth ?? LINE_DEFAULT_VALUE.tailWidth;
  
        /**
         * @member {number} SimpleImageLineSymbol.prototype.offset
         * @description 线偏移。
         */
        this.offset = offset ?? LINE_DEFAULT_VALUE.offset;
      
        this.type = "SimpleImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.SimpleImageLine";
    }

    /**
     * @function SimpleImageLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {SimpleImageLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new SimpleImageLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function SimpleImageLineSymbol.prototype.destroy 
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