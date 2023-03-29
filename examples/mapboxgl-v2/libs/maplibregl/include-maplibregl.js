﻿/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function () {
  var r = new RegExp('(^|(.*?\\/))(include-maplibregl.js)(\\?|$)'),
    s = document.getElementsByTagName('script'),
    targetScript;
  for (var i = 0; i < s.length; i++) {
    var src = s[i].getAttribute('src');
    if (src) {
      var m = src.match(r);
      if (m) {
        targetScript = s[i];
        break;
      }
    }
  }

  function inputScript(url) {
    var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
    document.writeln(script);
  }

  function inputCSS(url) {
    var css = '<link rel="stylesheet" href="' + url + '">';
    document.writeln(css);
  }

  function inArray(arr, item) {
    for (i in arr) {
      if (arr[i] == item) {
        return true;
      }
    }
    return false;
  }

  function supportES6() {
    var code = "'use strict'; class Foo {}; class Bar extends Foo {};";
    try {
      new Function(code)();
    } catch (err) {
      return false;
    }
    if (!Array.from) {
      return false;
    }
    return true;
  }

  //加载类库资源文件
  function load() {
    var includes = (targetScript.getAttribute('include') || '').split(',');
    var excludes = (targetScript.getAttribute('exclude') || '').split(',');
    inputCSS('https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css');
    inputScript('https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js');
    if (inArray(includes, 'L7')) {
      inputScript('./l7.js');
    }
    if (inArray(includes, 'L7Three')) {
      inputScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r115/three.min.js');
      inputScript('./l7-tree.js');
    }
    // dist
    if (!inArray(excludes, 'iclient-maplibregl')) {
      if (supportES6()) {
        inputScript('./iclient-maplibregl-es6.min.js');
      } else {
        inputScript('./iclient-maplibregl.min.js');
      }
    }
    if (!inArray(excludes, 'iclient-maplibregl-css')) {
      inputCSS('./iclient-maplibregl.min.css');
    }
    if (inArray(includes, 'vue-cesium')) {
      inputScript('https://iclient.supermap.io/web/libs/vue-cesium/2.1.4/index.umd.min.js');
    }
  }

  load();
  window.isLocal = false;
  window.server = document.location.toString().match(/file:\/\//)
    ? 'http://localhost:8090'
    : document.location.protocol + '//' + document.location.host;
})();
