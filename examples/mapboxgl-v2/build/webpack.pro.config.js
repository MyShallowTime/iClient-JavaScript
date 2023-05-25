const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    symbol: path.resolve('src/index.tsx')
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].js'
  },
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/symbol.css",
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      filename: 'symbol.html',
      template: path.resolve('index.html')
    }),
    new CopyPlugin([
      { from: './static/fonts', to: './static/fonts' },
      { from: './static/images', to: './static/images' },
      { from: './static/symbol-infos', to: './static/symbol-infos' },
      { from: './libs/mapboxgl/iclient-mapboxgl.js', to: './libs/mapboxgl' },
      { from: './libs/resources/symbols', to: './libs/resources/symbols' }
    ])
  ]
}
