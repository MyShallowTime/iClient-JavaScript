/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {Line3D} from './Line3D';

/**
 * @class WallLineSymbol3D
 * @aliasclass Symbol.WallLine3D
 * @classdesc 3D墙符号类
 * @category BaseTypes Symbol
 * @extends {LineSymbol3D}
 * @param {object} [options] - 参数。
 * @param {Linear | Solid | Dash} [options.pattern] - 线型模式。
* @param {number} [options.iconStepCount=1] - 纹理贴图间隔。
 * @example
 * const symbol = new WallLineSymbol3D();
 * @usage
 */
export class WallLine3D extends Line3D {

    constructor(option) {
        super();
        const { pattern, iconStepCount } = option ?? {};

        /**
         * @member {Linear | Solid | Dash} WallAnimateLineSymbol3D.prototype.pattern
         * @description 线型模式。
         */
        this.pattern = pattern;

        /**
         * @member {number} WallAnimateLineSymbol3D.prototype.iconStepCount
         * @description 纹理贴图间隔。
         */
         this.iconStepCount = iconStepCount ?? LINE_DEFAULT_VALUE.iconStepCount;
      
        this.type = "WallLine3D";
        this.CLASS_NAME = "SuperMap.Symbol.WallLine3D";
    }

    /**
     * @function WallLineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {WallLineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new WallLine3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function WallLineSymbol3D.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.pattern = null;
        this.iconStepCount = null;
        super.destroy();
    }
}