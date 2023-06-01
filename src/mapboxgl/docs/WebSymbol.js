/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @name WebSymbol
 * @namespace
 * @category Visualization WebSymbol
 * @description 
 * **SuperMap iClient for MapboxGL 支持 Web 符号库，扩展了 [Map](https://docs.mapbox.com/mapbox-gl-js/api/map/) 的 API。**
 * 
 * ## 新增 API
 * ## Map.loadSymbol
 * 加载预定义符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * id				    |string		    |[预定义符号ID]()
 * callback			    |function		|在符号加载完成后调用，如果有错误，则带错误参数
 * 
 * ```
 * map.loadSymbol('point-1', (error, symbol) => {
 *       if (error) throw error;
 *       // Add the loaded symbol with the ID 'point-1'.
 *       map.addSymbol('point-1', symbol);
 * });
 * ```
 * 
 * 
 * ## Map.addSymbol
 * 在样式中添加一个符号。该符号可以显示在地图上。符号 ID 用于 layer.symbol。
 * 
 * 参数名称			     |类型			     |描述  
 * :----				|:---		        |:---	
 * id				    |string		        |符号ID
 * symbol			    |object	            |由[Mapbox Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)中的paint、layout组成的符号对象
 * 
 * ```
 * map.addSymbol('point-1', symbol);
 * ```
 * 
 * 
 * ## Map.setSymbol
 * 给指定图层设置符号。
 * 
 * 参数名称			     |类型			 |描述
 * :----				|:---		    |:---	
 * layerId				|string		    |图层ID
 * symbolId			    |string		    |已经添加的符号ID
 * 
 * ```
 * map.setSymbol("symbol", 'point-1');
 * ```
 * 
 * 
 * ## Map.hasSymbol
 * 检查样式中是否存在具有特定 ID 的符号.
 * 
 * 参数名称			     |类型			 |描述  
 * :----			    |:---		    |:---	
 * symbolId			    |string		    |符号ID
 * 
 * ```
 * const pointExists = map.hasSymbol('point-1');
 * ```
 * 
 * 
 * ## Map.removeSymbol
 * 从样式中删除符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * symbolId			    |string		    |已经添加的符号ID
 * 
 * ```
 * map.removeSymbol('point-1');
 * ```
 * 
 * 
 * ## 扩展 API
 * 
 * ## [Map.addLayer](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer)
 * 添加图层。
 * 
 * 扩展参数名称			 |类型			 |描述  
 * :----				|:---		    |:---	
 * layer				|[Mapbox Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)		    |layer 图层, 新增了symbol属性
 * 
 * ```
 * map.addLayer({
 *     id: "symbol",
 *     source: "xx",
 *     type: "symbol",
 *     symbol: 'point-1'
 * });
 * ```
 * 
 * 
 * ## [Map.setStyle](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setstyle)
 * 用新值更新地图的 Mapbox 样式对象。
 * 
 * 扩展参数名称			 |类型			           |描述  
 * :----				|:---		              |:---	
 * style				| [Mapbox Style](https://docs.mapbox.com/mapbox-gl-js/style-spec/)    |样式， 其中layer 图层, 新增了symbol属性
 * 
 * ```
 * map.setStyle({
 *     version: 8,
 *     sources: {},
 *     layers: [{
 *         id: "symbol",
 *         source: "xx",
 *         type: "symbol",
 *         symbol: 'point-1'
 *     }]
 * })
 * ```
 * 
 */