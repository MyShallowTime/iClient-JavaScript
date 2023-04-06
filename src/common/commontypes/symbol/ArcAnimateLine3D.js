/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {AnimateLine3D} from './AnimateLine3D';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class ArcAnimateLineSymbol3D
 * @aliasclass Symbol.ArcAnimateLine3D
 * @classdesc 动画3D弧线符号类
 * @category BaseTypes Symbol
 * @extends {AnimateLineSymbol3D}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
* @example
 * const symbol = new ArcAnimateLine3D();
 * @usage       
 */
export class ArcAnimateLine3D extends AnimateLine3D {
    constructor(options) {
        super(options);
        const { segmentNumber } = options ?? {};

        /**
         * @member {number} ArcAnimateLineSymbol3D.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "ArcAnimateLine3D";
        this.CLASS_NAME = "SuperMap.Symbol.ArcAnimateLine3D";
    }

    /**
     * @function ArcAnimateLineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {ArcAnimateLineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ArcAnimateLine3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ArcAnimateLineSymbol3D.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        super.destroy();
    }
}