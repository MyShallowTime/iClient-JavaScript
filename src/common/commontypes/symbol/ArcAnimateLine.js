/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {AnimateLine} from './AnimateLine';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class ArcAnimateLineSymbol
 * @aliasclass Symbol.ArcAnimateLine
 * @classdesc 弧线动画符号类
 * @category BaseTypes Symbol
 * @extends {AnimateLineSymbol}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @param {number} [options.thetaOffset=0.314] - 弧线的弧度参数。
 * @example
 * const symbol = new AnimateLineSymbol();
 * @usage       
 */
export class ArcAnimateLine extends AnimateLine {
    constructor(options) {
        super(options);
        const { segmentNumber, thetaOffset } = options ?? {};

        /**
         * @member {number} ArcAnimateLineSymbol.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;

        /**
         * @member {number} ArcAnimateLineSymbol.prototype.thetaOffset
         * @description 弧线的弧度参数。。
         */
        this.thetaOffset = thetaOffset ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "ArcAnimateLine";
        this.CLASS_NAME = "SuperMap.Symbol.ArcAnimateLine";
    }

    /**
     * @function ArcAnimateLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {ArcAnimateLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ArcAnimateLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ArcAnimateLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        this.thetaOffset = null;
        super.destroy();
    }
}