/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @class SymbolLibrary
 * @deprecatedclass SuperMap.SymbolLibrary
 * @category Symbol
 * @classdesc 符号库。
 * @param {string} url - 预定义符号资源地址。
 * @usage
 */
class SymbolLibrary {
  constructor(url) {
    this.url = url;
  }

  /**
   * @function SymbolLibrary.prototype.getImage
   * @param {string} url - 预定义符号资源地址。
   * @returns {Image} image。
   * @description 获取image
   */
  async getImage(url) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = url;
      image.onload = (content) => {
        resolve(content ? image : null);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
  }

  /**
   * @function SymbolLibrary.prototype.getJson
   * @param {string} url - 预定义符号资源地址。
   * @returns {JSON} Json
   * @description 获取Json
   */
  async getJson(url) {
    return fetch(url, {
      method: "GET"
    }).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    });
  }

  /**
   * @function SymbolLibrary.prototype.getSymbol
   * @param {string} symbolId - 预定义符号ID。
   * @description 获取预定义符号信息。
   * @returns {object} symbol + image。
   */
  async getSymbol(symbolId) {
    const url = `${this.url}/${symbolId}/${symbolId}`;
    const value = await this.getJson(`${url}.json`);
    if (!value) {
      return null;
    }
    const image = await this.getImage(`${url}.png`);
    return {
      value,
      image
    }
  }
}

export default SymbolLibrary;

