/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Polygon } from './Polygon';
import {Util} from '../Util';

/**
 * @class ImagePolygonSymbol
 * @aliasclass Symbol.ImagePolygon
 * @classdesc 图片面符号类。
 * @category BaseTypes Symbol
 * @extends {PolygonSymbol}
 * @param {object} options - 参数。 
 * @param {string} options.image - 符号图片。
 * @example
 * const symbol = new ImagePolygonSymbol({
 *      image: "xx.png"
 * });
 * @usage
 */
export class ImagePolygon extends Polygon {

    constructor(options) {
        super(options);
        const { image, color } = options ?? {};

        /**
         * @member {string} ImagePolygonSymbol.prototype.image
         * @description 符号图片， 必选参数。
         */
        this.image = image;

        /**
         * @member {string} PolygonSymbol.prototype.color
         * @description 符号颜色，如果为undefined，显示图片自身颜色。
         */
        this.color = color;

        /**
         * @member {string} ImagePolygonSymbol.prototype.type
         * @description  面符号的类型。
         */
        this.type = "ImagePolygon";
        this.CLASS_NAME = "SuperMap.Symbol.ImagePolygon";
    }

    /**
     * @function ImagePolygonSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {ImagePolygonSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ImagePolygon({
                image: this.image
            });
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ImagePolygonSymbol.prototype.destroy
     * @description 释放符号资源。
     */
    destroy() {
        this.image = null;
        super.destroy();
    }
}
