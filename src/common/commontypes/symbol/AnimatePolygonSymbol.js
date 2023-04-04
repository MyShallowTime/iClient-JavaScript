/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Polygon} from './Polygon';

/**
 * @class AnimatePolygonSymbol
 * @aliasclass Symbol.AnimatePolygon
 * @classdesc 动画面符号抽象类。
 * @category Symbol Polygon
 * @extends {PolygonSymbol}
 */
export class AnimatePolygon extends Polygon {
    constructor(options) {
        super(options);
        
        /**
         * @member {string} AnimatePolygonSymbol.prototype.type
         * @description 符号类型："AnimatePolygon"。
         */
        this.type = "AnimatePolygon";
        this.CLASS_NAME = "SuperMap.Symbol.AnimatePolygon";
    }

    
    /**
     * @function AnimatePolygonSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {AnimatePolygonSymbol} 克隆后的符号。
     */
     clone(obj) {
        super.clone(obj);
    }

    /**
     * @function AnimatePolygonSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        super.destroy();
    }
}
