import axios from "axios";

const getLayerName = (url: string, sourceLayer: string): Promise<string> => {
    return axios.get(url + '/layers.json', { withCredentials: false }).then(res => {
        const layers = res.data[0].subLayers.layers;
        return layers.find(el => el.datasetInfo.name === sourceLayer.split('@')[0]).name;
    });
};

export const getFieldsBySourceLayer = async (url: string, sourceLayer: string): Promise<string[]> => {
    const layerName = await getLayerName(url, sourceLayer);
    const params = {
        "queryMode": "SqlQuery",
        "queryParameters": {
            "queryOption": "ATTRIBUTEANDGEOMETRY",
            "startRecord": 0,
            "expectCount": 1,
            "networkType": "LINE",
            "queryParams": [
                {
                    "name": layerName
                }
            ]
        }
    };
    const config = {
        "params": {
            "returnContent": true
        },
        "withCredentials": false
    };
    return axios.post(url + '/queryResults.json', params, config).then((res) => {
        return res.data.recordsets[0].fields.filter(field => !field.startsWith('Sm'));
    });
};