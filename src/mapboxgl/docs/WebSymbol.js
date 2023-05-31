/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @name WebSymbol
 * @namespace
 * @category Visualization WebSymbol
 * @description SuperMap iClient for MapboxGL 支持 Web 符号库，扩展了API。
 * 
 * 
 * ## loadSymbol
 * 加载预定义符号。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * id				    |string		    |预定义符号ID
 * callback			    |Function		|在符号加载完成后调用，如果有错误，则带错误参数
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
 * ## addSymbol
 * 在样式中添加一个符号。该符号可以显示在地图上。符号 ID 用于 layer.symbol。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * id				    |string		    |符号ID
 * symbol			    |object		    |有paint、layout的符号对象
 * 
 * ```
 * map.addSymbol('point-1', symbol);
 * ```
 * 
 * ## addLayer
 * 添加图层。
 * 
 * 参数名称			     |类型			 |描述  
 * :----				|:---		    |:---	
 * layer				|object		    |layer 图层
 * beforeId			    |string		    |一个现有层的 ID 插入新的层之前
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
 * ## setSymbol
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
 * ## hasSymbol
 * 检查样式中是否存在具有特定 ID 的符号.
 * 
 * 参数名称			 |类型			 |描述  
 * :----			|:---		    |:---	
 * symbolId			|string		    |已经添加的符号ID
 * 
 * ```
 * const pointExists = map.hasSymbol('point-1');
 * ```
 * 
 * 
 * ## removeSymbol
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
 * ## setStyle
 * 用新值更新地图的 Mapbox 样式对象。
 * 
 * 参数名称			     |类型			           |描述  
 * :----				|:---		              |:---	
 * style				|Object | string | null   |样式
 * options				|object		              |参数
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