/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * @class AnimateLineSymbol3D
 * @aliasclass Symbol.AnimateLine3D
 * @classdesc 动画3D线符号类
 * @category Symbol Line
 * @extends {LineSymbol}
 * @param {object} options - 参数。
 * @param {number} [options.interval] - 轨迹间隔, 取值区间 0 - 1。
 * @param {number} [options.trailLength] - 轨迹长度，取值区间 0 - 1。
 * @param {number} [options.duration] - 动画时间，单位(s)秒。
 * @param {string} [options.texture] - 动画线贴图。
 * @param {('normal' | 'replace')} [options.textureBlend='normal'] - 纹理混合方式
 * @param {number} [options.iconStep=100] - 纹理贴图在线图层上面排布的间隔
 * @param {string} [options.color] - 线颜色。
 */
export class AnimateLine3D extends Line {

    constructor(options) {
        super(options);
        const { interval, trailLength, duration, texture, textureBlend, iconStep, color } = options ?? {};

        
        /**
         * @member {number} AnimateLineSymbol3D.prototype.interval
         * @description 轨迹间隔, 取值区间 0 - 1。
         */
        this.interval = interval;

        /**
         * @member {number} AnimateLineSymbol3D.prototype.trailLength
         * @description 轨迹长度，取值区间 0 - 1。
         */
        this.trailLength = trailLength; 

        /**
         * @member {number} AnimateLineSymbol3D.prototype.duration
         * @description 动画时间，单位(s)秒。
         */
        this.duration = duration; 

        /**
         * @member {string} AnimateLineSymbol3D.prototype.texture
         * @description 动画线贴图。
         */
        this.texture = texture;

        /**
         * @member {('normal' | 'replace')} AnimateLineSymbol3D.prototype.textureBlend
         * @description 线贴图混合方式。
         */
        this.imageBlend = textureBlend;

        /**
         * @member {number} AnimateLineSymbol3D.prototype.iconStep
         * @description 贴图在线图层上面排布的间隔。
         */
        this.iconStep = iconStep;

        /**
         * @member {string} AnimateLineSymbol3D.prototype.color
         * @description 线颜色。
         */
        this.color = color;
      
        this.type = "AnimateLine3D";
        this.CLASS_NAME = "SuperMap.Symbol.AnimateLine3D";
    }

    /**
     * @function AnimateLineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {AnimateLineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new AnimateLine3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function AnimateLineSymbol3D.prototype.destroy 
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