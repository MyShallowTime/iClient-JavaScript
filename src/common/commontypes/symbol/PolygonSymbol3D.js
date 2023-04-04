/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Polygon} from './Polygon';
import {Util} from '../Util';
import { POLYGON_3D_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class PolygonSymbol3D
 * @aliasclass Symbol.Polygon3D
 * @classdesc 3D面符号类。
 * @category Symbol Polygon
 * @extends {PolygonSymbol}
 * @param {object} [options] - 参数。 
 * @param {number} [options.height = 0] - 高度。
 * @param {number} [options.raisingHeight = 0] - 抬升高度。
 * @param {boolean} [options.topsurface = true] - 是否开启深度检测。
 * @param {boolean} [options.sidesurface = true] - 颜色是否参与光照计算。
 * @param {boolean} [options.heightfixed = false] - 是否是固定高度。
 * @param {boolean} [options.pickLight = false] - 拾取高亮是否计算光照。
 * @param {string} [options.sourceColor] - 底部颜色。
 * @param {string} [options.targetColor] - 顶部颜色。
 * @param {string} [options.texture] - 纹理。
 * @usage
 */
export class Polygon3D extends Polygon {

    constructor(options) {
        super(options);
        const { height, topsurface, pickLight, sidesurface, heightfixed, sourceColor, targetColor, texture, raisingHeight } = options ?? {};

        /**
         * @member {number} PolygonSymbol3D.prototype.height
         * @description 柱体高度，默认值：0。
         */
        this.height = height ?? POLYGON_3D_DEFAULT_VALUE.height;
        
        /**
         * @member {boolean} PolygonSymbol3D.prototype.topsurface
         * @description 顶部是否显示，默认值：true
         */
        this.topsurface = topsurface ?? POLYGON_3D_DEFAULT_VALUE.topsurface;

        /**
         * @member {boolean} PolygonSymbol3D.prototype.sidesurface
         * @description 侧面是否显示，默认值：true
         */
        this.sidesurface = sidesurface ?? POLYGON_3D_DEFAULT_VALUE.sidesurface;

        /**
         * @member {boolean} PolygonSymbol3D.prototype.heightfixed
         * @description 是否是固定高度，默认值：false
         */
        this.heightfixed = heightfixed ?? POLYGON_3D_DEFAULT_VALUE.heightfixed;    

        /**
         * @member {boolean} PolygonSymbol3D.prototype.pickLight
         * @description 拾取高亮是否计算光照，默认值：false
         */
        this.pickLight = pickLight ?? POLYGON_3D_DEFAULT_VALUE.pickLight;

        /**
         * @member {string} PolygonSymbol3D.prototype.sourceColor
         * @description 侧面底部颜色。
         */
        this.sourceColor = sourceColor ?? POLYGON_3D_DEFAULT_VALUE.sourceColor;

         /**
         * @member {string} PolygonSymbol3D.prototype.targetColor
         * @description 侧面顶部颜色。
         */
        this.targetColor = targetColor ?? POLYGON_3D_DEFAULT_VALUE.targetColor;

        /**
         * @member {string} PolygonSymbol3D.prototype.texture
         * @description 符号图片， 可选参数。
         */
        this.texture = texture ?? POLYGON_3D_DEFAULT_VALUE.texture;

        /**
         * @member {number} PolygonSymbol3D.prototype.raisingHeight
         * @description 符号抬升高度，默认值：0
         */
        this.raisingHeight = raisingHeight ?? POLYGON_3D_DEFAULT_VALUE.raisingHeight;

        /**
         * @member {string} PolygonSymbol3D.prototype.type
         * @description 符号的类型。
         */
        this.type = "Polygon3D";
        this.CLASS_NAME = "SuperMap.Symbol.Polygon3D";
    }

    /**
     * @function PolygonSymbol3D.prototype.clone
     * @description 克隆符号。
     * @returns {PolygonSymbol3D} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Polygon3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function PolygonSymbol3D.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.height = null;
        this.topsurface = null;
        this.pickLight = null;
        this.sidesurface = null;
        this.heightfixed = null;
        this.sourceColor = null;
        this.targetColor = null;
        this.texture = null;
        this.raisingHeight = null;
        super.destroy();
    }
}
