/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import { AnimatePoint } from './AnimatePointSymbol';

/**
 * @class RadarAnimatePointSymbol
 * @aliasclass Symbol.RadarAnimatePoint
 * @classdesc 雷达动画点符号类。
 * @category Symbol Point
 * @extends {AnimatePointSymbol}
 * @param {object} [options] - 参数。 
 * @param {number} [options.size = 1] - 大小。
 * @param {number} [options.speed = 1] - 动画速度。
 * @usage
 */
export class RadarAnimatePoint extends AnimatePoint {

    constructor(options) {
        super(options);

        /**
         * @member {string} RadarAnimatePointSymbol.prototype.type
         * @description 符号的类型 - "RadarAnimatePoint"。
         */
        this.type = "RadarAnimatePoint";
        this.CLASS_NAME = "SuperMap.Symbol.RadarAnimatePoint";
    }

    /**
     * @function RadarAnimatePointSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {RadarAnimatePointSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new RadarAnimatePoint();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function RadarAnimatePointSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        super.destroy();
    }
}
