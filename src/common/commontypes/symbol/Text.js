/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Symbol} from '../Symbol';
import {Util} from '../Util';
import { TEXT_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class TextSymbol
 * @aliasclass Symbol.Text
 * @classdesc 文本符号类。
 * @category Symbol Text
 * @param {object} options - 可选参数。
 * @param {string} options.field - 文本标签。
 * @param {number} [options.size = 16] - 文本大小。
 * @param {string} [options.color = "#000"] - 文本颜色。
 * @param {number} [options.opacity = 1] - 文本透明度。
 * @param {Array<number>} [options.translate = [0, 0]] - 文本偏移值。
 * @param {Array<string>} [options.fontFamily = ["Open Sans Regular", "Arial Unicode MS Regular"]] - 文本字体。
 * @param {number} [options.haloWidth = 0] - 文本光晕宽度。
 * @param {('center'|'left'|'right'|'top'|'bottom'|'top-left'|'top-right'|'bottom-left')} [options.anchor = 'center'] - 文本锚点。
 * @param {number} [options.spacing = 0] - 文本间隔。
 * @param {boolean} [options.allowOverlap = false] - 文本是否允许压盖。
 * @param {number} [options.padding = 0] - 文本边框填充值。
 * @param {string} [options.strokeColor = "#fff"] - 文本边框颜色。
 * @param {number} [options.strokeWidth = 0] - 文本边框宽度。
 * @param {boolean} [options.heightfixed = false] - 文本是否固定高度。
 * @param {number} [options.raisingHeight = 0] - 文本抬升高度。
 * @param {number} [options.gamma = 2] - 文本颜色参数。
 * @param {number} [options.fontWeight = 400] - 文本粗细。
 * @param {number} [options.blur = 0] - 文本模糊半径。
 * @param {string} [options.fontPath = ""] - 字体路径。
 * @example
 * const symbol = new TextSymbol();
 * @usage
 */
export class Text extends Symbol {

    constructor(options) {
        super();
        const { field, size, color, opacity, translate, fontFamily, haloWidth, anchor, spacing, allowOverlap, padding, strokeColor, strokeWidth, fontPath, heightfixed, raisingHeight, gamma, fontWeight, blur } = options ?? {};

        /**
         * @member {string} TextSymbol.prototype.field
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
         * @member {Array<number>} TextSymbol.prototype.translate
         * @description  文本偏移值，默认值：[0, 0]
         */
        this.translate = translate ?? TEXT_DEFAULT_VALUE.translate;

        /**
         * @member {Array<string>} TextSymbol.prototype.fontFamily
         * @description  文本字体，默认值：["Open Sans Regular", "Arial Unicode MS Regular"]
         */
        this.fontFamily = fontFamily ?? TEXT_DEFAULT_VALUE.fontFamily;

        /**
         * @member {number} TextSymbol.prototype.haloWidth
         * @description  文本光晕宽度，默认值：0
         */
        this.haloWidth = haloWidth ?? TEXT_DEFAULT_VALUE.haloWidth;

        /**
         * @member {('center'|'left'|'right'|'top'|'bottom'|'top-left'|'top-right'|'bottom-left')} TextSymbol.prototype.anchor
         * @description  文本对齐锚点，默认值：'center'
         */
        this.anchor = anchor ?? TEXT_DEFAULT_VALUE.anchor;

        /**
          * @member {number} TextSymbol.prototype.spacing
          * @description  文本间隔，默认值：0
          */
        this.spacing = spacing ?? TEXT_DEFAULT_VALUE.spacing;

        /**
         * @member {booelan} TextSymbol.prototype.allowOverlap
         * @description  文本是否允许覆盖，默认值：false
         */
        this.allowOverlap = allowOverlap ?? TEXT_DEFAULT_VALUE.allowOverlap;

        /**
          * @member {number} TextSymbol.prototype.padding
          * @description  文本边框填充值，默认值：0
          */
        this.padding = padding ?? TEXT_DEFAULT_VALUE.padding;

        /**
          * @member {string} TextSymbol.prototype.strokeColor
          * @description  文本边框颜色，默认值："#fff"
          */
         this.strokeColor = strokeColor ?? TEXT_DEFAULT_VALUE.strokeColor;

        /**
          * @member {number} TextSymbol.prototype.strokeWidth
          * @description  文本边框宽度，默认值：0
          */
         this.strokeWidth = strokeWidth ?? TEXT_DEFAULT_VALUE.strokeWidth;

        /**
          * @member {string} TextSymbol.prototype.fontPath
          * @description  字体路径，默认值：""
          */
         this.fontPath = fontPath ?? TEXT_DEFAULT_VALUE.fontPath;

        /**
          * @member {boolean} TextSymbol.prototype.heightfixed
          * @description  文本是否是固定高度，默认值：false
          */
         this.heightfixed = heightfixed ?? TEXT_DEFAULT_VALUE.heightfixed;

        /**
          * @member {number} TextSymbol.prototype.raisingHeight
          * @description  文本抬升高度，默认值：0
          */
         this.raisingHeight = raisingHeight ?? TEXT_DEFAULT_VALUE.raisingHeight;

        /**
          * @member {number} TextSymbol.prototype.gamma
          * @description  文本颜色参数，默认值：2
          */
         this.gamma = gamma ?? TEXT_DEFAULT_VALUE.gamma;

         /**
           * @member {number} TextSymbol.prototype.fontWeight
           * @description  文本字体粗细，默认值：400
           */
          this.fontWeight = fontWeight ?? TEXT_DEFAULT_VALUE.fontWeight;

         /**
           * @member {number} TextSymbol.prototype.blur
           * @description  文本模糊半径，默认值：0
           */
          this.blur = blur ?? TEXT_DEFAULT_VALUE.blur;
        /**
         * @member {string} TextSymbol.prototype.type
         * @description 文本符号的类型，默认值：Text
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
        this.padding = null;
        this.strokeColor = null;
        this.strokeWidth = null;
        this.fontPath = null;
        this.heightfixed = null;
        this.raisingHeight = null;
        this.gamma = null;
        this.fontWeight = null;
        this.halo = null;
        this.blur = null;
        super.destroy();
    }
}
