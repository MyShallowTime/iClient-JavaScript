/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {BaseLine} from './BaseLine';

/**
 * @class ImageLineSymbol
 * @aliasclass Symbol.ImageLine
 * @classdesc 图片线符号
 * @category BaseTypes Symbol
 * @extends {Symbol}
 * @param {object} options - 参数。
 * @param {string} [options.image] - 线贴图。
 * @param {string} [options.imageBlend] - 可选参数，纹理混合方式。'normal','replace。
 * @param {number} [options.iconStep] - 可选参数，理贴图在线图层上面排布的间隔。
 * @example
 * const symbol = new ImageLineSymbol();
 * @usage
 * @private
 */
export class ImageLine extends BaseLine {

    constructor(option) {
        super();
        const { image, imageBlend, iconStep } = option ?? {};

        /**
         * @member {string} BaseLineSymbol.prototype.image
         * @description 线贴图。
         */
        this.image = image;

        /** 
         * @member {string} BaseLineSymbol.prototype.imageBlend
         * @description 可选参数，纹理混合方式。
         */
        this.imageBlend = imageBlend;

        /** 
         * @member {number} BaseLineSymbol.prototype.iconStep
         * @description 可选参数，理贴图在线图层上面排布的间隔。
         */
        this.iconStep = iconStep;
      
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
        this.imageBlend = null;
        this.iconStep = null;
        super.destroy();
    }
}