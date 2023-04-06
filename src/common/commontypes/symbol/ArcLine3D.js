/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {Line3D} from './Line3D';

/**
 * @class ArcLineSymbol3D
 * @aliasclass Symbol.ArcLine3D
 * @classdesc 3D弧线符号类
 * @category BaseTypes Symbol
 * @extends {LineSymbol3D}
 * @param {object} [options] - 参数。
 * @param {Linear | Solid | Dash} [options.pattern] - 线型模式。
* @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @example
 * const symbol = new ArcLineSymbol3D();
 * @usage
 */
export class ArcLine3D extends Line3D {

    constructor(option) {
        super();
        const { pattern, segmentNumber } = option ?? {};

        /**
         * @member {Linear | Solid | Dash} ArcLineSymbol3D.prototype.pattern
         * @description 线型模式。
         */
        this.pattern = pattern;

        /**
         * @member {number} ArcLineSymbol3D.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "ArcLine3D";
        this.CLASS_NAME = "SuperMap.Symbol.ArcLine3D";
    }

    /**
     * @function ArcLineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {ArcLineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ArcLine3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ArcLineSymbol3D.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.pattern = null;
        this.segmentNumber = null;
        super.destroy();
    }
}