/**
 * 当前打包配置的打包结果用于iclient站点示例使用，
 * 通过可访问 http://localhost:8082/examples/mapboxgl/editor.html#symbol
 *
*/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    symbol: path.resolve('src/index.tsx')
  },
  output: {
    path: path.resolve('dist'),
    filename: 'symbol/js/[name].js'
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.(tsx|ts)$/,
      use: 'babel-loader',
      exclude: path.resolve('node_modules')
    },
    {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: './'
        }
      },
        'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            math: "always"
          }
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: {
    'mapbox-gl': 'mapboxgl'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          // node_modules内的依赖库
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "symbol/css/symbol.css",
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      filename: 'symbol.html',
      template: path.resolve('build/template.html')
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8086 }),// 分析包大小使用的插件
    new CopyPlugin([
      { from: './static/fonts', to: './symbol/static/fonts' },
      { from: './libs/mapboxgl/mapbox-gl-dev-v1.13.2.js', to: './symbol/libs/mapboxgl' }// TODO，之后使用mapbox-gl-enhance
    ])
  ]
}
