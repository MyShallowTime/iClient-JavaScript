/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {AnimatePoint} from './AnimatePointSymbol';
import {Util} from '../Util';
import { WAVE_ANIMATE_POINT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class WaveAnimatePointSymbol
 * @aliasclass Symbol.WaveAnimatePoint
 * @classdesc 水波动画点符号类。
 * @category BaseTypes Symbol
 * @extends {AnimatePointSymbol}
 * @param {object} [options] - 参数。 
 * @param {number} [options.size = 1] - 大小。
 * @param {number} [options.speed = 1] - 动画速度。
 * @param {number} [options.rings = 3] - 水波圈数。
 * @param {Array<number>} [options.translate = [0, 0]] - 符号偏移值。
 * @usage
 */
export class WaveAnimatePoint extends AnimatePoint {

    constructor(options) {
        super(options);
        const { translate, rings } = options ?? {};

        /**
         * @member {number} WaveAnimatePointSymbol.prototype.rings
         * @description 水波圈数，默认值：3
         */
        this.rings = rings ?? WAVE_ANIMATE_POINT_DEFAULT_VALUE.rings;

        /**
         * @member {Array<number>} WaveAnimatePointSymbol.prototype.translate
         * @description  符号偏移值，默认值：[0, 0]
         */
        this.translate = translate ?? WAVE_ANIMATE_POINT_DEFAULT_VALUE.translate;

        /**
         * @member {string} WaveAnimatePointSymbol.prototype.type
         * @description 符号的类型 - "WaveAnimatePoint"。
         */
        this.type = "WaveAnimatePoint";
        this.CLASS_NAME = "SuperMap.Symbol.WaveAnimatePoint";
    }

    /**
     * @function WaveAnimatePointSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {WaveAnimatePointSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new WaveAnimatePoint();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function WaveAnimatePointSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.translate = null;
        this.rings = null;
        super.destroy();
    }
}
