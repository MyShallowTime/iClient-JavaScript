/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {BaseLine} from './BaseLine';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class GreatCircleImageLineSymbol
 * @aliasclass Symbol.GreatCircleImageLine
 * @classdesc 大圆航线图片符号类
 * @category BaseTypes Symbol
 * @extends {ImageLineSymbol}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @example
 * const symbol = new GreatCircleImageLineSymbol();
 * @usage
 */
export class GreatCircleImageLine extends BaseLine {
    constructor(options) {
        super(options);
        const { segmentNumber } = options ?? {};

        /**
         * @member {number} GreatCircleImageLineSymbol.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "GreatCircleImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.GreatCircleImageLine";
    }

    /**
     * @function GreatCircleImageLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {GreatCircleImageLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new GreatCircleImageLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function GreatCircleImageLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        super.destroy();
    }
}