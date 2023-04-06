/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../Util';
import {Line} from './Line';

/**
 * @class LineSymbol3D
 * @aliasclass Symbol.Line3D
 * @classdesc 3D线符号类
 * @category Symbol Line
 * @extends {LineSymbol}
 * @param {object} options - 可选参数。
 */
export class Line3D extends Line {

    constructor(option) {
        super();
        // const { pattern } = option ?? {};
      
        this.type = "Line3D";
        this.CLASS_NAME = "SuperMap.Symbol.Line3D";
    }

    /**
     * @function LineSymbol3D.prototype.clone
     * @description 克隆线符号。
     * @returns {LineSymbol3D} 克隆后的线符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Line3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function LineSymbol3D.prototype.destroy
     * @description 释放线符号的资源。
     */
    destroy() {
        this.pattern = null;
        super.destroy();
    }
}