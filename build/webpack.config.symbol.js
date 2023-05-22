const configBase = require('./webpack.config.base');
//端名
const libName = 'symbol';
//产品包名
const productName = 'iclient-symbol';
//
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: configBase.target,
  mode: configBase.mode,
  //页面入口文件配置
  entry: configBase.entry,
  //入口文件输出配置
  output: configBase.output(libName, productName),
  //是否启用压缩
  optimization: configBase.optimization,
  //不显示打包文件大小相关警告
  performance: configBase.performance,
  //其它解决方案配置
  resolve: configBase.resolve,

  module: {
    rules: (function () {
      let moduleRules = [];
      const babelConfig = {
        test: [/\.js$/],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                absoluteRuntime: false,
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
              }
            ]
          ]
        }
      }
      configBase.moduleVersion === "es6" && (babelConfig.include = /FGBLayer|flatgeobuf/);
      moduleRules.push(babelConfig);
      return moduleRules;
    })()
  },
  plugins: [
    new CopyPlugin([
      { from: `${__dirname}/../src/symbol/resources`, to: `${__dirname}/../dist/${libName}/resources` }
    ])]
};
