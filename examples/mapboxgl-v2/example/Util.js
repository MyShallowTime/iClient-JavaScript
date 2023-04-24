/**所有参数放到一个symbol里面，但是部分参数不支持数据驱动，比如cap， dasharray */
// const toSymbol= (values) => {
//     const result = {};
//     values.forEach(i => {
//         if(i.layout.visibility === 'visible') {
//             const id = i.filter[2][2];
//             iterateObject(result, id, i.layout);
//             iterateObject(result, id, i.paint);
//         }
//       })
//     return result;
// }
// const iterateObject = (result, id, value = {}) => {
//     Object.keys(value).forEach(j => {
//         const key = j.split('-')[1];
//         if(!key) return;
//         if(!result[key]) {
//             result[key] = ["match", ["get", "GB"]];
//         }
//         if(result[key].includes(id)) return;
//         result[key].push(id, value[j]);
//     });
//     return result;
// }

/**
 * 单个图层转换为symbol
 */
const toSymbol = (layer) => {
    const result = {
        type: "SimpleLine"
    };
    iterateObject(result, layer.layout);
    iterateObject(result, layer.paint);
    return result;
}
const iterateObject = (result, value = {}) => {
    Object.keys(value).forEach(j => {
        const key = j.split('-')[1];
        if(!key || !value[j]) return;
        result[key] = value[j];
    });
}

const layerToSymbol = () => {
    const layers = [{
        "layout": {
          "visibility": "visible",
          "line-cap": "round"
        },
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "GB",
            420101
          ],
          [
            "any",
            [
              "==",
              "RTEG",
              "一"
            ],
            [
              "==",
              "RTEG",
              "高"
            ]
          ]
        ],
        "metadata": {
          "layer:caption": "LRDL_公路_线_L7",
          "theme:caption": "建成国道",
          "layer:name": "LRDL@DLG_100W"
        },
        "maxzoom": 24,
        "paint": {
          "line-width": 1.51,
          "line-offset": 0,
          "line-color": "rgba(230,33,41,1.00)"
        },
        "id": "LRDL@DLG_100W_unique_420101_0(0_24)",
        "source": "DLGI49",
        "source-layer": "LRDL@DLG_100W",
        "type": "line",
        "minzoom": 0
      },{
        "layout": {
          "visibility": "visible",
          "line-cap": "round"
        },
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "GB",
            420201
          ],
          [
            "any",
            [
              "==",
              "RTEG",
              "一"
            ],
            [
              "==",
              "RTEG",
              "高"
            ]
          ]
        ],
        "metadata": {
          "layer:caption": "LRDL_公路_线_L7",
          "theme:caption": "建成省道",
          "layer:name": "LRDL@DLG_100W"
        },
        "maxzoom": 24,
        "paint": {
          "line-width": 1.51,
          "line-offset": 0,
          "line-color": "rgba(255,128,0,1.00)"
        },
        "id": "LRDL@DLG_100W_unique_420201_0(0_24)",
        "source": "DLGI49",
        "source-layer": "LRDL@DLG_100W",
        "type": "line",
        "minzoom": 0
      },
      {
        "layout": {
          "visibility": "visible",
          "line-cap": "square"
        },
        "filter": [
          "all",
          [
            "==",
            "$type",
            "LineString"
          ],
          [
            "==",
            "GB",
            420202
          ],
          [
            "any",
            [
              "==",
              "RTEG",
              "一"
            ],
            [
              "==",
              "RTEG",
              "高"
            ]
          ]
        ],
        "metadata": {
          "layer:caption": "LRDL_公路_线_L7",
          "theme:caption": "建筑中省道",
          "layer:name": "LRDL@DLG_100W"
        },
        "maxzoom": 24,
        "paint": {
          "line-width": 1.51,
          "line-offset": 0,
          "line-dasharray": [
            20,
            2.5
          ],
          "line-color": "rgba(255,128,0,1.00)"
        },
        "id": "LRDL@DLG_100W_unique_420202_0(0_24)",
        "source": "DLGI49",
        "source-layer": "LRDL@DLG_100W",
        "type": "line",
        "minzoom": 0
      }];
    const result = [];
    layers.forEach((layer) => {
      // 可能存在单线符号导出paint失败的吗？
      if (layer.layout.visibility === 'visible'/*  && Object.keys(layer.paint).length > 0 */) {
        const { filter } = layer;
        if (!result.includes(filter[2][2])) {
          result.push(filter[2][2]);
        }
        console.log(filter[2][2]);
        const symbol = toSymbol(layer);
        console.log(symbol);
      }
    })
    console.log(result);
  }