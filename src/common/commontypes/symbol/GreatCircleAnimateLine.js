/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {AnimateLine} from './AnimateLine';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class GreatCircleAnimateLineSymbol
 * @aliasclass Symbol.GreatCircleAnimateLine
 * @classdesc 大圆航线动画符号类
 * @category BaseTypes Symbol
 * @extends {AnimateLineSymbol}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @example
 * const symbol = new GreatCircleAnimateLineSymbol();
 * @usage
 */
export class GreatCircleAnimateLine extends AnimateLine {
    constructor(options) {
        super(options);
        const { segmentNumber } = options ?? {};

        /**
         * @member {number} GreatCircleAnimateLineSymbol.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "GreatCircleAnimateLine";
        this.CLASS_NAME = "SuperMap.Symbol.GreatCircleAnimateLine";
    }

    /**
     * @function GreatCircleAnimateLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {GreatCircleAnimateLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new GreatCircleAnimateLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function GreatCircleAnimateLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        super.destroy();
    }
}