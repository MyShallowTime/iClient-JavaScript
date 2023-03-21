
/**
 * 组合图层管理器
 * @returns 
 */
 const CompositeLayersManager = () => {
    const layers = {};
    return {
        /**
         * 添加图层
         * @param id 
         * @param childId 
         */
        addLayer(id, childId) {
            if (!layers[id]) {
                layers[id] = [];
            }
            layers[id].push(childId);
        },

        /**
         * 删除图层
         * @param id 
         * @param childId 
         */
        removeLayer(id, childId) {
            if (childId) {
                layers[id] = layers[id].filter(l => l !== childId);
                if(layers[id].length < 2) {
                    delete layers[id];
                }
                return;
            }
            delete layers[id];
        },

        /**
         * 获取图层
         * @param id 
         * @returns 
         */
        getLayers(id) {
            return layers[id];
        },

        /**
         * 获取组合图层ID
         * @param {*} childId 
         * @returns 
         */
        getCompositeLayerId(childId) {
            for (const id in layers) {
                if (layers[id].find(i => i === childId)) {
                    return id;
                }
            }
        }
    }
};

export default CompositeLayersManager;