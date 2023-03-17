/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class Symbol
 * @category BaseTypes Symbol
 * @classdesc Web 符号类，描述地理要素的图形属性。
 * @usage
 */
export class Symbol {

    constructor() {
        this.CLASS_NAME = "SuperMap.Symbol";
    }

    /**
     * @function Symbol.prototype.clone
     * @description 克隆符号。
     * @returns {Symbol} 克隆的符号。
     */
    clone() {
        return new Symbol();
    }

    /**
     * @function Symbol.prototype.destroy
     * @description 解构 Symbol 类，释放资源。
     */
    destroy() {
        this.CLASS_NAME = null;
    }
}
