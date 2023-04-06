/*!
 * 
 *          iclient-maplibregl-mapextend.(https://iclient.supermap.io)
 *          Copyright© 2000 - 2022 SuperMap Software Co.Ltd
 *          license: Apache-2.0
 *          version: v11.1.0-dev
 *
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: MapExtend

;// CONCATENATED MODULE: ./src/common/commontypes/BaseTypes.js
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/


/**
 * @function inherit
 * @description 除了 C 和 P 两个必要参数外，可以传递任意数量的对象，这些对象都将继承C。
 * @param {Object} C - 继承的类。
 * @param {Object} P - 被继承的父类。
 * @private
 */
var inheritExt = function inheritExt(C, P) {
  var F = function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  var i, l, o;
  for (i = 2, l = arguments.length; i < l; i++) {
    o = arguments[i];
    if (typeof o === "function") {
      o = o.prototype;
    }
    Util.extend(C.prototype, o);
  }
};

/**
 * @function mixinExt
 * @description 实现多重继承。
 * @param {Class|Object} ...mixins - 继承的类。
 * @private
 */
var mixinExt = function mixinExt() {
  for (var _len = arguments.length, mixins = new Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }
  var Mix = /*#__PURE__*/_createClass(function Mix(options) {
    _classCallCheck(this, Mix);
    for (var index = 0; index < mixins.length; index++) {
      copyProperties(this, new mixins[index](options));
    }
  });
  for (var index = 0; index < mixins.length; index++) {
    var mixin = mixins[index];
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
    copyProperties(Mix.prototype, new mixin());
  }
  return Mix;
  function copyProperties(target, source) {
    var ownKeys = Object.getOwnPropertyNames(source);
    if (Object.getOwnPropertySymbols) {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
    }
    for (var index = 0; index < ownKeys.length; index++) {
      var key = ownKeys[index];
      if (key !== "constructor" && key !== "prototype" && key !== "name" && key !== "length") {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        if (window["ActiveXObject"]) {
          Object.defineProperty(target, key, desc || {});
        } else {
          Object.defineProperty(target, key, desc);
        }
      }
    }
  }
};

/**
 * @name String
 * @namespace
 * @category BaseTypes Util
 * @description 字符串操作的一系列常用扩展函数。
 * @private
 */
var StringExt = {
  /**
   * @function StringExt.startsWith
   * @description 判断目标字符串是否以指定的子字符串开头。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串以指定的子字符串开头，则返回 true；否则返回 false。
   */
  startsWith: function startsWith(str, sub) {
    return str.indexOf(sub) == 0;
  },
  /**
   * @function StringExt.contains
   * @description 判断目标字符串是否包含指定的子字符串。
   * @param {string} str - 目标字符串。
   * @param {string} sub - 查找的子字符串。
   * @returns {boolean} 目标字符串中包含指定的子字符串，则返回 true；否则返回 false。
   */
  contains: function contains(str, sub) {
    return str.indexOf(sub) != -1;
  },
  /**
   * @function StringExt.trim
   * @description 删除一个字符串的开头和结尾处的所有空白字符。
   * @param {string} str - （可能）存在空白字符填塞的字符串。
   * @returns {string} 删除开头和结尾处空白字符后的字符串。
   */
  trim: function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  /**
   * @function StringExt.camelize
   * @description 骆驼式("-")连字符的字符串处理。
   * 例如："chicken-head" becomes "chickenHead",
   *       "-chicken-head" becomes "ChickenHead"。
   * @param {string} str - 要处理的字符串，原始内容不应被修改。
   * @returns {string}
   */
  camelize: function camelize(str) {
    var oStringList = str.split('-');
    var camelizedString = oStringList[0];
    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return camelizedString;
  },
  /**
   * @function StringExt.format
   * @description 提供带 ${token} 标记的字符串, 返回 context 对象属性中指定标记的属性值。
   * @example
   * 示例：
   * (code)
   * 1、template = "${value,getValue}";
   *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
   *         args = [2,23,12,36,21];
   *       返回值:36
   * (end)
   * 示例:
   * (code)
   * 2、template = "$${{value,getValue}}";
   *         context = {value: {getValue:function(){return Math.max.apply(null,argument);}}};
   *         args = [2,23,12,36,21];
   *       返回值:"${36}"
   * (end)
   * 示例:
   * (code)
   * 3、template = "${a,b}";
   *         context = {a: {b:"format"}};
   *         args = null;
   *       返回值:"format"
   * (end)
   * 示例:
   * (code)
   * 3、template = "${a,b}";
   *         context = null;
   *         args = null;
   *       返回值:"${a.b}"
   * (end)
   * @param {string} template - 带标记的字符串将要被替换。参数 template 格式为"${token}"，此处的 token 标记会替换为 context["token"] 属性的值。
   * @param {Object} [context=window] - 带有属性的可选对象的属性用于匹配格式化字符串中的标记。如果该参数为空，将使用 window 对象。
   * @param {Array.<number>} [args] - 可选参数传递给在 context 对象上找到的函数。
   * @returns {string} 从 context 对象属性中替换字符串标记位的字符串。
   */
  format: function format(template, context, args) {
    if (!context) {
      context = window;
    }

    // Example matching:
    // str   = ${foo.bar}
    // match = foo.bar
    var replacer = function replacer(str, match) {
      var replacement;

      // Loop through all subs. Example: ${a.b.c}
      // 0 -> replacement = context[a];
      // 1 -> replacement = context[a][b];
      // 2 -> replacement = context[a][b][c];
      var subs = match.split(/\.+/);
      for (var i = 0; i < subs.length; i++) {
        if (i == 0) {
          replacement = context;
        }
        replacement = replacement[subs[i]];
      }
      if (typeof replacement === "function") {
        replacement = args ? replacement.apply(null, args) : replacement();
      }

      // If replacement is undefined, return the string 'undefined'.
      // This is a workaround for a bugs in browsers not properly
      // dealing with non-participating groups in regular expressions:
      // http://blog.stevenlevithan.com/archives/npcg-javascript
      if (typeof replacement == 'undefined') {
        return 'undefined';
      } else {
        return replacement;
      }
    };
    return template.replace(StringExt.tokenRegEx, replacer);
  },
  /**
   * @member {RegExp} [StringExt.tokenRegEx]
   * @description 寻找带 token 的字符串，默认为 tokenRegEx=/\$\{([\w.]+?)\}/g。
   * @example
   * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
   */
  tokenRegEx: /\$\{([\w.]+?)\}/g,
  /**
   * @member {RegExp} [StringExt.numberRegEx]
   * @description 判断一个字符串是否只包含一个数值，默认为 numberRegEx=/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/。
   */
  numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,
  /**
   * @function StringExt.isNumeric
   * @description 判断一个字符串是否只包含一个数值。
   * @example
   * (code)
   * StringExt.isNumeric("6.02e23") // true
   * StringExt.isNumeric("12 dozen") // false
   * StringExt.isNumeric("4") // true
   * StringExt.isNumeric(" 4 ") // false
   * (end)
   * @returns {boolean} 字符串包含唯一的数值，返回 true；否则返回 false。
   */
  isNumeric: function isNumeric(value) {
    return StringExt.numberRegEx.test(value);
  },
  /**
   * @function StringExt.numericIf
   * @description 把一个看似数值型的字符串转化为一个数值。
   * @returns {(number|string)} 如果能转换为数值则返回数值，否则返回字符串本身。
   */
  numericIf: function numericIf(value) {
    return StringExt.isNumeric(value) ? parseFloat(value) : value;
  }
};

/**
 * @name Number
 * @namespace
 * @category BaseTypes Util
 * @description 数值操作的一系列常用扩展函数。
 * @private
 */
var NumberExt = {
  /**
   * @member {string} [NumberExt.decimalSeparator='.']
   * @description 格式化数字时默认的小数点分隔符。
   * @constant
   */
  decimalSeparator: ".",
  /**
   * @member {string} [NumberExt.thousandsSeparator=',']
   * @description 格式化数字时默认的千位分隔符。
   * @constant
   */
  thousandsSeparator: ",",
  /**
   * @function NumberExt.limitSigDigs
   * @description 限制浮点数的有效数字位数。
   * @param {number} num - 浮点数。
   * @param {number} sig - 有效位数。
   * @returns {number} 将数字四舍五入到指定数量的有效位数。
   */
  limitSigDigs: function limitSigDigs(num, sig) {
    var fig = 0;
    if (sig > 0) {
      fig = parseFloat(num.toPrecision(sig));
    }
    return fig;
  },
  /**
   * @function NumberExt.format
   * @description 数字格式化输出。
   * @param {number} num - 数字。
   * @param {number} [dec=0]  - 数字的小数部分四舍五入到指定的位数。设置为 null 值时小数部分不变。
   * @param {string} [tsep=','] - 千位分隔符。
   * @param {string} [dsep='.'] - 小数点分隔符。
   * @returns {string} 数字格式化后的字符串。
   */
  format: function format(num, dec, tsep, dsep) {
    dec = typeof dec != "undefined" ? dec : 0;
    tsep = typeof tsep != "undefined" ? tsep : NumberExt.thousandsSeparator;
    dsep = typeof dsep != "undefined" ? dsep : NumberExt.decimalSeparator;
    if (dec != null) {
      num = parseFloat(num.toFixed(dec));
    }
    var parts = num.toString().split(".");
    if (parts.length === 1 && dec == null) {
      // integer where we do not want to touch the decimals
      dec = 0;
    }
    var integer = parts[0];
    if (tsep) {
      var thousands = /(-?[0-9]+)([0-9]{3})/;
      while (thousands.test(integer)) {
        integer = integer.replace(thousands, "$1" + tsep + "$2");
      }
    }
    var str;
    if (dec == 0) {
      str = integer;
    } else {
      var rem = parts.length > 1 ? parts[1] : "0";
      if (dec != null) {
        rem = rem + new Array(dec - rem.length + 1).join("0");
      }
      str = integer + dsep + rem;
    }
    return str;
  }
};
if (!Number.prototype.limitSigDigs) {
  /**
   * APIMethod: Number.limitSigDigs
   * 限制浮点数的有效数字位数.
   * @param {number} sig -有效位数。
   * @returns {number} 将数字四舍五入到指定数量的有效位数。
   *           如果传入值 为 null、0、或者是负数, 返回值 0。
   */
  Number.prototype.limitSigDigs = function (sig) {
    return NumberExt.limitSigDigs(this, sig);
  };
}

/**
 * @name Function
 * @namespace
 * @category BaseTypes Util
 * @description 函数操作的一系列常用扩展函数。
 * @private
 */
var FunctionExt = {
  /**
   * @function FunctionExt.bind
   * @description 绑定函数到对象。方便创建 this 的作用域。
   * @param {function} func - 输入函数。
   * @param {Object} object - 对象绑定到输入函数（作为输入函数的 this 对象）。
   * @returns {function} object 参数作为 func 函数的 this 对象。
   */
  bind: function bind(func, object) {
    // create a reference to all arguments past the second one
    var args = Array.prototype.slice.apply(arguments, [2]);
    return function () {
      // Push on any additional arguments from the actual function call.
      // These will come after those sent to the bind call.
      var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
      return func.apply(object, newArgs);
    };
  },
  /**
   * @function FunctionExt.bindAsEventListener
   * @description 绑定函数到对象，在调用该函数时配置并使用事件对象作为第一个参数。
   * @param {function} func - 用于监听事件的函数。
   * @param {Object} object - this 对象的引用。
   * @returns {function}
   */
  bindAsEventListener: function bindAsEventListener(func, object) {
    return function (event) {
      return func.call(object, event || window.event);
    };
  },
  /**
   * @function FunctionExt.False
   * @description 该函数仅仅返回 false。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = FunctionExt.False;
   * @returns {boolean}
   */
  False: function False() {
    return false;
  },
  /**
   * @function FunctionExt.True
   * @description 该函数仅仅返回 true。该函数主要是避免在 IE8 以下浏览中 DOM 事件句柄的匿名函数问题。
   * @example
   * document.onclick = FunctionExt.True;
   * @returns {boolean}
   */
  True: function True() {
    return true;
  },
  /**
   * @function FunctionExt.Void
   * @description 可重用函数，仅仅返回 "undefined"。
   * @returns {undefined}
   */
  Void: function Void() {}
};

/**
 * @name Array
 * @namespace
 * @category BaseTypes Util
 * @description 数组操作的一系列常用扩展函数。
 * @private
 */
var ArrayExt = {
  /**
   * @function ArrayExt.filter
   * @description 过滤数组，提供了 ECMA-262 标准中 Array.prototype.filter 函数的扩展。详见：{@link http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter}
   * @param {Array} array - 要过滤的数组。
   * @param {function} callback - 数组中的每一个元素调用该函数。</br>
   *     如果函数的返回值为 true，该元素将包含在返回的数组中。该函数有三个参数: 数组中的元素，元素的索引，数组自身。</br>
   *     如果设置了可选参数 caller，在调用 callback 时，使用可选参数 caller 设置为 callback 的参数。</br>
   * @param {Object} [caller] - 在调用 callback 时，使用参数 caller 设置为 callback 的参数。
   * @returns {Array} callback 函数返回 true 时的元素将作为返回数组中的元素。
   */
  filter: function filter(array, callback, caller) {
    var selected = [];
    if (Array.prototype.filter) {
      selected = array.filter(callback, caller);
    } else {
      var len = array.length;
      if (typeof callback != "function") {
        throw new TypeError();
      }
      for (var i = 0; i < len; i++) {
        if (i in array) {
          var val = array[i];
          if (callback.call(caller, val, i, array)) {
            selected.push(val);
          }
        }
      }
    }
    return selected;
  }
};
;// CONCATENATED MODULE: ./src/common/commontypes/Geometry.js
function Geometry_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Geometry_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Geometry_createClass(Constructor, protoProps, staticProps) { if (protoProps) Geometry_defineProperties(Constructor.prototype, protoProps); if (staticProps) Geometry_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
// import {WKT} from '../format/WKT';
// import {Vector} from './Vector';


/**
 * @class Geometry
 * @deprecatedclass SuperMap.Geometry
 * @category BaseTypes Geometry
 * @classdesc 几何对象类，描述地理对象的几何图形。
 * @usage
 */
var Geometry = /*#__PURE__*/function () {
  function Geometry() {
    Geometry_classCallCheck(this, Geometry);
    this.CLASS_NAME = "SuperMap.Geometry";
    /**
     * @member {string} Geometry.prototype.id
     * @description  几何对象的唯一标识符。
     *
     */
    this.id = Util_Util.createUniqueID(this.CLASS_NAME + "_");

    /**
     * @member {Geometry} Geometry.prototype.parent
     * @description 父类几何对象。
     */
    this.parent = null;

    /**
     * @member {Bounds} Geometry.prototype.bounds
     * @description 几何对象的范围。
     *
     */
    this.bounds = null;

    /**
     * @member {number} Geometry.prototype.SRID
     * @description 投影坐标参数。通过该参数，服务器判断 Geometry 对象的坐标参考系是否与数据集相同，如果不同，则在数据入库前进行投影变换。
     * @example
     * var geometry= new Geometry();
     * geometry. SRID=4326;
     *
     */
    this.SRID = null;
  }

  /**
   * @function Geometry.prototype.destroy
   * @description 解构 Geometry 类，释放资源。
   */
  Geometry_createClass(Geometry, [{
    key: "destroy",
    value: function destroy() {
      this.id = null;
      this.bounds = null;
      this.SRID = null;
    }

    /**
     * @function Geometry.prototype.clone
     * @description 克隆几何图形。克隆的几何图形不设置非标准的属性。
     * @returns {Geometry} 克隆的几何图形。
     */
  }, {
    key: "clone",
    value: function clone() {
      return new Geometry();
    }

    /**
     * @function Geometry.prototype.setBounds
     * @description 设置几何对象的 bounds。
     * @param {Bounds} bounds - 范围。
     */
  }, {
    key: "setBounds",
    value: function setBounds(bounds) {
      if (bounds) {
        this.bounds = bounds.clone();
      }
    }

    /**
     * @function Geometry.prototype.clearBounds
     * @description 清除几何对象的 bounds。
     * 如果该对象有父类，也会清除父类几何对象的 bounds。
     */
  }, {
    key: "clearBounds",
    value: function clearBounds() {
      this.bounds = null;
      if (this.parent) {
        this.parent.clearBounds();
      }
    }

    /**
     * @function Geometry.prototype.extendBounds
     * @description 扩展现有边界以包含新边界。如果尚未设置几何边界，则设置新边界。
     * @param {Bounds} newBounds - 几何对象的 bounds。
     */
  }, {
    key: "extendBounds",
    value: function extendBounds(newBounds) {
      var bounds = this.getBounds();
      if (!bounds) {
        this.setBounds(newBounds);
      } else {
        this.bounds.extend(newBounds);
      }
    }

    /**
     * @function Geometry.prototype.getBounds
     * @description 获得几何图形的边界。如果没有设置边界，可通过计算获得。
     * @returns {Bounds} 几何对象的边界。
     */
  }, {
    key: "getBounds",
    value: function getBounds() {
      if (this.bounds == null) {
        this.calculateBounds();
      }
      return this.bounds;
    }

    /**
     * @function Geometry.prototype.calculateBounds
     * @description 重新计算几何图形的边界（需要在子类中实现此方法）。
     */
  }, {
    key: "calculateBounds",
    value: function calculateBounds() {
      //
      // This should be overridden by subclasses.
      //
    }

    /**
     * @function Geometry.prototype.getVertices
     * @description 返回几何图形的所有顶点的列表（需要在子类中实现此方法）。
     * @param {boolean} [nodes] - 如果是 true，线则只返回线的末端点，如果 false，仅仅返回顶点，如果没有设置，则返回顶点。
     * @returns {Array} 几何图形的顶点列表。
     */
  }, {
    key: "getVertices",
    value: function getVertices(nodes) {// eslint-disable-line no-unused-vars
    }

    /**
     * @function Geometry.prototype.getArea
     * @description 计算几何对象的面积 ，此方法需要在子类中定义。
     * @returns {number} 计算后的对象面积。
     */
  }, {
    key: "getArea",
    value: function getArea() {
      //to be overridden by geometries that actually have an area
      //
      return 0.0;
    }

    // /**
    //  * @function Geometry.prototype.toString
    //  * @description 返回geometry对象的字符串表述，需要引入{@link WKTFormat}。此方法只能在子类实现，在父类使用会报错。
    //  * @returns {string} geometry对象的字符串表述(Well-Known Text)
    //  */
    // toString() {
    // var string;
    // if (WKT) {
    //     var wkt = new WKT();
    //     string = wkt.write(new Vector(this));
    // } else {
    //     string = Object.prototype.toString.call(this);
    // }
    // return string;
    // }
  }]);
  return Geometry;
}();
;// CONCATENATED MODULE: ./src/common/commontypes/Util.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/



/**
 * @description 浏览器名称，依赖于 userAgent 属性，BROWSER_NAME 可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 * @category BaseTypes Constant
 * @constant {Object}
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Browser.name;
 *
 * </script>
 * // ES6 Import
 * import { Browser } from '{npm}';
 *
 * const result = Browser.name;
 * ```
 */
var Browser = function () {
  var name = '',
    version = '',
    device = 'pc',
    uaMatch;
  //以下进行测试
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1 && ua.indexOf('rv') > -1) {
    name = 'msie';
    uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
  } else if (ua.indexOf('chrome') > -1) {
    name = 'chrome';
    uaMatch = ua.match(/chrome\/([\d.]+)/);
  } else if (ua.indexOf('firefox') > -1) {
    name = 'firefox';
    uaMatch = ua.match(/firefox\/([\d.]+)/);
  } else if (ua.indexOf('opera') > -1) {
    name = 'opera';
    uaMatch = ua.match(/version\/([\d.]+)/);
  } else if (ua.indexOf('safari') > -1) {
    name = 'safari';
    uaMatch = ua.match(/version\/([\d.]+)/);
  }
  version = uaMatch ? uaMatch[1] : '';
  if (ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('iphone') > -1) {
    device = 'apple';
  } else if (ua.indexOf('android') > -1) {
    uaMatch = ua.match(/version\/([\d.]+)/);
    version = uaMatch ? uaMatch[1] : '';
    device = 'android';
  }
  return {
    name: name,
    version: version,
    device: device
  };
}();
var isSupportCanvas = function () {
  var checkRes = true,
    broz = Browser;
  if (document.createElement('canvas').getContext) {
    if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
      checkRes = false;
    }
    if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
      checkRes = false;
    }
    if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
      checkRes = false;
    }
    if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
      checkRes = false;
    }
  } else {
    checkRes = false;
  }
  return checkRes;
}();

/**
 * @description 如果 userAgent 捕获到浏览器使用的是 Gecko 引擎则返回 true。
 * @constant {number}
 * @private
 */
var IS_GECKO = function () {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('webkit') === -1 && ua.indexOf('gecko') !== -1;
}();

/**
 * @constant {number}
 * @default
 * @description 分辨率与比例尺之间转换的常量。
 * @private
 */
var DOTS_PER_INCH = 96;

/**
 * @name CommonUtil
 * @namespace
 * @category BaseTypes Util
 * @description common 工具类。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.CommonUtil.getElement();
 *
 *   // 弃用的写法
 *   const result = SuperMap.Util.getElement();
 *
 * </script>
 *
 * // ES6 Import
 * import { CommonUtil } from '{npm}';
 *
 * const result = CommonUtil.getElement();
 * ```
 */

var Util_Util = {
  /**
   * @memberOf CommonUtil
   * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
   * @example
   * 要复制 Size 对象的所有属性到自定义对象上，使用方法如下:
   *     var size = new Size(100, 100);
   *     var obj = {}；
   *     CommonUtil.extend(obj, size);
   * @param {Object} [destination] - 目标对象。
   * @param {Object} source - 源对象，其属性将被设置到目标对象上。
   * @returns {Object} 目标对象。
   */

  extend: function extend(destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined) {
          destination[property] = value;
        }
      }

      /**
       * IE doesn't include the toString property when iterating over an object's
       * properties with the for(property in object) syntax.  Explicitly check if
       * the source has its own toString property.
       */

      /*
       * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
       * prototype object" when calling hawOwnProperty if the source object
       * is an instance of window.Event.
       */

      var sourceIsEvt = typeof window.Event === 'function' && source instanceof window.Event;
      if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
        destination.toString = source.toString;
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 对象拷贝。
   * @param {Object} [des] - 目标对象。
   * @param {Object} soc - 源对象。
   */
  copy: function copy(des, soc) {
    des = des || {};
    var v;
    if (soc) {
      for (var p in des) {
        v = soc[p];
        if (typeof v !== 'undefined') {
          des[p] = v;
        }
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 销毁对象，将其属性置空。
   * @param {Object} [obj] - 目标对象。
   */
  reset: function reset(obj) {
    obj = obj || {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (_typeof(obj[p]) === 'object' && obj[p] instanceof Array) {
          for (var i in obj[p]) {
            if (obj[p][i].destroy) {
              obj[p][i].destroy();
            }
          }
          obj[p].length = 0;
        } else if (_typeof(obj[p]) === 'object' && obj[p] instanceof Object) {
          if (obj[p].destroy) {
            obj[p].destroy();
          }
        }
        obj[p] = null;
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 获取 HTML 元素数组。
   * @returns {Array.<HTMLElement>} HTML 元素数组。
   */
  getElement: function getElement() {
    var elements = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
      var element = arguments[i];
      if (typeof element === 'string') {
        element = document.getElementById(element);
      }
      if (arguments.length === 1) {
        return element;
      }
      elements.push(element);
    }
    return elements;
  },
  /**
   * @memberOf CommonUtil
   * @description instance of 的跨浏览器实现。
   * @param {Object} o - 对象。
   * @returns {boolean} 是否是页面元素。
   */
  isElement: function isElement(o) {
    return !!(o && o.nodeType === 1);
  },
  /**
   * @memberOf CommonUtil
   * @description 判断一个对象是否是数组。
   * @param {Object} a - 对象。
   * @returns {boolean} 是否是数组。
   */
  isArray: function isArray(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  },
  /**
   * @memberOf CommonUtil
   * @description 从数组中删除某一项。
   * @param {Array} array - 数组。
   * @param {Object} item - 数组中要删除的一项。
   * @returns {Array} 执行删除操作后的数组。
   */
  removeItem: function removeItem(array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === item) {
        array.splice(i, 1);
        //break;more than once??
      }
    }

    return array;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取某对象在数组中的索引值。
   * @param {Array.<Object>} array - 数组。
   * @param {Object} obj - 对象。
   * @returns {number} 某对象在数组中的索引值。
   */
  indexOf: function indexOf(array, obj) {
    if (array == null) {
      return -1;
    } else {
      // use the build-in function if available.
      if (typeof array.indexOf === 'function') {
        return array.indexOf(obj);
      } else {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === obj) {
            return i;
          }
        }
        return -1;
      }
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 修改某 DOM 元素的许多属性。
   * @param {HTMLElement} element - 待修改的 DOM 元素。
   * @param {string} [id] - DOM 元素的 ID。
   * @param {Pixel} [px] - DOM 元素的 style 属性的 left 和 top 属性。
   * @param {Size} [sz] - DOM 元素的 width 和 height 属性。
   * @param {string} [position] - DOM 元素的 position 属性。
   * @param {string} [border] - DOM 元素的 style 属性的 border 属性。
   * @param {string} [overflow] - DOM 元素的 style 属性的 overflow 属性。
   * @param {number} [opacity] - 不透明度值。取值范围为(0.0 - 1.0)。
   */
  modifyDOMElement: function modifyDOMElement(element, id, px, sz, position, border, overflow, opacity) {
    if (id) {
      element.id = id;
    }
    if (px) {
      element.style.left = px.x + 'px';
      element.style.top = px.y + 'px';
    }
    if (sz) {
      element.style.width = sz.w + 'px';
      element.style.height = sz.h + 'px';
    }
    if (position) {
      element.style.position = position;
    }
    if (border) {
      element.style.border = border;
    }
    if (overflow) {
      element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
      element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
      element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
      element.style.filter = '';
      element.style.opacity = '';
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 比较两个对象并合并。
   * @param {Object} [to] - 目标对象。
   * @param {Object} from - 源对象。
   * @returns {Object} 返回合并后的对象。
   */
  applyDefaults: function applyDefaults(to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === 'function' && from instanceof window.Event;
    for (var key in from) {
      if (to[key] === undefined || !fromIsEvt && from.hasOwnProperty && from.hasOwnProperty(key) && !to.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (!fromIsEvt && from && from.hasOwnProperty && from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
      to.toString = from.toString;
    }
    return to;
  },
  /**
   * @memberOf CommonUtil
   * @description 将参数对象转换为 HTTP 的 GET 请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
   * @param {Object} params - 参数对象。
   * @returns {string} HTTP 的 GET 请求中的参数字符串。
   */
  getParameterString: function getParameterString(params) {
    var paramsArray = [];
    for (var key in params) {
      var value = params[key];
      if (value != null && typeof value !== 'function') {
        var encodedValue;
        if (Array.isArray(value) || value.toString() === '[object Object]') {
          encodedValue = encodeURIComponent(JSON.stringify(value));
        } else {
          /* value is a string; simply encode */
          encodedValue = encodeURIComponent(value);
        }
        paramsArray.push(encodeURIComponent(key) + '=' + encodedValue);
      }
    }
    return paramsArray.join('&');
  },
  /**
   * @memberOf CommonUtil
   * @description 给 URL 追加查询参数。
   * @param {string} url - 待追加参数的 URL 字符串。
   * @param {string} paramStr - 待追加的查询参数。
   * @returns {string} 新的 URL。
   */
  urlAppend: function urlAppend(url, paramStr) {
    var newUrl = url;
    if (paramStr) {
      if (paramStr.indexOf('?') === 0) {
        paramStr = paramStr.substring(1);
      }
      var parts = (url + ' ').split(/[?&]/);
      newUrl += parts.pop() === ' ' ? paramStr : parts.length ? '&' + paramStr : '?' + paramStr;
    }
    return newUrl;
  },
  /**
   * @memberOf CommonUtil
   * @description 给 URL 追加 path 参数。
   * @param {string} url - 待追加参数的 URL 字符串。
   * @param {string} paramStr - 待追加的path参数。
   * @returns {string} 新的 URL。
   */
  urlPathAppend: function urlPathAppend(url, pathStr) {
    var newUrl = url;
    if (!pathStr) {
      return newUrl;
    }
    if (pathStr.indexOf('/') === 0) {
      pathStr = pathStr.substring(1);
    }
    var parts = url.split('?');
    if (parts[0].indexOf('/', parts[0].length - 1) < 0) {
      parts[0] += '/';
    }
    newUrl = "".concat(parts[0]).concat(pathStr).concat(parts.length > 1 ? "?".concat(parts[1]) : '');
    return newUrl;
  },
  /**
   * @memberOf CommonUtil
   * @description 为了避免浮点精度错误而保留的有效位数。
   * @type {number}
   * @default 14
   */
  DEFAULT_PRECISION: 14,
  /**
   * @memberOf CommonUtil
   * @description 将字符串以接近的精度转换为数字。
   * @param {string} number - 字符串。
   * @param {number} [precision=14] - 精度。
   * @returns {number} 转化后的数字。
   */
  toFloat: function toFloat(number, precision) {
    if (precision == null) {
      precision = Util_Util.DEFAULT_PRECISION;
    }
    if (typeof number !== 'number') {
      number = parseFloat(number);
    }
    return precision === 0 ? number : parseFloat(number.toPrecision(precision));
  },
  /**
   * @memberOf CommonUtil
   * @description 角度转弧度。
   * @param {number} x - 角度。
   * @returns {number} 转化后的弧度。
   */
  rad: function rad(x) {
    return x * Math.PI / 180;
  },
  /**
   * @memberOf CommonUtil
   * @description 从 URL 字符串中解析出参数对象。
   * @param {string} url - URL。
   * @returns {Object} 解析出的参数对象。
   */
  getParameters: function getParameters(url) {
    // if no url specified, take it from the location bar
    url = url === null || url === undefined ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = '';
    if (StringExt.contains(url, '?')) {
      var start = url.indexOf('?') + 1;
      var end = StringExt.contains(url, '#') ? url.indexOf('#') : url.length;
      paramsString = url.substring(start, end);
    }
    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
      var keyValue = pairs[i].split('=');
      if (keyValue[0]) {
        var key = keyValue[0];
        try {
          key = decodeURIComponent(key);
        } catch (err) {
          key = unescape(key);
        }

        // being liberal by replacing "+" with " "
        var value = (keyValue[1] || '').replace(/\+/g, ' ');
        try {
          value = decodeURIComponent(value);
        } catch (err) {
          value = unescape(value);
        }

        // follow OGC convention of comma delimited values
        value = value.split(',');

        //if there's only one value, do not return as array
        if (value.length == 1) {
          value = value[0];
        }
        parameters[key] = value;
      }
    }
    return parameters;
  },
  /**
   * @memberOf CommonUtil
   * @description 不断递增计数变量，用于生成唯一 ID。
   * @type {number}
   * @default 0
   */
  lastSeqID: 0,
  /**
   * @memberOf CommonUtil
   * @description 创建唯一 ID 值。
   * @param {string} [prefix] - 前缀。
   * @returns {string} 唯一的 ID 值。
   */
  createUniqueID: function createUniqueID(prefix) {
    if (prefix == null) {
      prefix = 'id_';
    }
    Util_Util.lastSeqID += 1;
    return prefix + Util_Util.lastSeqID;
  },
  /**
   * @memberOf CommonUtil
   * @description 判断并转化比例尺。
   * @param {number} scale - 比例尺。
   * @returns {number} 正常的 scale 值。
   */
  normalizeScale: function normalizeScale(scale) {
    var normScale = scale > 1.0 ? 1.0 / scale : scale;
    return normScale;
  },
  /**
   * @memberOf CommonUtil
   * @description 比例尺转分辨率。
   * @param {number} scale - 比例尺。
   * @param {string} [units='degrees'] - 比例尺单位。
   * @returns {number} 转化后的分辨率。
   */
  getResolutionFromScale: function getResolutionFromScale(scale, units) {
    var resolution;
    if (scale) {
      if (units == null) {
        units = 'degrees';
      }
      var normScale = Util_Util.normalizeScale(scale);
      resolution = 1 / (normScale * INCHES_PER_UNIT[units] * DOTS_PER_INCH);
    }
    return resolution;
  },
  /**
   * @memberOf CommonUtil
   * @description 分辨率转比例尺。
   * @param {number} resolution - 分辨率。
   * @param {string} [units='degrees'] - 分辨率单位。
   * @returns {number} 转化后的比例尺。
   */
  getScaleFromResolution: function getScaleFromResolution(resolution, units) {
    if (units == null) {
      units = 'degrees';
    }
    var scale = resolution * INCHES_PER_UNIT[units] * DOTS_PER_INCH;
    return scale;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
   * @returns {Object} 浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
   */
  getBrowser: function getBrowser() {
    return Browser;
  },
  /**
   * @memberOf CommonUtil
   * @description 浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas。
   */
  isSupportCanvas: isSupportCanvas,
  /**
   * @memberOf CommonUtil
   * @description 判断浏览器是否支持 Canvas。
   * @returns {boolean} 当前浏览器是否支持 HTML5 Canvas 。
   */
  supportCanvas: function supportCanvas() {
    return Util_Util.isSupportCanvas;
  },
  /**
   * @memberOf CommonUtil
   * @description 判断一个 URL 请求是否在当前域中。
   * @param {string} url - URL 请求字符串。
   * @returns {boolean} URL 请求是否在当前域中。
   */
  isInTheSameDomain: function isInTheSameDomain(url) {
    if (!url) {
      return true;
    }
    var index = url.indexOf('//');
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf('//');
    if (index === -1) {
      return true;
    } else {
      var protocol;
      var substring = protocol = url.substring(0, index);
      var documentSubString = documentUrl.substring(documentIndex + 2);
      documentIndex = documentSubString.indexOf('/');
      var documentPortIndex = documentSubString.indexOf(':');
      var documentDomainWithPort = documentSubString.substring(0, documentIndex);
      //var documentPort;

      var documentprotocol = document.location.protocol;
      if (documentPortIndex !== -1) {
        // documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
      } else {
        documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
      }
      if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
        return false;
      }
      substring = url.substring(index + 2);
      var portIndex = substring.indexOf(':');
      index = substring.indexOf('/');
      var domainWithPort = substring.substring(0, index);
      var domain;
      if (portIndex !== -1) {
        domain = substring.substring(0, portIndex);
      } else {
        domain = substring.substring(0, index);
        domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
      }
      var documentDomain = document.domain;
      if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
        return true;
      }
    }
    return false;
  },
  /**
   * @memberOf CommonUtil
   * @description 计算 iServer 服务的 REST 图层的显示分辨率，需要从 iServer 的 REST 图层表述中获取 viewBounds、viewer、scale、coordUnit、datumAxis 五个参数，来进行计算。
   * @param {Bounds} viewBounds - 地图的参照可视范围，即地图初始化时默认的地图显示范围。
   * @param {Size} viewer - 地图初始化时默认的地图图片的尺寸。
   * @param {number} scale - 地图初始化时默认的显示比例尺。
   * @param {string} [coordUnit='degrees'] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则系统默认为 WGS84 参考系的椭球体长半轴 6378137。
   * @returns {number} 图层显示分辨率。
   */
  calculateDpi: function calculateDpi(viewBounds, viewer, scale, coordUnit, datumAxis) {
    //10000 是 0.1毫米与米的转换。DPI的计算公式：Viewer / DPI *  0.0254 * 10000 = ViewBounds * scale ，公式中的10000是为了提高计算结果的精度，以下出现的ratio皆为如此。
    if (!viewBounds || !viewer || !scale) {
      return;
    }
    var ratio = 10000,
      rvbWidth = viewBounds.getWidth(),
      rvbHeight = viewBounds.getHeight(),
      rvWidth = viewer.w,
      rvHeight = viewer.h;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || 'degrees';
    var dpi;
    if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
      var num1 = rvbWidth / rvWidth,
        num2 = rvbHeight / rvHeight,
        resolution = num1 > num2 ? num1 : num2;
      dpi = 0.0254 * ratio / resolution / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
    } else {
      var _resolution = rvbWidth / rvWidth;
      dpi = 0.0254 * ratio / _resolution / scale / ratio;
    }
    return dpi;
  },
  /**
   * @memberOf CommonUtil
   * @description 将对象转换成 JSON 字符串。
   * @param {Object} obj - 要转换成 JSON 的 Object 对象。
   * @returns {string} 转换后的 JSON 对象。
   */
  toJSON: function toJSON(obj) {
    var objInn = obj;
    if (objInn == null) {
      return null;
    }
    switch (objInn.constructor) {
      case String:
        //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
        objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
        objInn = objInn.replace(/\n/g, '\\n');
        objInn = objInn.replace(/\r/g, '\\r');
        objInn = objInn.replace('<', '&lt;');
        objInn = objInn.replace('>', '&gt;');
        objInn = objInn.replace(/%/g, '%25');
        objInn = objInn.replace(/&/g, '%26');
        return objInn;
      case Array:
        var arr = '';
        for (var i = 0, len = objInn.length; i < len; i++) {
          arr += Util_Util.toJSON(objInn[i]);
          if (i !== objInn.length - 1) {
            arr += ',';
          }
        }
        return "[" + arr + "]";
      case Number:
        return isFinite(objInn) ? String(objInn) : null;
      case Boolean:
        return String(objInn);
      case Date:
        var dateStr = '{' + '\'__type\':"System.DateTime",' + "'Year':" + objInn.getFullYear() + ',' + "'Month':" + (objInn.getMonth() + 1) + ',' + "'Day':" + objInn.getDate() + ',' + "'Hour':" + objInn.getHours() + ',' + "'Minute':" + objInn.getMinutes() + ',' + "'Second':" + objInn.getSeconds() + ',' + "'Millisecond':" + objInn.getMilliseconds() + ',' + "'TimezoneOffset':" + objInn.getTimezoneOffset() + '}';
        return dateStr;
      default:
        if (objInn['toJSON'] != null && typeof objInn['toJSON'] === 'function') {
          return objInn.toJSON();
        }
        if (_typeof(objInn) === 'object') {
          if (objInn.length) {
            var _arr = [];
            for (var _i2 = 0, _len2 = objInn.length; _i2 < _len2; _i2++) {
              _arr.push(Util_Util.toJSON(objInn[_i2]));
            }
            return '[' + _arr.join(',') + ']';
          }
          var _arr2 = [];
          for (var attr in objInn) {
            //为解决Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
            if (typeof objInn[attr] !== 'function' && attr !== 'CLASS_NAME' && attr !== 'parent') {
              _arr2.push("'" + attr + "':" + Util_Util.toJSON(objInn[attr]));
            }
          }
          if (_arr2.length > 0) {
            return '{' + _arr2.join(',') + '}';
          } else {
            return '{}';
          }
        }
        return objInn.toString();
    }
  },
  /**
   * @memberOf CommonUtil
   * @description 根据比例尺和 DPI 计算屏幕分辨率。
   * @category BaseTypes Util
   * @param {number} scale - 比例尺。
   * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
   * @param {string} [coordUnit] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
   * @returns {number} 当前比例尺下的屏幕分辨率。
   */
  getResolutionFromScaleDpi: function getResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (scale > 0 && dpi > 0) {
      scale = Util_Util.normalizeScale(scale);
      if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
        //scale = Util.normalizeScale(scale);
        resolution = 0.0254 * ratio / dpi / scale / (Math.PI * 2 * datumAxis / 360) / ratio;
        return resolution;
      } else {
        resolution = 0.0254 * ratio / dpi / scale / ratio;
        return resolution;
      }
    }
    return -1;
  },
  /**
   * @memberOf CommonUtil
   * @description 根据 resolution、dpi、coordUnit 和 datumAxis 计算比例尺。
   * @param {number} resolution - 用于计算比例尺的地图分辨率。
   * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
   * @param {string} [coordUnit] - 投影坐标系统的地图单位。
   * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
   * @returns {number} 当前屏幕分辨率下的比例尺。
   */
  getScaleFromResolutionDpi: function getScaleFromResolutionDpi(resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
      ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (resolution > 0 && dpi > 0) {
      if (coordUnit.toLowerCase() === 'degree' || coordUnit.toLowerCase() === 'degrees' || coordUnit.toLowerCase() === 'dd') {
        scale = 0.0254 * ratio / dpi / resolution / (Math.PI * 2 * datumAxis / 360) / ratio;
        return scale;
      } else {
        scale = 0.0254 * ratio / dpi / resolution / ratio;
        return scale;
      }
    }
    return -1;
  },
  /**
   * @memberOf CommonUtil
   * @description 转换查询结果。
   * @param {Object} result - 查询结果。
   * @returns {Object} 转换后的查询结果。
   */
  transformResult: function transformResult(result) {
    if (result.responseText && typeof result.responseText === 'string') {
      result = JSON.parse(result.responseText);
    }
    return result;
  },
  /**
   * @memberOf CommonUtil
   * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
   * @param {Object} [destination] - 拷贝目标。
   * @param {Object} source - 源对象。
   *
   */
  copyAttributes: function copyAttributes(destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined && property !== 'CLASS_NAME' && typeof value !== 'function') {
          destination[property] = value;
        }
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
   * @param {Object} [destination] - 目标对象。
   * @param {Object} source - 源对象。
   * @param {Array.<string>} clip - 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
   *
   */
  copyAttributesWithClip: function copyAttributesWithClip(destination, source, clip) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        //去掉禁止拷贝的属性
        var isInClip = false;
        if (clip && clip.length) {
          for (var i = 0, len = clip.length; i < len; i++) {
            if (property === clip[i]) {
              isInClip = true;
              break;
            }
          }
        }
        if (isInClip === true) {
          continue;
        }
        var value = source[property];
        if (value !== undefined && property !== 'CLASS_NAME' && typeof value !== 'function') {
          destination[property] = value;
        }
      }
    }
    return destination;
  },
  /**
   * @memberOf CommonUtil
   * @description 克隆一个 Object 对象。
   * @param {Object} obj - 需要克隆的对象。
   * @returns {Object} 对象的拷贝对象，注意是新的对象，不是指向。
   */
  cloneObject: function cloneObject(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== _typeof(obj)) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      var _copy = obj.slice(0);
      return _copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      var _copy2 = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          _copy2[attr] = Util_Util.cloneObject(obj[attr]);
        }
      }
      return _copy2;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  },
  /**
   * @memberOf CommonUtil
   * @description 判断两条线段是不是有交点。
   * @param {GeometryPoint} a1 - 第一条线段的起始节点。
   * @param {GeometryPoint} a2 - 第一条线段的结束节点。
   * @param {GeometryPoint} b1 - 第二条线段的起始节点。
   * @param {GeometryPoint} b2 - 第二条线段的结束节点。
   * @returns {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
   */
  lineIntersection: function lineIntersection(a1, a2, b1, b2) {
    var intersectValue = null;
    var k1;
    var k2;
    var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    //ab==0代表两条线断的斜率一样
    if (ab != 0) {
      k1 = b / ab;
      k2 = a / ab;
      if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
        intersectValue = new Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
      } else {
        intersectValue = 'No Intersection';
      }
    } else {
      if (b == 0 && a == 0) {
        var maxy = Math.max(a1.y, a2.y);
        var miny = Math.min(a1.y, a2.y);
        var maxx = Math.max(a1.x, a2.x);
        var minx = Math.min(a1.x, a2.x);
        if ((b1.y >= miny && b1.y <= maxy || b2.y >= miny && b2.y <= maxy) && b1.x >= minx && b1.x <= maxx || b2.x >= minx && b2.x <= maxx) {
          intersectValue = 'Coincident'; //重合
        } else {
          intersectValue = 'Parallel'; //平行
        }
      } else {
        intersectValue = 'Parallel'; //平行
      }
    }

    return intersectValue;
  },
  /**
   * @memberOf CommonUtil
   * @description 获取文本外接矩形宽度与高度。
   * @param {ThemeStyle} style - 文本样式。
   * @param {string} text - 文本内容。
   * @param {Object} element - DOM 元素。
   * @returns {Object} 裁剪后的宽度，高度信息。
   */
  getTextBounds: function getTextBounds(style, text, element) {
    document.body.appendChild(element);
    element.style.width = 'auto';
    element.style.height = 'auto';
    if (style.fontSize) {
      element.style.fontSize = style.fontSize;
    }
    if (style.fontFamily) {
      element.style.fontFamily = style.fontFamily;
    }
    if (style.fontWeight) {
      element.style.fontWeight = style.fontWeight;
    }
    element.style.position = 'relative';
    element.style.visibility = 'hidden';
    //fix 在某些情况下，element内的文本变成竖起排列，导致宽度计算不正确的bug
    element.style.display = 'inline-block';
    element.innerHTML = text;
    var textWidth = element.clientWidth;
    var textHeight = element.clientHeight;
    document.body.removeChild(element);
    return {
      textWidth: textWidth,
      textHeight: textHeight
    };
  },
  /**
   * @memberOf CommonUtil
   * @description 获取转换后的path路径。
   * @param {string} path - 待转换的path，包含`{param}`。
   * @param {Object} pathParams - path中待替换的参数。
   * @returns {string} 转换后的path路径。
   */
  convertPath: function convertPath(path, pathParams) {
    if (!pathParams) {
      return path;
    }
    return path.replace(/\{([\w-\.]+)\}/g, function (fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
  }
};

/**
 * @enum INCHES_PER_UNIT
 * @description 每单位的英尺数。
 * @type {number}
 * @private
 */
var INCHES_PER_UNIT = {
  inches: 1.0,
  ft: 12.0,
  mi: 63360.0,
  m: 39.3701,
  km: 39370.1,
  dd: 4374754,
  yd: 36
};
INCHES_PER_UNIT['in'] = INCHES_PER_UNIT.inches;
INCHES_PER_UNIT['degrees'] = INCHES_PER_UNIT.dd;
INCHES_PER_UNIT['nmi'] = 1852 * INCHES_PER_UNIT.m;

// Units from CS-Map
var METERS_PER_INCH = 0.0254000508001016002;
Util_Util.extend(INCHES_PER_UNIT, {
  Inch: INCHES_PER_UNIT.inches,
  Meter: 1.0 / METERS_PER_INCH,
  //EPSG:9001
  Foot: 0.30480060960121920243 / METERS_PER_INCH,
  //EPSG:9003
  IFoot: 0.3048 / METERS_PER_INCH,
  //EPSG:9002
  ClarkeFoot: 0.3047972651151 / METERS_PER_INCH,
  //EPSG:9005
  SearsFoot: 0.30479947153867624624 / METERS_PER_INCH,
  //EPSG:9041
  GoldCoastFoot: 0.30479971018150881758 / METERS_PER_INCH,
  //EPSG:9094
  IInch: 0.0254 / METERS_PER_INCH,
  MicroInch: 0.0000254 / METERS_PER_INCH,
  Mil: 0.0000000254 / METERS_PER_INCH,
  Centimeter: 0.01 / METERS_PER_INCH,
  Kilometer: 1000.0 / METERS_PER_INCH,
  //EPSG:9036
  Yard: 0.91440182880365760731 / METERS_PER_INCH,
  SearsYard: 0.914398414616029 / METERS_PER_INCH,
  //EPSG:9040
  IndianYard: 0.91439853074444079983 / METERS_PER_INCH,
  //EPSG:9084
  IndianYd37: 0.91439523 / METERS_PER_INCH,
  //EPSG:9085
  IndianYd62: 0.9143988 / METERS_PER_INCH,
  //EPSG:9086
  IndianYd75: 0.9143985 / METERS_PER_INCH,
  //EPSG:9087
  IndianFoot: 0.30479951 / METERS_PER_INCH,
  //EPSG:9080
  IndianFt37: 0.30479841 / METERS_PER_INCH,
  //EPSG:9081
  IndianFt62: 0.3047996 / METERS_PER_INCH,
  //EPSG:9082
  IndianFt75: 0.3047995 / METERS_PER_INCH,
  //EPSG:9083
  Mile: 1609.34721869443738887477 / METERS_PER_INCH,
  IYard: 0.9144 / METERS_PER_INCH,
  //EPSG:9096
  IMile: 1609.344 / METERS_PER_INCH,
  //EPSG:9093
  NautM: 1852.0 / METERS_PER_INCH,
  //EPSG:9030
  'Lat-66': 110943.316488932731 / METERS_PER_INCH,
  'Lat-83': 110946.25736872234125 / METERS_PER_INCH,
  Decimeter: 0.1 / METERS_PER_INCH,
  Millimeter: 0.001 / METERS_PER_INCH,
  Dekameter: 10.0 / METERS_PER_INCH,
  Decameter: 10.0 / METERS_PER_INCH,
  Hectometer: 100.0 / METERS_PER_INCH,
  GermanMeter: 1.0000135965 / METERS_PER_INCH,
  //EPSG:9031
  CaGrid: 0.999738 / METERS_PER_INCH,
  ClarkeChain: 20.1166194976 / METERS_PER_INCH,
  //EPSG:9038
  GunterChain: 20.11684023368047 / METERS_PER_INCH,
  //EPSG:9033
  BenoitChain: 20.116782494375872 / METERS_PER_INCH,
  //EPSG:9062
  SearsChain: 20.11676512155 / METERS_PER_INCH,
  //EPSG:9042
  ClarkeLink: 0.201166194976 / METERS_PER_INCH,
  //EPSG:9039
  GunterLink: 0.2011684023368047 / METERS_PER_INCH,
  //EPSG:9034
  BenoitLink: 0.20116782494375872 / METERS_PER_INCH,
  //EPSG:9063
  SearsLink: 0.2011676512155 / METERS_PER_INCH,
  //EPSG:9043
  Rod: 5.02921005842012 / METERS_PER_INCH,
  IntnlChain: 20.1168 / METERS_PER_INCH,
  //EPSG:9097
  IntnlLink: 0.201168 / METERS_PER_INCH,
  //EPSG:9098
  Perch: 5.02921005842012 / METERS_PER_INCH,
  Pole: 5.02921005842012 / METERS_PER_INCH,
  Furlong: 201.1684023368046 / METERS_PER_INCH,
  Rood: 3.778266898 / METERS_PER_INCH,
  CapeFoot: 0.3047972615 / METERS_PER_INCH,
  Brealey: 375.0 / METERS_PER_INCH,
  ModAmFt: 0.304812252984505969011938 / METERS_PER_INCH,
  Fathom: 1.8288 / METERS_PER_INCH,
  'NautM-UK': 1853.184 / METERS_PER_INCH,
  '50kilometers': 50000.0 / METERS_PER_INCH,
  '150kilometers': 150000.0 / METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
Util_Util.extend(INCHES_PER_UNIT, {
  mm: INCHES_PER_UNIT['Meter'] / 1000.0,
  cm: INCHES_PER_UNIT['Meter'] / 100.0,
  dm: INCHES_PER_UNIT['Meter'] * 100.0,
  km: INCHES_PER_UNIT['Meter'] * 1000.0,
  kmi: INCHES_PER_UNIT['nmi'],
  //International Nautical Mile
  fath: INCHES_PER_UNIT['Fathom'],
  //International Fathom
  ch: INCHES_PER_UNIT['IntnlChain'],
  //International Chain
  link: INCHES_PER_UNIT['IntnlLink'],
  //International Link
  'us-in': INCHES_PER_UNIT['inches'],
  //U.S. Surveyor's Inch
  'us-ft': INCHES_PER_UNIT['Foot'],
  //U.S. Surveyor's Foot
  'us-yd': INCHES_PER_UNIT['Yard'],
  //U.S. Surveyor's Yard
  'us-ch': INCHES_PER_UNIT['GunterChain'],
  //U.S. Surveyor's Chain
  'us-mi': INCHES_PER_UNIT['Mile'],
  //U.S. Surveyor's Statute Mile
  'ind-yd': INCHES_PER_UNIT['IndianYd37'],
  //Indian Yard
  'ind-ft': INCHES_PER_UNIT['IndianFt37'],
  //Indian Foot
  'ind-ch': 20.11669506 / METERS_PER_INCH //Indian Chain
});

//将服务端的地图单位转成SuperMap的地图单位
INCHES_PER_UNIT['degree'] = INCHES_PER_UNIT.dd;
INCHES_PER_UNIT['meter'] = INCHES_PER_UNIT.m;
INCHES_PER_UNIT['foot'] = INCHES_PER_UNIT.ft;
INCHES_PER_UNIT['inch'] = INCHES_PER_UNIT.inches;
INCHES_PER_UNIT['mile'] = INCHES_PER_UNIT.mi;
INCHES_PER_UNIT['kilometer'] = INCHES_PER_UNIT.km;
INCHES_PER_UNIT['yard'] = INCHES_PER_UNIT.yd;
function paramToString(param) {
  if (param == undefined || param == null) {
    return '';
  }
  if (param instanceof Date) {
    return param.toJSON();
  }
  if (canBeJsonified(param)) {
    return JSON.stringify(param);
  }
  return param.toString();
}
function canBeJsonified(str) {
  if (typeof str !== 'string' && _typeof(str) !== 'object') {
    return false;
  }
  try {
    var type = str.toString();
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

;// CONCATENATED MODULE: ./src/symbol/CompositeLayersManager.js
/**
 * 组合图层管理器
 * @returns {Object} 
 */
var CompositeLayersManager = function CompositeLayersManager() {
  var layers = {};
  return {
    /**
     * 添加图层
     * @param id 
     * @param childId 
     */
    addLayer: function addLayer(id, childId) {
      if (!layers[id]) {
        layers[id] = [];
      }
      !layers[id].includes(childId) && layers[id].push(childId);
    },
    /**
     * 删除图层
     * @param {*} id 
     * @param {*} childId 
     * @returns {undefined}
     */
    removeLayer: function removeLayer(id, childId) {
      if (childId) {
        layers[id] = layers[id].filter(function (l) {
          return l !== childId;
        });
        if (layers[id].length < 2) {
          delete layers[id];
        }
        return;
      }
      delete layers[id];
    },
    /**
     * 获取图层
     * @param id 
     * @returns {Array}
     */
    getLayers: function getLayers(id) {
      return layers[id];
    },
    /**
     * 获取组合图层ID
     * @param {*} childId 
     * @returns {string}
     */
    getCompositeLayerId: function getCompositeLayerId(childId) {
      for (var id in layers) {
        if (layers[id].find(function (i) {
          return i === childId;
        })) {
          return id;
        }
      }
    }
  };
};
/* harmony default export */ var symbol_CompositeLayersManager = (CompositeLayersManager);
;// CONCATENATED MODULE: ./src/common/commontypes/symbol/DefaultValue.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var COMMON_DEFAULT_VALUE = {
  color: '#000',
  opacity: 1,
  rotate: 0,
  translate: [0, 0],
  offset: 0,
  blur: 0
};
var POINT_DEFAULT_VALUE = {
  size: 0.16,
  color: COMMON_DEFAULT_VALUE.color,
  opacity: COMMON_DEFAULT_VALUE.opacity
};
var IMAGE_POINT_DEFAULT_VALUE = _objectSpread(_objectSpread({}, POINT_DEFAULT_VALUE), {}, {
  rotate: COMMON_DEFAULT_VALUE.rotate,
  translate: COMMON_DEFAULT_VALUE.translate
});
var SIMPLE_POINT_DEFAULT_VALUE = _objectSpread(_objectSpread({}, POINT_DEFAULT_VALUE), {}, {
  shape: 'circle',
  strokeColor: '#FFF',
  strokeWidth: 0,
  strokeOpacity: COMMON_DEFAULT_VALUE.opacity,
  blur: COMMON_DEFAULT_VALUE.blur,
  translate: COMMON_DEFAULT_VALUE.translate
});
var LINE_DEFAULT_VALUE = {
  width: 1,
  color: COMMON_DEFAULT_VALUE.color,
  opacity: COMMON_DEFAULT_VALUE.opacity,
  offset: COMMON_DEFAULT_VALUE.offset,
  blur: COMMON_DEFAULT_VALUE.blur,
  translate: COMMON_DEFAULT_VALUE.translate,
  dasharray: [1],
  cap: 'butt',
  join: 'miter'
};
var POLYGON_DEFAULT_VALUE = {
  color: COMMON_DEFAULT_VALUE.color,
  opacity: COMMON_DEFAULT_VALUE.opacity
};
var TEXT_DEFAULT_VALUE = {
  size: 16,
  color: COMMON_DEFAULT_VALUE.color,
  opacity: COMMON_DEFAULT_VALUE.opacity,
  translate: COMMON_DEFAULT_VALUE.translate,
  fontFamily: ["Open Sans Regular", "Arial Unicode MS Regular"],
  haloWidth: 0,
  anchor: 'center',
  spacing: 0,
  allowOverlap: false,
  padding: 0
};
;// CONCATENATED MODULE: ./src/symbol/SymbolTransformUtil.js
function SymbolTransformUtil_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function SymbolTransformUtil_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? SymbolTransformUtil_ownKeys(Object(source), !0).forEach(function (key) { SymbolTransformUtil_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : SymbolTransformUtil_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function SymbolTransformUtil_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * 根据symbol类型，获取图层类型
 * @param {*} symbolInfo 
 * @returns {string}
 */
function getLayerTypeByRender(symbolInfo) {
  // renderSetting中以下key值满足这些条件，即可使用circle图层渲染，否则使用'symbol'
  var CircleRenderSymbolRules = {
    textField: ['', undefined],
    shape: ['', undefined, 'circle'],
    image: ['', undefined, 'circle'],
    anchor: [undefined, 'center'],
    allowOverlap: [undefined, true],
    ignorePlacement: [undefined, true]
  };
  // 需要渲染的参数
  var keys = Object.keys(CircleRenderSymbolRules);
  // 是否含有仅symbol才可渲染的参数，如果symbolProperty.length>0则说明有
  var symbolProperty = keys.filter(function (key) {
    return !CircleRenderSymbolRules[key].includes(symbolInfo[key]);
  });
  return symbolProperty.length ? 'symbol' : 'circle';
}

/**
 * 获取symbol图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
function getSymbolPaintLayout(symbolInfo) {
  var _symbolInfo$color, _symbolInfo$opacity, _symbolInfo$translate, _symbolInfo$size, _symbolInfo$rotate;
  return {
    paint: {
      'icon-color': (_symbolInfo$color = symbolInfo.color) !== null && _symbolInfo$color !== void 0 ? _symbolInfo$color : IMAGE_POINT_DEFAULT_VALUE.color,
      'icon-opacity': (_symbolInfo$opacity = symbolInfo.opacity) !== null && _symbolInfo$opacity !== void 0 ? _symbolInfo$opacity : IMAGE_POINT_DEFAULT_VALUE.opacity,
      'icon-translate': (_symbolInfo$translate = symbolInfo.translate) !== null && _symbolInfo$translate !== void 0 ? _symbolInfo$translate : IMAGE_POINT_DEFAULT_VALUE.translate
    },
    layout: {
      'icon-size': (_symbolInfo$size = symbolInfo.size) !== null && _symbolInfo$size !== void 0 ? _symbolInfo$size : IMAGE_POINT_DEFAULT_VALUE.size,
      'icon-image': symbolInfo.image,
      'icon-rotate': (_symbolInfo$rotate = symbolInfo.rotate) !== null && _symbolInfo$rotate !== void 0 ? _symbolInfo$rotate : IMAGE_POINT_DEFAULT_VALUE.rotate
      // 符号库暂未支持的属性
      // 'icon-anchor': symbolInfo.anchor,
      // 'icon-allow-overlap': symbolInfo.allowOverlap,
      // 'icon-ignore-placement': symbolInfo.ignorePlacement,
      // 'symbol-placement': symbolInfo.symbolPlacement
    }
  };
}

/**
 * 获取circle图层样式
 * @param {*} symbolInfo 
 * @returns {Object}
 */
function getCirclePaintLayout(symbolInfo) {
  var _symbolInfo$blur, _symbolInfo$color2, _symbolInfo$opacity2, _symbolInfo$size2, _symbolInfo$strokeCol, _symbolInfo$strokeWid, _symbolInfo$strokeOpa, _symbolInfo$translate2;
  return {
    paint: {
      'circle-blur': (_symbolInfo$blur = symbolInfo.blur) !== null && _symbolInfo$blur !== void 0 ? _symbolInfo$blur : SIMPLE_POINT_DEFAULT_VALUE.blur,
      'circle-color': (_symbolInfo$color2 = symbolInfo.color) !== null && _symbolInfo$color2 !== void 0 ? _symbolInfo$color2 : SIMPLE_POINT_DEFAULT_VALUE.color,
      'circle-opacity': (_symbolInfo$opacity2 = symbolInfo.opacity) !== null && _symbolInfo$opacity2 !== void 0 ? _symbolInfo$opacity2 : SIMPLE_POINT_DEFAULT_VALUE.opacity,
      'circle-radius': (_symbolInfo$size2 = symbolInfo.size) !== null && _symbolInfo$size2 !== void 0 ? _symbolInfo$size2 : SIMPLE_POINT_DEFAULT_VALUE.size,
      'circle-stroke-color': (_symbolInfo$strokeCol = symbolInfo.strokeColor) !== null && _symbolInfo$strokeCol !== void 0 ? _symbolInfo$strokeCol : SIMPLE_POINT_DEFAULT_VALUE.strokeColor,
      'circle-stroke-width': (_symbolInfo$strokeWid = symbolInfo.strokeWidth) !== null && _symbolInfo$strokeWid !== void 0 ? _symbolInfo$strokeWid : SIMPLE_POINT_DEFAULT_VALUE.strokeWidth,
      'circle-stroke-opacity': (_symbolInfo$strokeOpa = symbolInfo.strokeOpacity) !== null && _symbolInfo$strokeOpa !== void 0 ? _symbolInfo$strokeOpa : SIMPLE_POINT_DEFAULT_VALUE.strokeOpacity,
      'circle-translate': (_symbolInfo$translate2 = symbolInfo.translate) !== null && _symbolInfo$translate2 !== void 0 ? _symbolInfo$translate2 : SIMPLE_POINT_DEFAULT_VALUE.translate
      // 符号库暂未支持的属性
      // 'circle-translate-anchor': symbolInfo.translateAnchor
    },

    layout: {
      visibility: 'visible'
    }
  };
}
var getPaintLayout = {
  'symbol': getSymbolPaintLayout,
  "circle": getCirclePaintLayout
};

/**
 * SimplePointSymbol、ImagePointSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object}
 */
function transformSymbol2LayerInfo(symbolInfo) {
  var layerType = getLayerTypeByRender(symbolInfo);
  var paintLayout = getPaintLayout[layerType](symbolInfo);
  return SymbolTransformUtil_objectSpread({
    type: layerType
  }, paintLayout);
}

/**
 * LineSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object}
 */
function lineSymbolToPaintLayout(symbolInfo) {
  var opacity = symbolInfo.opacity,
    color = symbolInfo.color,
    width = symbolInfo.width,
    offset = symbolInfo.offset,
    translate = symbolInfo.translate,
    blur = symbolInfo.blur,
    dasharray = symbolInfo.dasharray,
    image = symbolInfo.image,
    cap = symbolInfo.cap,
    join = symbolInfo.join;
  return {
    type: 'line',
    paint: {
      "line-opacity": opacity !== null && opacity !== void 0 ? opacity : LINE_DEFAULT_VALUE.opacity,
      "line-color": color !== null && color !== void 0 ? color : LINE_DEFAULT_VALUE.color,
      "line-width": width !== null && width !== void 0 ? width : LINE_DEFAULT_VALUE.width,
      "line-offset": offset !== null && offset !== void 0 ? offset : LINE_DEFAULT_VALUE.offset,
      "line-translate": translate !== null && translate !== void 0 ? translate : LINE_DEFAULT_VALUE.translate,
      "line-blur": blur !== null && blur !== void 0 ? blur : LINE_DEFAULT_VALUE.blur,
      "line-dasharray": dasharray !== null && dasharray !== void 0 ? dasharray : LINE_DEFAULT_VALUE.dasharray,
      "line-pattern": image
      // 符号库暂未支持的属性
      // "line-translate-anchor": "",
      // "line-gap-width": "",
      // "line-gradient": ""
    },

    layout: {
      "line-cap": cap !== null && cap !== void 0 ? cap : LINE_DEFAULT_VALUE.cap,
      "line-join": join !== null && join !== void 0 ? join : LINE_DEFAULT_VALUE.join
      // 符号库暂未支持的属性
      // "line-miter-limit": "",
      // "line-round-limit": "",
      // "line-sort-key": ""
    }
  };
}
/**
 * PolygonSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object} 
 */
function polygonSymbolToPaintLayout(symbolInfo) {
  var opacity = symbolInfo.opacity,
    color = symbolInfo.color,
    image = symbolInfo.image;
  return {
    type: 'fill',
    paint: {
      "fill-opacity": opacity !== null && opacity !== void 0 ? opacity : POLYGON_DEFAULT_VALUE.opacity,
      "fill-color": color !== null && color !== void 0 ? color : POLYGON_DEFAULT_VALUE.color,
      "fill-pattern": image
      // 符号库暂未支持的属性
      // "fill-antialias": "",
      // "fill-outline-color": "",
      // "fill-translate": "",
      // "fill-translate-anchor": "",
    },

    layout: {
      // 符号库暂未支持的属性
      // "fill-sort-key": "";
    }
  };
}

/**
 * TextSymbol 转换成mapbox 的paint、layout
 * @param {*} symbolInfo 
 * @returns {Object} 
 */
function textSymbolToPaintLayout(symbolInfo) {
  var field = symbolInfo.field,
    color = symbolInfo.color,
    opacity = symbolInfo.opacity,
    size = symbolInfo.size,
    fontFamily = symbolInfo.fontFamily,
    translate = symbolInfo.translate,
    haloWidth = symbolInfo.haloWidth,
    anchor = symbolInfo.anchor,
    allowOverlap = symbolInfo.allowOverlap,
    padding = symbolInfo.padding;
  return {
    type: 'symbol',
    paint: {
      'text-color': color !== null && color !== void 0 ? color : TEXT_DEFAULT_VALUE.color,
      'text-opacity': opacity !== null && opacity !== void 0 ? opacity : TEXT_DEFAULT_VALUE.opacity,
      'text-translate': translate !== null && translate !== void 0 ? translate : TEXT_DEFAULT_VALUE.translate,
      'text-halo-width': haloWidth !== null && haloWidth !== void 0 ? haloWidth : TEXT_DEFAULT_VALUE.haloWidth
      // 符号库暂未支持的属性
      // 'text-halo-blur': symbolInfo.textHaloBlur,
      // 'text-halo-color': symbolInfo.textHaloColor,
      // 'text-translate-anchor': symbolInfo.textTranslateAnchor
    },

    layout: {
      'text-field': field !== null && field !== void 0 ? field : TEXT_DEFAULT_VALUE.field,
      'text-size': size !== null && size !== void 0 ? size : TEXT_DEFAULT_VALUE.size,
      'text-font': fontFamily !== null && fontFamily !== void 0 ? fontFamily : TEXT_DEFAULT_VALUE.fontFamily,
      'text-anchor': anchor !== null && anchor !== void 0 ? anchor : TEXT_DEFAULT_VALUE.anchor,
      'text-allow-overlap': allowOverlap !== null && allowOverlap !== void 0 ? allowOverlap : TEXT_DEFAULT_VALUE.allowOverlap,
      'text-padding': padding !== null && padding !== void 0 ? padding : TEXT_DEFAULT_VALUE.padding
      // 符号库暂未支持的属性
      // 'text-ignore-placement': symbolInfo.textIgnorePlacement,
      // 'text-justify': symbolInfo.justify,
      // 'text-letter-spacing': symbolInfo.textLetterSpacing,
      // 'text-line-height': symbolInfo.lineHeight,
      // 'text-max-width': symbolInfo.maxWidth,
      // 'text-rotate': symbolInfo.textRotate,
      // 'text-transform': symbolInfo.transform,
    }
  };
}
;// CONCATENATED MODULE: ./src/symbol/MapboxSymbolLayerManager.js
function MapboxSymbolLayerManager_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function MapboxSymbolLayerManager_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? MapboxSymbolLayerManager_ownKeys(Object(source), !0).forEach(function (key) { MapboxSymbolLayerManager_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : MapboxSymbolLayerManager_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function MapboxSymbolLayerManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * 符号图层管理器
 * @returns {Object}
 */
var MapboxSymbolLayerManager = function MapboxSymbolLayerManager(m) {
  var map = m;
  return {
    /**
     * 是否为组合符号
     * @param {*} type 
     * @returns {boolean}
     */
    isMultiSymbol: function isMultiSymbol(type) {
      return ['MultiLine'].includes(type);
    },
    /**
     * 符号转换成图层
     * @param {*} layer 
     * @param {*} symbol 
     * @returns {undefined}
     */
    addLayer: function addLayer(layer, symbol) {
      delete layer.symbol;
      if (this.isMultiSymbol(symbol.type)) {
        this.addMultiSymbol(layer, symbol);
        return;
      }
      this.addSimpleSymbol(layer, symbol);
    },
    /**
     * 符号转换成图层样式
     * @param symbol 
     * @returns {Object}
     */
    symbolToLayerStyle: function symbolToLayerStyle(symbol) {
      var _transRules$symbol$ty, _transRules$symbol$ty2;
      var transRules = {
        Point: transformSymbol2LayerInfo,
        ImagePoint: transformSymbol2LayerInfo,
        Line: lineSymbolToPaintLayout,
        ImageLine: lineSymbolToPaintLayout,
        Polygon: polygonSymbolToPaintLayout,
        ImagePolygon: polygonSymbolToPaintLayout,
        Text: textSymbolToPaintLayout
      };
      return (_transRules$symbol$ty = (_transRules$symbol$ty2 = transRules[symbol.type]) === null || _transRules$symbol$ty2 === void 0 ? void 0 : _transRules$symbol$ty2.call(transRules, symbol)) !== null && _transRules$symbol$ty !== void 0 ? _transRules$symbol$ty : {};
    },
    /**
     * 添加单个符号
     * @param {*} layer 
     * @param {*} symbol 
     */
    addSimpleSymbol: function addSimpleSymbol(layer, symbol) {
      var style = this.symbolToLayerStyle(symbol);
      var paint = {},
        layout = {};
      // 过滤掉为undefined的key
      // layers.layerId.paint.fill-pattern: 'undefined' value invalid. Use null instead.
      Object.keys(style.paint).forEach(function (k) {
        style.paint[k] !== undefined && (paint[k] = style.paint[k]);
      });
      Object.keys(style.layout).forEach(function (k) {
        style.layout[k] !== undefined && (layout[k] = style.layout[k]);
      });
      map.addLayerBak(MapboxSymbolLayerManager_objectSpread(MapboxSymbolLayerManager_objectSpread(MapboxSymbolLayerManager_objectSpread({}, layer), style), {}, {
        paint: paint,
        layout: layout
      }));
    },
    /**
     * 添加组合符号
     * @param {*} layer 
     * @param {*} symbol 
     */
    addMultiSymbol: function addMultiSymbol(layer, symbol) {
      var _this = this;
      var styles = symbol.styles;
      styles.forEach(function (style, index) {
        var id = index === 0 ? layer.id : Util_Util.createUniqueID('SuperMap.Symbol_');
        _this.addSimpleSymbol(MapboxSymbolLayerManager_objectSpread(MapboxSymbolLayerManager_objectSpread({}, layer), {}, {
          id: id
        }), style);
        map.compositeLayersManager.addLayer(layer.id, id);
      });
    },
    /**
     * 更新图层上的symbol
     * @param layerId 
     * @param symbol 
     * @returns {undefined}
     */
    setSymbol: function setSymbol(layerId, symbol) {
      var _map$compositeLayersM, _symbol$styles$length, _symbol$styles;
      var layerIds = (_map$compositeLayersM = map.compositeLayersManager.getLayers(layerId)) !== null && _map$compositeLayersM !== void 0 ? _map$compositeLayersM : [layerId];
      var removeLayerIds = layerIds.slice((_symbol$styles$length = (_symbol$styles = symbol.styles) === null || _symbol$styles === void 0 ? void 0 : _symbol$styles.length) !== null && _symbol$styles$length !== void 0 ? _symbol$styles$length : 1);
      removeLayerIds.forEach(function (l) {
        map.removeLayer(l);
        map.compositeLayersManager.removeLayer(layerId, l);
      });
      if (this.isMultiSymbol(symbol.type)) {
        this.setMultiSymbol(layerId, symbol, layerIds);
        return;
      }
      this.setSimpleSymbol(layerId, symbol);
    },
    /**
     * 设置单个符号
     * @param layerId 
     * @param symbol 
     */
    setSimpleSymbol: function setSimpleSymbol(layerId, symbol) {
      var layerInfo = this.symbolToLayerStyle(symbol);
      var paint = layerInfo.paint,
        layout = layerInfo.layout;
      Object.keys(paint).forEach(function (key) {
        map.setPaintProperty(layerId, key, paint[key]);
      });
      Object.keys(layout).forEach(function (key) {
        map.setLayoutProperty(layerId, key, layout[key]);
      });
    },
    /**
     * 添加组合符号（同类型的图层切换）
     * @param {*} layerId 
     * @param {*} symbol 
     * @param {*} layerIds 
     */
    setMultiSymbol: function setMultiSymbol(layerId, symbol, layerIds) {
      var _this2 = this;
      var styles = symbol.styles;
      styles.forEach(function (style, index) {
        var id = layerIds[index];
        if (layerIds[index]) {
          _this2.setSimpleSymbol(layerIds[index], style);
        } else {
          var layer = map.getLayer(layerId);
          if (!layer) {
            return;
          }
          var source = layer.source,
            sourceLayer = layer.sourceLayer,
            filter = layer.filter;
          id = Util_Util.createUniqueID('SuperMap.Symbol_');
          var layerInfo = {
            id: id,
            source: source,
            "source-layer": sourceLayer
          };
          filter && (layerInfo['filter'] = filter);
          _this2.addSimpleSymbol(layerInfo, style);
        }
        map.compositeLayersManager.addLayer(layerId, id);
      });
    }
  };
};
/* harmony default export */ var symbol_MapboxSymbolLayerManager = (MapboxSymbolLayerManager);
;// CONCATENATED MODULE: ./src/symbol/SymbolLayerManager.js

var SymbolLayerManager = function SymbolLayerManager() {
  var result = {};
  return function (type, map) {
    var _result$type;
    if (!result[type]) {
      result[type] = {
        mapbox: symbol_MapboxSymbolLayerManager
      }[type];
    }
    return (_result$type = result[type]) === null || _result$type === void 0 ? void 0 : _result$type.call(result, map);
  };
};
/* harmony default export */ var symbol_SymbolLayerManager = (SymbolLayerManager);
;// CONCATENATED MODULE: ./src/symbol/SymbolManager.js
function SymbolManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SymbolManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function SymbolManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SymbolManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SymbolManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SymbolManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SymbolManager = /*#__PURE__*/function () {
  // 在loadImage的时候存下image

  function SymbolManager() {
    SymbolManager_classCallCheck(this, SymbolManager);
    SymbolManager_defineProperty(this, "symbols", void 0);
    SymbolManager_defineProperty(this, "images", void 0);
    this.symbols = {};
    this.images = {};
  }
  SymbolManager_createClass(SymbolManager, [{
    key: "addSymbol",
    value: function addSymbol(id, symbol) {
      this.symbols[id] = symbol;
    }
  }, {
    key: "getSymbol",
    value: function getSymbol(id) {
      return this.symbols[id];
    }
  }, {
    key: "removeSymbol",
    value: function removeSymbol(id) {
      delete this.symbols[id];
    }
  }, {
    key: "addImageInfo",
    value: function addImageInfo(id, image) {
      this.images[id] = image;
    }
  }, {
    key: "getImageInfo",
    value: function getImageInfo(id) {
      return this.images[id];
    }
  }]);
  return SymbolManager;
}();
/* harmony default export */ var symbol_SymbolManager = (SymbolManager);
;// CONCATENATED MODULE: ./src/maplibregl/core/MapExtend.js
function MapExtend_typeof(obj) { "@babel/helpers - typeof"; return MapExtend_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, MapExtend_typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == MapExtend_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/





/**
 * @function MapExtend
 * @description  扩展了 maplibregl.Map 对图层相关的操作。
 * @private
 */
var maplibregl = window.maplibregl;
var MapExtend = function () {
  maplibregl.Map.prototype.compositeLayersManager = symbol_CompositeLayersManager();
  maplibregl.Map.prototype.symbolLayerManager = symbol_SymbolLayerManager();
  maplibregl.Map.prototype.symbolManager = new symbol_SymbolManager();
  if (maplibregl.Map.prototype.iclientAddLayer === undefined) {
    maplibregl.Map.prototype.iclientAddLayer = maplibregl.Map.prototype.addLayer;
    maplibregl.Map.prototype.addLayer = function (layer, before) {
      var id = layer.symbol;
      if (id) {
        var symbol = this.symbolManager.getSymbol(id);
        if (!symbol) {
          console.warn("Symbol \"".concat(id, "\" could not be loaded. Please make sure you have added the symbol with map.addSymbol()."));
          return;
        }
        this.symbolLayerManager('mapbox', this).addLayer(layer, symbol);
        return this;
      }
      return this.iclientAddLayer(layer, before);
    };
  }
  maplibregl.Map.prototype.setSymbol = function (layerId, id) {
    var symbol = this.symbolManager.getSymbol(id);
    if (!symbol) {
      console.warn("Symbol \"".concat(id, "\" could not be loaded. Please make sure you have added the symbol with map.addSymbol()."));
      return;
    }
    this.symbolLayerManager('mapbox', this).setSymbol(layerId, symbol);
  };
  if (!maplibregl.Map.prototype.setStyleBak) {
    maplibregl.Map.prototype.setStyleBak = maplibregl.Map.prototype.setStyle;
    maplibregl.Map.prototype.setStyle = function (style, options) {
      var _this = this;
      this.setStyleBak(style, options);
      this.style.once('style.load', function () {
        var symbolLayers = style.layers.filter(function (l) {
          return l.symbol;
        });
        symbolLayers.forEach(function (l) {
          _this.setSymbol(l.id, l.symbol);
        });
      });
      return this;
    };
  }
  var addImageToMap = function addImageToMap(map, url) {
    return new Promise(function (resolve) {
      map.loadImage(url, function (_error, image) {
        if (_error) {
          resolve(undefined);
          return;
        }
        var id = Util_Util.createUniqueID('SuperMap.Symbol_');
        map.addImage(id, image);
        // 为了解决sdf问题，需要把load后的image信息存下
        map.symbolManager.addImageInfo(id, image);
        resolve(id);
      });
    });
  };
  var getSymbol = function getSymbol() {};
  maplibregl.Map.prototype.loadSymbol = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(symbol, callback) {
      var error, symbolInfo, imageId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof symbol === 'string')) {
              _context.next = 6;
              break;
            }
            _context.next = 3;
            return getSymbol(symbol);
          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;
          case 6:
            _context.t0 = symbol;
          case 7:
            symbolInfo = _context.t0;
            if (symbolInfo) {
              _context.next = 12;
              break;
            }
            error = {
              message: 'this symbol is not exists.'
            };
            _context.next = 17;
            break;
          case 12:
            if (!['ImagePoint', 'ImageLine', 'ImagePolygon'].includes(symbolInfo.type)) {
              _context.next = 17;
              break;
            }
            _context.next = 15;
            return addImageToMap(this, symbolInfo.image);
          case 15:
            imageId = _context.sent;
            if (!imageId) {
              error = {
                message: 'this symbol.image is not found.'
              };
            } else {
              symbolInfo.image = imageId;
            }
          case 17:
            // 这里需不需要创建对应的符号类?
            callback(error, symbolInfo);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  maplibregl.Map.prototype.addSymbol = function (id, symbol) {
    if (this.symbolManager.getSymbol(id)) {
      return this.fire('error', {
        error: new Error('An symbol with this name already exists.')
      });
    }
    this.symbolManager.addSymbol(id, symbol);
  };
  maplibregl.Map.prototype.hasSymbol = function (id) {
    if (!id) {
      this.fire('error', {
        error: new Error('Missing required symbol id')
      });
      return false;
    }
    return !!this.symbolManager.getSymbol(id);
  };
  maplibregl.Map.prototype.removeSymbol = function (id) {
    this.symbolManager.removeSymbol(id);
  };
}();
window.maplibregl = maplibregl;
;// CONCATENATED MODULE: ./src/maplibregl/core/index.js
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

;// CONCATENATED MODULE: ./src/maplibregl/index.js
/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

;// CONCATENATED MODULE: ./src/maplibregl/namespace.js

/******/ })()
;