const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const PORT = 8083;
module.exports = WebpackMerge(baseConfig, {
  mode: 'development',
  entry: {
    china: path.resolve('src/index.tsx')
  },
  output: {
    filename: '[name].js',
    path: path.resolve('../dist')
  },
  devtool: 'eval-source-map', // 重建速度ok,源码映射质量高
  devServer: {
    port: PORT,
    host: '0.0.0.0',
    disableHostCheck: true, //devServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求【即可直接通过 IP 地址访问】
    overlay: {
      errors: true //当出现编译错误时，在浏览器中显示全屏覆盖。
    },
    compress: true, //压缩用于减少服务器向前端传输的数据量，提高浏览的速度
    hot: true // 热更新,为true时会加载webpack.HotModuleReplacementPlugin
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEV: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html')
    }),
    new OpenBrowserPlugin({
      url: `http://127.0.0.1:${PORT}/index.html`
    })
  ]
});
