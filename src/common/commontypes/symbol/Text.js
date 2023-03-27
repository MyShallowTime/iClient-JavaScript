/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Symbol} from '../Symbol';
import {Util} from '../Util';
import { TEXT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class TextSymbol
 * @aliasclass Symbol.Text
 * @classdesc 文本符号类。
 * @category BaseTypes Symbol
 * @param {object} options - 可选参数。 
 * @param {number} options.field - 文本标签。
 * @param {number} [options.size = 16] - 文本大小。
 * @param {string} [options.color = "#000"] - 文本颜色。
 * @param {number} [options.opacity = 1] - 文本透明度。
 * @param {number} [options.translate = [0, 0]] - 文本偏移值。
 * @param {number} [options.fontFamily = ["Open Sans Regular", "Arial Unicode MS Regular"]] - 文本字体。
 * @param {number} [options.haloWidth = 0] - 文本光晕宽度。
 * @param {number} [options.anchor = 'center'] - 文本锚点。
 * @param {number} [options.spacing = 0] - 文本间隔。
 * @param {number} [options.allowOverlap = false] - 文本是否允许压盖。
 * @param {number} [options.padding = 0] - 文本边框填充值。
 * @example
 * const symbol = new TextSymbol();
 * @usage
 */
export class Text extends Symbol {

    constructor(options) {
        super();
        const { field, size, color, opacity, translate, fontFamily, haloWidth, anchor, spacing, allowOverlap, padding } = options ?? {};

        /**
         * @member {number} TextSymbol.prototype.field
         * @description 文本标签。
         */
        this.field = field;

         /**
          * @member {number} TextSymbol.prototype.size
          * @description 文本大小，默认值：16。
          */
        this.size = size ?? TEXT_DEFAULT_VALUE.size;

        /**
         * @member {string} TextSymbol.prototype.color
         * @description 文本颜色，默认值："#000"。
         */
        this.color = color ?? TEXT_DEFAULT_VALUE.color;

        /**
         * @member {number} TextSymbol.prototype.opacity
         * @description 文本透明度，默认值：1
         */
        this.opacity = opacity ?? TEXT_DEFAULT_VALUE.opacity;

        /**
         * @member {number} TextSymbol.prototype.translate
         * @description  文本偏移值，默认值：[0, 0]
         */
        this.translate = translate ?? TEXT_DEFAULT_VALUE.translate;

        /**
         * @member {number} TextSymbol.prototype.fontFamily
         * @description  文本字体，默认值：[0, 0]
         */
        this.fontFamily = fontFamily ?? TEXT_DEFAULT_VALUE.fontFamily;
         
        /**
         * @member {number} TextSymbol.prototype.haloWidth
         * @description  文本光晕宽度，默认值：0
         */
        this.haloWidth = haloWidth ?? TEXT_DEFAULT_VALUE.haloWidth;
                 
        /**
         * @member {number} TextSymbol.prototype.anchor
         * @description  文本对齐锚点，默认值：'center'
         */
        this.anchor = anchor ?? TEXT_DEFAULT_VALUE.anchor;                 
        
        /**
          * @member {number} TextSymbol.prototype.spacing
          * @description  文本间隔，默认值：0
          */
        this.spacing = spacing ?? TEXT_DEFAULT_VALUE.spacing;
                          
        /**
         * @member {number} TextSymbol.prototype.allowOverlap
         * @description  文本是否允许覆盖，默认值：false
         */
        this.allowOverlap = allowOverlap ?? TEXT_DEFAULT_VALUE.allowOverlap;                 
        
        /**
          * @member {number} TextSymbol.prototype.padding
          * @description  文本边框填充值，默认值：0
          */
        this.padding = padding ?? TEXT_DEFAULT_VALUE.padding;
         
        /**
         * @member {string} TextSymbol.prototype.type
         * @description 文本符号的类型。
         */
        this.type = "Text";
        this.CLASS_NAME = "SuperMap.Symbol.Text";
    }

    /**
     * @function TextSymbol.prototype.clone
     * @description 克隆文本符号。
     * @returns {TextSymbol} 克隆后的文本符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Text();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function TextSymbol.prototype.destroy
     * @description 释放符号资源。
     */
    destroy() {
        this.field = null;
        this.size = null;
        this.color = null;
        this.opacity = null;
        this.translate = null;
        this.fontFamily = null;
        this.haloWidth = null;
        this.anchor = null;
        this.spacing = null;
        this.allowOverlap = null;
        super.destroy();
    }
}
