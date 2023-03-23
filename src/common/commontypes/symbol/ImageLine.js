/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * @class ImageLineSymbol
 * @aliasclass Symbol.ImageLine
 * @classdesc 图片线符号
 * @category BaseTypes Symbol
 * @extends {LineSymbol}
 * @param {object} options - 参数。
 * @param {string} options.image - 线贴图。
 * @example
 * const symbol = new ImageLineSymbol({
 *  image: "xx.png"
 * });
 * @usage
 */
export class ImageLine extends Line {

    constructor(options) {
        super(options);
        const { image } = options ?? {};

        /**
         * @member {string} BaseLineSymbol.prototype.image
         * @description 线贴图。
         */
        this.image = image;
      
        this.type = "ImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.ImageLine";
    }

    /**
     * @function ImageLineSymbol.prototype.clone
     * @description 克隆点符号。
     * @returns {ImageLineSymbol} 克隆后的点符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ImageLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ImageLineSymbol.prototype.destroy
     * @description 释放图片线符号的资源。
     */
    destroy() {
        this.image = null;
        super.destroy();
    }
}