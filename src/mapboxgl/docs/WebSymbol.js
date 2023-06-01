/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @name WebSymbol
 * @namespace
 * @category Visualization WebSymbol
 * @description 
 * **SuperMap iClient for MapboxGL 支持 Web 符号库，扩展了 [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/) 的 API。**
 * 
 * ## 新增 API
 * ## mapboxgl.Map.prototype.loadSymbol
 * 加载预定义符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * id				    |string		    |[预定义符号ID]()
 * callback			    |function		|在符号加载完成后调用，返回符号信息；如果有错误，则返回错误参数。
 * 
 * **Example**
 * ```
 * map.loadSymbol('point-1', (error, symbol) => {
 *       if (error) throw error;
 *       // Add the loaded symbol with the ID 'point-1'.
 *       map.addSymbol('point-1', symbol);
 * });
 * ```
 * 
 * 
 * ## mapboxgl.Map.prototype.addSymbol
 * 添加一个符号。该符号可以显示在地图上。Mapbox layers 的 symbol属性可以使用该符号ID。
 * 
 * |参数名称			     |类型			     |描述                | ||
 * |----				|---		        |---			    |---|---|
 * |id				    |string		        |符号ID              |||
 * |symbol			    |object	            |由Mapbox Layers中的[paint](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-property)、[layout](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property)组成的符号对象|||
 * |                    |                   |参数名称			 |类型			     |描述  |
 * |                    |                   |paint				|object		        |Mapbox Layers [paint](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-property)|
 * |                    |                   |layout			    |object	            |Mapbox Layers [layout](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property)|
 * 
 * **Example**
 * ```
 * map.addSymbol('point-1', symbol);
 * ```
 * 
 * 
 * ## mapboxgl.Map.prototype.setSymbol
 * 给指定图层设置符号。
 * 
 * 参数名称			     |类型			 |描述
 * :----				|:---		    |:---	
 * layerId				|string		    |图层ID
 * symbolId			    |string		    |已经添加的符号ID（addSymbol中的符号ID)
 * 
 * **Example**
 * ```
 * map.setSymbol("symbol", 'point-1');
 * ```
 * 
 * 
 * ## mapboxgl.Map.prototype.hasSymbol
 * 检查是否存在特定 ID 的符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----			    |:---		    |:---	
 * symbolId			    |string		    |符号ID
 * 
 * **Example**
 * ```
 * const pointExists = map.hasSymbol('point-1');
 * ```
 * 
 * 
 * ## mapboxgl.Map.prototype.removeSymbol
 * 删除符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * symbolId			    |string		    |已经添加的符号ID
 * 
 * **Example**
 * ```
 * map.removeSymbol('point-1');
 * ```
 * 
 * 
 * ## 扩展 [Mapbox Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)
 * 在[Mapbox Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/) 属性的基础上新增了symbol 属性， 指定符号ID。
 * 
 * **Example**
 * ```
 * map.addLayer({
 *     id: "symbol",
 *     source: "sourceId",
 *     type: "symbol",
 *     symbol: 'point-1'
 * });
 * ```
 * ```
 * map.setStyle({
 *     version: 8,
 *     sources: {},
 *     layers: [{
 *         id: "symbol",
 *         source: "sourceId",
 *         type: "symbol",
 *         symbol: 'point-1'
 *     }]
 * })
 * ```
 */