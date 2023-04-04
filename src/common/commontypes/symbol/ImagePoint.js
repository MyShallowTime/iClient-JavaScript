/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Point } from './Point';
import {Util} from '../Util';
import { IMAGE_POINT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class ImagePointSymbol
 * @aliasclass Symbol.ImagePoint
 * @classdesc 图片点符号类。
 * @category Symbol Point
 * @extends {PointSymbol}
 * @param {object} options - 参数。 
 * @param {string} options.image - 符号图片。
 * @param {number} [options.rotate = 0] - 符号旋转角度。
 * @param {Array<number>} [options.translate = [0, 0]] - 符号偏移值。
 * @param {number} [options.raisingHeight = 0] - 符号抬升高度。
 * @param {boolean} [options.heightfixed = false] - 符号抬升高度是否随 zoom 变化。
 * @example
 * const symbol = new ImagePointSymbol({
 *      image: "xx.png"
 * });
 * @usage
 */
export class ImagePoint extends Point {

    constructor(options) {
        super(options);
        const { image, size, color, rotate, translate, raisingHeight, heightfixed } = options ?? {};

        /**
         * @member {string} ImagePointSymbol.prototype.image
         * @description 符号图片， 必选参数。
         */
        this.image = image;

        /**
         * @member {number} ImagePointSymbol.prototype.size
         * @description 点符号的大小，默认值：1。
         */
        this.size = size ?? IMAGE_POINT_DEFAULT_VALUE.size;

        /**
         * @member {string} ImagePointSymbol.prototype.color
         * @description 符号颜色，如果为undefined，显示图片自身颜色。
         */
        this.color = color;

        /**
         * @member {number} ImagePointSymbol.prototype.rotate
         * @description 符号旋转角度，默认值：0。
         */
        this.rotate = rotate ?? IMAGE_POINT_DEFAULT_VALUE.rotate;

        /**
         * @member {number} ImagePointSymbol.prototype.translate
         * @description  符号偏移值，默认值：[0, 0]
         */
        this.translate = translate ?? IMAGE_POINT_DEFAULT_VALUE.translate;

        /**
         * @member {number} ImagePointSymbol.prototype.raisingHeight
         * @description 符号抬升高度，默认值：0
         */
        this.raisingHeight = raisingHeight ?? IMAGE_POINT_DEFAULT_VALUE.raisingHeight;

         /**
          * @member {boolean} ImagePointSymbol.prototype.heightfixed
          * @description 符号抬升高度是否随 zoom 变化，默认值：false
          */
        this.heightfixed = heightfixed ?? IMAGE_POINT_DEFAULT_VALUE.heightfixed;
        
        /**
         * @member {string} ImagePointSymbol.prototype.type
         * @description  点符号的类型 - "ImagePoint"。
         */
        this.type = "ImagePoint";
        this.CLASS_NAME = "SuperMap.Symbol.ImagePoint";
    }

    /**
     * @function ImagePointSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {ImagePointSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ImagePoint({
                image: this.image
            });
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ImagePointSymbol.prototype.destroy
     * @description 释放符号资源。
     */
    destroy() {
        this.image = null;
        this.size = null;
        this.color = null;
        this.rotate = null;
        this.translate = null;
        this.raisingHeight = null;
        this.heightfixed = null;
        super.destroy();
    }
}
