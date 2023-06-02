/**
 * 组合图层管理器
 * @returns {Object}
 * @private 
 */
 const CompositeLayersManager = () => {
    const layers = {};
    return {
        /**
         * 添加图层
         * @param {string} id 
         * @param {string} childId 
         * @private
         */
        addLayer(id, childId) {
            if (!layers[id]) {
                layers[id] = [];
            }
            !layers[id].includes(childId) && layers[id].push(childId);
        },

        /**
         * 删除图层
         * @param {string} id 
         * @param {string} childId 
         * @private
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
         * @param {string} id 
         * @returns {Array}
         * @private
         */
        getLayers(id) {
            return layers[id];
        },

        /**
         * 获取组合图层ID
         * @param {string} childId 
         * @returns {string}
         * @private
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