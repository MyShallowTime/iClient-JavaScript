/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {BaseLine} from './BaseLine';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class GreatCircleLineSymbol
 * @aliasclass Symbol.GreatCircleLine
 * @classdesc 大圆航线符号类
 * @category BaseTypes Symbol
 * @extends {BaseLineSymbol}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @usage
 */
export class GreatCircleLine extends BaseLine {
    constructor(options) {
        super(options);
        const { segmentNumber } = options ?? {};

        /**
         * @member {number} GreatCircleLineSymbol.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "GreatCircleLine";
        this.CLASS_NAME = "SuperMap.Symbol.GreatCircleLine";
    }

    /**
     * @function GreatCircleLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {GreatCircleLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new GreatCircleLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function GreatCircleLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        super.destroy();
    }
}