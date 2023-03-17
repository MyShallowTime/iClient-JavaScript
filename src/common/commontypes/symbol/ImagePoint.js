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
 * @category BaseTypes Symbol
 * @extends {Point}
 * @param {string} image - 符号图片。
 * @param {number} [rotate = 0] - 符号旋转角度。
 * @param {[number, number]} [translate = [0, 0]] - 符号偏移值。
 * @param {string} [type = 'ImagePoint'] - 符号类型。
 * @example
 * const symbol = new ImagePointSymbol({
 *      image: "xx.png"
 * });
 * @usage
 */
export class ImagePoint extends Point {

    constructor(option) {
        super(option);
        const { image, color, rotate, translate } = option ?? {};

        /**
         * @member {string} ImagePointSymbol.prototype.image
         * @description 符号图片， 必选参数。
         */
        this.image = image;

        /**
         * @member {string} PointSymbol.prototype.color
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
         * @member {string} ImagePointSymbol.prototype.type
         * @description  点符号的类型。
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
        this.rotate = null;
        this.translate = null;
        super.destroy();
    }
}
