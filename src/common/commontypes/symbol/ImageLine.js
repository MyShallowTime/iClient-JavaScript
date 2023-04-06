/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {Line} from './Line';

/**
 * @class ImageLineSymbol
 * @aliasclass Symbol.ImageLine
 * @classdesc 图片线符号
 * @category Symbol Line
 * @extends {LineSymbol}
 * @param {object} options - 参数。
 * @param {string} options.image - 线贴图。
 * @param {('normal' | 'replace')} [options.imageBlend='normal'] - 线贴图混合方式。
 * @param {number} [options.iconStep=100] - 贴图在线图层上面排布的间隔。
 * @param {string} [options.color='#000'] - 线颜色。
 */
export class ImageLine extends Line {

    constructor(options) {
        super(options);
        const { image, imageBlend, iconStep, color } = options ?? {};

        /**
         * @member {string} ImageLineSymbol.prototype.image
         * @description 线贴图。
         */
        this.image = image;

        /**
         * @member {('normal' | 'replace')} ImageLineSymbol.prototype.imageBlend
         * @description 线贴图混合方式。
         */
        this.imageBlend = imageBlend ?? LINE_DEFAULT_VALUE.textureBlend;

        /**
         * @member {number} ImageLineSymbol.prototype.iconStep
         * @description 贴图在线图层上面排布的间隔。
         */
        this.iconStep = iconStep ?? LINE_DEFAULT_VALUE.iconStep;

        /**
         * @member {string} ImageLineSymbol.prototype.color
         * @description 线颜色。
         */
        this.color = color ?? LINE_DEFAULT_VALUE.color;
      
        this.type = "ImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.ImageLine";
    }

    /**
     * @function ImageLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {ImageLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ImageLine({
                image: this.image
            });
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
        this.color = null;
        super.destroy();
    }
}