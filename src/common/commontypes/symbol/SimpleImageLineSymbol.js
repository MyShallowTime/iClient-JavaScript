/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {ImageLine} from './ImageLine';

/**
 * @class SimpleImageLineSymbol
 * @aliasclass Symbol.SimpleImageLine
 * @classdesc 简单图片线符号
 * @category BaseTypes Symbol
 * @extends {Symbol}
 * @param {object} options - 可选参数。
 * @param {boolean} [options.heightFixed] - 抬升高度是否随zoom变化。
 * @param {number} [options.raisingHeight] - 抬升高度。
 * @param {string} [options.imageBlend] - 可选参数，纹理混合方式。'normal','replace。
 * @param {number} [options.iconStep] - 可选参数，理贴图在线图层上面排布的间隔。
 * @param {object} [options.arrow] - 箭头样式参数
 * @param {number} [options.arrow.arrowWidth] - 箭头的宽度。
 * @param {number} [options.arrow.arrowHeight] - 箭头的长度。
 * @param {number} [options.arrow.tailWidth] - 箭头尾部宽度。
 * @param {object} [options.solid] - 直线样式参数
 * @param {string} [options.solid.borderColor] - 边框颜色。
 * @param {string} [options.solid.borderWidth] - 边框半径。
 * @example
 * const symbol = new SimpleImageLineSymbol();
 * @usage
 */
export class SimpleImageLine extends ImageLine {

    constructor(option) {
        super();
        const { heightFixed, raisingHeight, arrow, solid } = option ?? {};

        /**
         * @member {boolean} SimpleImageLineSymbol.prototype.heightFixed
         * @description 抬升高度是否随zoom变化。
         */
        this.heightFixed = heightFixed;
        
        /**
         * @member {number} SimpleImageLineSymbol.prototype.raisingHeight
         * @description 抬升高度。
         */
        this.raisingHeight = raisingHeight;

        /**
         * @member {number} SimpleImageLineSymbol.prototype.arrow
         * @description 箭头样式参数。
         */
        this.arrow = arrow;

        /**
         * @member {number} SimpleImageLineSymbol.prototype.solid
         * @description 直线样式参数。
         */
        this.solid = solid;
      
        this.type = "ImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.ImageLine";
    }

    /**
     * @function SimpleImageLineSymbol.prototype.clone
     * @description 克隆点符号。
     * @returns {SimpleImageLineSymbol} 克隆后的点符号。
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
        this.heightFixed = null;
        this.raisingHeight = null;
        this.arrow = null;
        this.solid = null;
        super.destroy();
    }
}