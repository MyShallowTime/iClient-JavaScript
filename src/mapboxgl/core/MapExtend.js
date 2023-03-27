/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '@supermap/iclient-common/commontypes/Util';
import mapboxgl from 'mapbox-gl';
import CompositeLayersManager from './symbol/CompositeLayersManager';
import SymbolLayerManager from './symbol/SymbolLayerManager';
import SymbolManager from './symbol/SymbolManager';

/**
 * @function MapExtend
 * @description  扩展了 mapboxgl.Map 对图层相关的操作。
 * @private
 */
export var MapExtend = (function () {
  mapboxgl.Map.prototype.overlayLayersManager = {};
  mapboxgl.Map.prototype.compositeLayersManager = CompositeLayersManager();
  mapboxgl.Map.prototype.symbolLayerManager = SymbolLayerManager();
  mapboxgl.Map.prototype.symbolManager = new SymbolManager();

  if (mapboxgl.Map.prototype.addLayerBak === undefined) {
    mapboxgl.Map.prototype.addLayerBak = mapboxgl.Map.prototype.addLayer;
    mapboxgl.Map.prototype.addLayer = function (layer, before) {
      const id = layer.symbol;
      if(id) {
        const symbol = this.symbolManager.getSymbol(id);
        if (!symbol) {
          console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
          return;
        }          
        this.symbolLayerManager('mapbox', this).addLayer(layer, symbol);
        return this;
      }

      if (layer.source || layer.type === 'custom' || layer.type === 'background') {
        this.addLayerBak(layer, before);
        return this;
      }
      if (this.overlayLayersManager[layer.id] || this.style._layers[layer.id]) {
        this.fire('error', {
          error: new Error('A layer with this id already exists.')
        });
        return;
      }
      addLayer(layer, this);
      this.overlayLayersManager[layer.id] = layer;
      return this;
    };
  }

  mapboxgl.Map.prototype.getLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      return this.overlayLayersManager[id];
    }
    return this.style.getLayer(id);
  };

  mapboxgl.Map.prototype.moveLayer = function (id, beforeId) {
    if (this.overlayLayersManager[id]) {
      this.overlayLayersManager[id].moveLayer
        ? this.overlayLayersManager[id].moveLayer(id, beforeId)
        : moveLayer(id, beforeId);
      return this;
    }
    if (this.style._layers[id]) {
      this.style.moveLayer(id, beforeId);
      this._update(true);
      return this;
    }
  };

  mapboxgl.Map.prototype.removeLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      removeLayer(this.overlayLayersManager[id]);
      delete this.overlayLayersManager[id];
      return this;
    }
    this.style.removeLayer(id);
    this._update(true);
    return this;
  };

  //目前扩展的overlayer，只支持显示或隐藏图层操作
  mapboxgl.Map.prototype.setLayoutProperty = function (layerID, name, value) {
    if (this.overlayLayersManager[layerID]) {
      if (name === 'visibility') {
        if (value === 'visible') {
          value = true;
        } else {
          value = false;
        }
        setVisibility(this.overlayLayersManager[layerID], value);
        this.style.fire('data', { dataType: 'style' });
      }
      return this;
    }
    this.style.setLayoutProperty(layerID, name, value);
    this._update(true);
    return this;
  };
  mapboxgl.Map.prototype.updateTransform = function (units, originX, originY, centerX, centerY, width, height) {
    this.transform.units = units;
    var mercatorZfromAltitude = this.mercatorZfromAltitude;
    mapboxgl.MercatorCoordinate.fromLngLat = function (lngLatLike, altitude) {
      altitude = altitude || 0;
      const lngLat = mapboxgl.LngLat.convert(lngLatLike);
      return new mapboxgl.MercatorCoordinate(
        (lngLat.lng - originX) / width,
        (originY - lngLat.lat) / height,
        mercatorZfromAltitude(altitude, lngLat.lat)
      );
    };
    mapboxgl.MercatorCoordinate.prototype.toLngLat = function () {
      return new mapboxgl.LngLat(this.x * width + originX, originY - this.y * height);
    };
    this.customConvertPoint = window.URL.createObjectURL(
      new Blob(
        [
          'customConvertPoint = {projectX:function(x){return (x - ' +
            centerX +
            ') / ' +
            width +
            ' + 0.5},projectY:function(y){y = 0.5 - ((y - ' +
            centerY +
            ') / ' +
            height +
            ');return y < 0 ? 0 : y > 1 ? 1 : y;},toY:function(y){return (0.5-y)*' +
            height +
            '+' +
            centerY +
            ';}}'
        ],
        { type: 'text/javascript' }
      )
    );
  };

  mapboxgl.Map.prototype.setSymbol = function (layerId, id) {
    const symbol = this.symbolManager.getSymbol(id);
    if (!symbol) {
      console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
      return;
    }
    this.symbolLayerManager('mapbox', this).setSymbol(layerId, symbol);
  };

  if(!(mapboxgl.Map.prototype).setStyleBak) {
    (mapboxgl.Map.prototype).setStyleBak = mapboxgl.Map.prototype.setStyle;
    mapboxgl.Map.prototype.setStyle = function (style, options) {
      this.setStyleBak(style, options);
      this.style.once('style.load', () => {
        const symbolLayers = style.layers.filter(l => l.symbol);
        symbolLayers.forEach((l) => {
          this.setSymbol(l.id, l.symbol);
        });
      });
      return this;
    }
  }

  const addImageToMap = (map, url) => {
    return new Promise((resolve) => {
      map.loadImage(url, (_error, image) => {
        if(_error) {
          resolve(undefined);
          return;
        }
        const id = Util.createUniqueID('SuperMap.Symbol_');
        map.addImage(id, image);
        // 为了解决sdf问题，需要把load后的image信息存下
        map.symbolManager.addImageInfo(id, image);
        resolve(id);
      });
    });
  };

  const getSymbol = () => {}

  mapboxgl.Map.prototype.loadSymbol = async function (symbol, callback) {
    let error;
    const symbolInfo = typeof symbol === 'string' ? await getSymbol(symbol) : symbol;
    if(!symbolInfo) {
      error = {
        message: 'this symbol is not exists.'
      }
    } else if(['ImagePoint', 'ImageLine', 'ImagePolygon'].includes(symbolInfo.type)) {
      // 如果需要使用到image 的需要loadimage
      const imageId = await addImageToMap(this, symbolInfo.image);
      if(!imageId) {
        error = {
          message: 'this symbol.image is not found.'
        }
      } else {
        symbolInfo.image = imageId;
      }
    }
    // 这里需不需要创建对应的符号类?
    callback(error, symbolInfo);
  };
  
  mapboxgl.Map.prototype.addSymbol = function (id, symbol) {
    if (this.symbolManager.getSymbol(id)) {
      return this.fire('error', {
        error: new Error('An symbol with this name already exists.')
      });
    }
    this.symbolManager.addSymbol(id, symbol);
  };
  
  mapboxgl.Map.prototype.hasSymbol = function(id) {
    if (!id) {
        this.fire('error', {
          error: new Error('Missing required symbol id')
        });
        return false;
    }

    return !!this.symbolManager.getSymbol(id);
  }

  mapboxgl.Map.prototype.removeSymbol = function (id) {
    this.symbolManager.removeSymbol(id);
  };

  function addLayer(layer, map) {
    layer.onAdd && layer.onAdd(map);
  }

  /**
   * @function MapExtend.prototype.removeFromMap
   * @description  移除事件。
   */
  function removeLayer(layer) {
    layer.removeFromMap && layer.removeFromMap();
  }

  /**
   * @function MapExtend.prototype.setVisibility
   * @description  设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
   * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
   */
  function setVisibility(layer, visibility) {
    layer.setVisibility && layer.setVisibility(visibility);
  }

  /**
   * @function MapExtend.prototype.moveTo
   * @description 将图层移动到某个图层之前。
   * @param {string} layerID -待插入的图层 ID。
   * @param {boolean} [beforeLayerID] - 是否将本图层插入到图层 id 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 id 为 layerID 的图层之后)。
   */
  function moveLayer(layerID, beforeLayerID) {
    var layer = document.getElementById(layerID);
    // var beforeLayer;
    if (beforeLayerID) {
      var beforeLayer = document.getElementById(beforeLayerID);
      if (!beforeLayer) {
        mapboxgl.Evented.prototype.fire('error', {
          error: new Error(`Layer with id "${beforeLayerID}" does not exist on this document.`)
        });
      }
    }
    if (layer && beforeLayer) {
      beforeLayer.parentNode.insertBefore(layer, beforeLayer);
    } else {
      //当没有传入beforeLayerID ，则默认将图层移动到最上面
      layer.parentNode.appendChild(layer);
    }
  }
})();
