/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {AnimatePolygon} from './AnimatePolygonSymbol';
import {Util} from '../Util';
import { OCEAN_POLYGON_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class OceanAnimatePolygonSymbol
 * @aliasclass Symbol.OceanAnimatePolygon
 * @classdesc 海面符号类。
 * @category BaseTypes Symbol
 * @extends {AnimatePolygonSymbol}
 * @param {object} [options] - 参数。 
 * @param {string} [options.shallowWaterColor = '#6D99A8'] - 阴影颜色。
 * @param {string} [options.deepWaterColor = '#0F121C'] - 深度颜色。
 * @usage
 */
export class OceanAnimatePolygon extends AnimatePolygon {

    constructor(options) {
        super(options);
        const { shallowWaterColor, deepWaterColor } = options ?? {};

        /**
         * @member {string} OceanAnimatePolygonSymbol.prototype.deepWaterColor
         * @description 阴影颜色，默认值：'#6D99A8'
         */
        this.deepWaterColor = deepWaterColor ?? OCEAN_POLYGON_DEFAULT_VALUE.deepWaterColor;

        /**
         * @member {string} OceanAnimatePolygonSymbol.prototype.shallowWaterColor
         * @description 深度颜色，默认值：'#0F121C'
         */
        this.shallowWaterColor = shallowWaterColor ?? OCEAN_POLYGON_DEFAULT_VALUE.shallowWaterColor;

        /**
         * @member {string} OceanAnimatePolygonSymbol.prototype.type
         * @description 符号的类型。
         */
        this.type = "OceanAnimatePolygon";
        this.CLASS_NAME = "SuperMap.Symbol.OceanAnimatePolygon";
    }

    /**
     * @function OceanAnimatePolygonSymbol.prototype.clone
     * @description 克隆符号。
     * @returns {OceanAnimatePolygonSymbol} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new OceanAnimatePolygon();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function OceanAnimatePolygonSymbol.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.shallowWaterColor = null;
        this.deepWaterColor = null;
        super.destroy();
    }
}
