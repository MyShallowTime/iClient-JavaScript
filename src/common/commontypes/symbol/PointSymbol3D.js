/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Point} from './Point';
import {Util} from '../Util';
import { POINT_3D_DEFAULT_VALUE } from './DefaultValue';

/**
 * @class PointSymbol3D
 * @aliasclass Symbol.Point3D
 * @classdesc 3D点符号类。
 * @category Symbol Point
 * @extends {PointSymbol}
 * @param {object} [options] - 参数。 
 * @param {Point3DShapeType} [options.shape = 'cylinder'] - 符号形状。
 * @param {number} [options.width = 1] - 柱体宽度。
 * @param {number} [options.length = 1] - 柱体长度。
 * @param {number} [options.height = 10] - 柱体高度。
 * @param {boolean} [options.depth = true] - 是否开启深度检测。
 * @param {boolean} [options.pickLight = false] - 拾取高亮是否计算光照。
 * @param {boolean} [options.lightEnable = true] - 颜色是否参与光照计算。
 * @param {boolean} [options.heightfixed = false] - 是否是固定高度。
 * @param {string} [options.sourceColor] - 底部颜色。
 * @param {string} [options.targetColor] - 顶部颜色。
 * @param {string} [options.opacityLinearDir = 'none'] - 透明度渐变方向。
 * @usage
 */
export class Point3D extends Point {

    constructor(options) {
        super(options);
        const { shape, width, length, height, depth, pickLight, lightEnable, heightfixed, sourceColor, targetColor, opacityLinearDir } = options ?? {};
        
        /**
         * @member {Point3DShapeType} PointSymbol3D.prototype.shape
         * @description 符号形状，默认值："cylinder"。
         */
        this.shape = shape ?? POINT_3D_DEFAULT_VALUE.shape;
        
        /**
         * @member {number} PointSymbol3D.prototype.width
         * @description 柱体宽度，默认值：1。
         */
        this.width = width ?? POINT_3D_DEFAULT_VALUE.width;

        /**
         * @member {number} PointSymbol3D.prototype.length
         * @description 柱体长度，默认值：1
         */
        this.length = length ?? POINT_3D_DEFAULT_VALUE.length;

        /**
         * @member {number} PointSymbol3D.prototype.height
         * @description 柱体高度，默认值：10。
         */
        this.height = height ?? POINT_3D_DEFAULT_VALUE.height;
        
        /**
         * @member {boolean} PointSymbol3D.prototype.depth
         * @description 是否开启深度检测，默认值：true
         */
        this.depth = depth ?? POINT_3D_DEFAULT_VALUE.depth;

        /**
         * @member {boolean} PointSymbol3D.prototype.pickLight
         * @description 拾取高亮是否计算光照，默认值：false
         */
        this.pickLight = pickLight ?? POINT_3D_DEFAULT_VALUE.pickLight;

        /**
         * @member {boolean} PointSymbol3D.prototype.lightEnable
         * @description 颜色是否参与光照计算，默认值：true
         */
        this.lightEnable = lightEnable ?? POINT_3D_DEFAULT_VALUE.lightEnable;

        /**
         * @member {boolean} PointSymbol3D.prototype.heightfixed
         * @description 是否是固定高度，默认值：false
         */
        this.heightfixed = heightfixed ?? POINT_3D_DEFAULT_VALUE.heightfixed;    
           
        /**
         * @member {string} PointSymbol3D.prototype.sourceColor
         * @description 底部颜色。
         */
        this.sourceColor = sourceColor ?? POINT_3D_DEFAULT_VALUE.sourceColor;

         /**
         * @member {string} PointSymbol3D.prototype.targetColor
         * @description 顶部颜色。
         */
        this.targetColor = targetColor ?? POINT_3D_DEFAULT_VALUE.targetColor;

        /**
         * @member {string} PointSymbol3D.prototype.opacityLinearDir
         * @description 透明度渐变方向，默认值："none"。
         */
        this.opacityLinearDir = opacityLinearDir ?? POINT_3D_DEFAULT_VALUE.opacityLinearDir;

        /**
         * @member {string} PointSymbol3D.prototype.type
         * @description 符号的类型："Point3D"。
         */
        this.type = "Point3D";
        this.CLASS_NAME = "SuperMap.Symbol.Point3D";
    }

    /**
     * @function PointSymbol3D.prototype.clone
     * @description 克隆符号。
     * @returns {PointSymbol3D} 克隆后的符号。
     */
    clone(obj) {
        if (obj == null) {
            obj = new Point3D();
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    /**
     * @function PointSymbol3D.prototype.destroy
     * @description 释放符号的资源。
     */
    destroy() {
        this.shape = null;
        this.width = null;
        this.length = null;
        this.height = null;
        this.depth = null;
        this.pickLight = null;
        this.lightEnable = null;
        this.heightfixed = null;
        this.sourceColor = null;
        this.targetColor = null;
        this.opacityLinearDir = null;
        super.destroy();
    }
}
