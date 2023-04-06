/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Point} from './Point';
import {Util} from '../Util';
import { ANIMATE_POINT_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class AnimatePointSymbol
 * @aliasclass Symbol.AnimatePoint
 * @classdesc 动画点符号类。
 * @category Symbol Point
 * @extends {PointSymbol}
 * @param {object} [options] - 参数。 
 * @param {number} [options.size = 1] - 大小。
 * @param {number} [options.speed = 1] - 动画速度。
 */
export class AnimatePoint extends Point {

    constructor(options) {
        super();
        const { size, speed } = options ?? {};

        /**
         * @member {number} AnimatePointSymbol.prototype.size
         * @description 大小，默认值：1。
         */
        this.size = size ?? ANIMATE_POINT_DEFAULT_VALUE.size;

        /**
         * @member {number} AnimatePointSymbol.prototype.speed
         * @description 动画速度，默认值：1
         */
        this.speed = speed ?? ANIMATE_POINT_DEFAULT_VALUE.speed;

        /**
         * @member {string} AnimatePointSymbol.prototype.type
         * @description 符号的类型 - "AnimatePoint"。
         */
        this.type = "AnimatePoint";
        this.CLASS_NAME = "SuperMap.Symbol.AnimatePoint";
    }

    /**
     * @function AnimatePointSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {AnimatePointSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new AnimatePoint();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function AnimatePointSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.size = null;
        this.speed = null;
        super.destroy();
    }
}
