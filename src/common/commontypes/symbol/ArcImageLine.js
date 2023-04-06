/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {LINE_DEFAULT_VALUE} from './DefaultValue';
import {ImageLine} from './ImageLine';

/**
 * @class ArcImageLineSymbol
 * @aliasclass Symbol.ArcImageLine
 * @classdesc 弧线图片符号类
 * @category Symbol Line
 * @extends {ImageLineSymbol}
 * @param {object} [options] - 参数。
 * @param {number} [options.segmentNumber=30] - 弧线分段，分段越多越平滑，消耗越大。
 * @param {number} [options.thetaOffset=0.314] - 弧线的弧度参数。
 * @example
 * const symbol = new ArcImageLineSymbol();
 * @usage       
 */
export class ArcImageLine extends ImageLine {
    constructor(options) {
        super(options);
        const { segmentNumber, thetaOffset } = options ?? {};

        /**
         * @member {number} ArcImageLineSymbol.prototype.segmentNumber
         * @description 弧线分段，分段越多越平滑，消耗越大。
         */
        this.segmentNumber = segmentNumber ?? LINE_DEFAULT_VALUE.segmentNumber;

        /**
         * @member {number} ArcImageLineSymbol.prototype.thetaOffset
         * @description 弧线的弧度参数。。
         */
        this.thetaOffset = thetaOffset ?? LINE_DEFAULT_VALUE.segmentNumber;
      
        this.type = "ArcImageLine";
        this.CLASS_NAME = "SuperMap.Symbol.ArcImageLine";
    }

    /**
     * @function ArcImageLineSymbol.prototype.clone
     * @description 克隆线符号。
     * @returns {ArcImageLineSymbol} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new ArcImageLine();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function ArcImageLineSymbol.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.segmentNumber = null;
        this.thetaOffset = null;
        super.destroy();
    }
}