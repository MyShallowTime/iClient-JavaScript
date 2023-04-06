/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {AnimateLine3D} from './AnimateLine3D';
import {LINE_DEFAULT_VALUE} from './DefaultValue';

/**
 * @class WallAnimateLineSymbol3D
 * @aliasclass Symbol.WallAnimateLine3D
 * @classdesc 动画3D墙符号类
 * @category BaseTypes Symbol
 * @extends {AnimateLineSymbol3D}
 * @param {object} [options] - 参数。
 * @param {number} [options.iconStepCount=1] - 纹理贴图间隔。
 * @usage       
 */
export class WallAnimateLine3D extends AnimateLine3D {
    constructor(options) {
        super(options);
        const { iconStepCount } = options ?? {};

        /**
         * @member {number} WallAnimateLineSymbol3D.prototype.iconStepCount
         * @description 纹理贴图间隔。
         */
        this.iconStepCount = iconStepCount ?? LINE_DEFAULT_VALUE.iconStepCount;
      
        this.type = "WallAnimateLine3D";
        this.CLASS_NAME = "SuperMap.Symbol.WallAnimateLine3D";
    }

    /**
     * @function WallAnimateLineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {WallAnimateLineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new WallAnimateLine3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function WallAnimateLineSymbol3D.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.iconStepCount = null;
        super.destroy();
    }
}