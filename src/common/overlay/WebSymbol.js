/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { FetchRequest } from "../util";
/**
* @class WebSymbol
* @deprecatedclass SuperMap.WebSymbol
* @category WebSymbol
* @classdesc 符号库。
* @usage
*/
export class WebSymbol {

  constructor() {
    /**
     * @member WebSymbol.prototype.symbolUrl
     * @description 符号资源路径。
     */
    this.symbolUrl = null;
  }

  /**
   * @function WebSymbol.prototype.getSymbol
   * @param {string} symbolId - 符号ID。
   * @description 获取符号信息。
   * @returns {object} 符号信息。
   */
  static async getSymbol(symbolId) {
    const url = `${this.symbolUrl}/${symbolId}/${symbolId}`;

    const value = await FetchRequest.get(`${url}.json`).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    })
      .catch(() => null);
    if (!value) {
      return null;
    }

    const image = await new Promise((resolve) => {
      const image = new Image();
      image.src = `${url}.png`;
      image.onload = (content) => {
        resolve(content ? image : null);
      };
      image.onerror = () => {
        resolve(null);
      };
    });
    return {
      value,
      image
    }
  }

}

