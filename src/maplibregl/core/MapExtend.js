/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '@supermap/iclient-common/commontypes/Util';
import CompositeLayersManager from '../../symbol/CompositeLayersManager';
import SymbolLayerManager from '../../symbol/SymbolLayerManager';
import SymbolManager from '../../symbol/SymbolManager';

/**
 * @function MapExtend
 * @description  扩展了 maplibregl.Map 对图层相关的操作。
 * @private
 */
const maplibregl = window.maplibregl;
export var MapExtend = (function () {
    maplibregl.Map.prototype.compositeLayersManager = CompositeLayersManager();
    maplibregl.Map.prototype.symbolLayerManager = SymbolLayerManager();
    maplibregl.Map.prototype.symbolManager = new SymbolManager();

    if (maplibregl.Map.prototype.iclientAddLayer === undefined) {
        maplibregl.Map.prototype.iclientAddLayer = maplibregl.Map.prototype.addLayer;
        maplibregl.Map.prototype.addLayer = function (layer, before) {
        const id = layer.symbol;
        if(id) {
            const symbol = this.symbolManager.getSymbol(id);
            if (!symbol) {
                console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
                return;
            }          
            this.symbolManager.setSymbolTolayer(layer.id, id);
            this.symbolManager.setSymbolTolayer(layer.id, id);
            this.symbolLayerManager('mapbox', this).addLayer(layer, symbol);
            return this;
        }
        return this.iclientAddLayer(layer, before);
        };
    }

    maplibregl.Map.prototype.setSymbol = function (layerId, id) {
        const symbol = this.symbolManager.getSymbol(id);
        if (!symbol) {
        console.warn(`Symbol "${id}" could not be loaded. Please make sure you have added the symbol with map.addSymbol().`);
        return;
        }
        this.symbolManager.setSymbolTolayer(layerId, id);
        this.symbolLayerManager('mapbox', this).setSymbol(layerId, symbol);
    };

    maplibregl.Map.prototype.setSymbolProperty = function (layerId, name, value) {
        this.symbolLayerManager('mapbox', this).setSymbolProperty(layerId, name, value);
    };

    if(!(maplibregl.Map.prototype).setStyleBak) {
        (maplibregl.Map.prototype).setStyleBak = maplibregl.Map.prototype.setStyle;
        maplibregl.Map.prototype.setStyle = function (style, options) {
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

    const getSymbol = (symbolId) => {
        // eslint-disable-next-line import/no-dynamic-require
        const symbolInfo = require(`../../../examples/mapboxgl-v2/static/symbols/${symbolId.split('-')[0]}/${symbolId}.json`);
        return JSON.parse(JSON.stringify(symbolInfo));
    }

    maplibregl.Map.prototype.loadSymbol = async function (symbol, callback) {
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

    maplibregl.Map.prototype.addSymbol = function (id, symbol) {
        if (this.symbolManager.getSymbol(id)) {
        return this.fire('error', {
            error: new Error('An symbol with this name already exists.')
        });
        }
        this.symbolManager.addSymbol(id, symbol);
    };

    maplibregl.Map.prototype.hasSymbol = function(id) {
        if (!id) {
            this.fire('error', {
            error: new Error('Missing required symbol id')
            });
            return false;
        }

        return !!this.symbolManager.getSymbol(id);
    }

    maplibregl.Map.prototype.removeSymbol = function (id) {
        this.symbolManager.removeSymbol(id);
    };
})();

window.maplibregl = maplibregl;
