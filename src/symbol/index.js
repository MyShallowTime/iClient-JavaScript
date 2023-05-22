/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
class SymbolLibrary {
  constructor(url) {
    this.url = url;
  }

  async getSymbol(symbolId) {
    const value = await fetch(`${this.url}/resources/${symbolId}/${symbolId}.json`, {
      method: "GET"
    }).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    });
    if (!value) {
      return null;
    }
    const image = await this.getImage(`${this.url}/resources/${symbolId}/${symbolId}.png`);
    return {
      value,
      image
    }
  }

  getImage(url) {
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
}
window.SymbolLibrary = SymbolLibrary;

