/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * @class AnimateLineSymbol
 * @aliasclass Symbol.AnimateLine
 * @classdesc 动画线符号类
 * @category Symbol Line
 * @extends {LineSymbol}
 * @param {object} options - 参数。
 * @param {number} [options.interval] - 轨迹间隔, 取值区间 0 - 1。
 * @param {number} [options.trailLength] - 轨迹长度，取值区间 0 - 1。
 * @param {number} [options.duration] - 动画时间，单位(s)秒。
 * @param {string} [options.texture] - 动画线贴图。
 * @param {('normal' | 'replace')} [options.textureBlend='normal'] - 纹理混合方式
 * @param {number} [options.iconStep=100] - 纹理贴图在线图层上面排布的间隔
 * @param {string} [options.color='#000'] - 线颜色。
 * @example
 * const symbol = new AnimateLineSymbol();
 * @usage
 */
export class AnimateLine extends Line {

    constructor(options) {
        super(options);
        const { interval, trailLength, duration, texture, textureBlend, iconStep, color } = options ?? {};

        /**
         * @member {number} AnimateLineSymbol.prototype.interval
         * @description 轨迹间隔, 取值区间 0 - 1。
         */
        this.interval = interval;

        /**
         * @member {number} AnimateLineSymbol.prototype.trailLength
         * @description 轨迹长度，取值区间 0 - 1。
         */
        this.trailLength = trailLength; 

        /**
         * @member {number} AnimateLineSymbol.prototype.duration
         * @description 动画时间，单位(s)秒。
         */
        this.duration = duration; 

        /**
         * @member {string} AnimateLineSymbol.prototype.texture
         * @description 动画线贴图。
         */
        this.texture = texture;

        /**
         * @member {('normal' | 'replace')} AnimateLineSymbol.prototype.textureBlend
         * @description 线贴图混合方式。
         */
        this.imageBlend = textureBlend;

        /**
         * @member {number} AnimateLineSymbol.prototype.iconStep
         * @description 贴图在线图层上面排布的间隔。
         */
        this.iconStep = iconStep;

        /**
         * @member {string} AnimateLineSymbol.prototype.color
         * @description 线颜色。
         */
        this.color = color;
      
        this.type = "AnimateLine";
        this.CLASS_NAME = "SuperMap.Symbol.AnimateLine";
    }

    /**
     * @function AnimateLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {AnimateLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new AnimateLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function AnimateLineSymbol.prototype.destroy 
     * @description 释放图片线符号的资源。
     */
    destroy() {
        this.interval = null;
        this.trailLength = null;
        this.duration = null;
        this.texture = null;
        this.textureBlend = null;
        this.iconStep = null;
        this.color = null;
        super.destroy();
    }
}