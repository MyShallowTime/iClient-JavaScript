const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const PORT = 8083;

module.exports = {
  stats: 'errors-warnings', //只在发生错误或有新的编译时输出信息
  module: {
    rules: [{
        test: /\.less$/,
        use: [
          'style-loader', // 从 JS 中创建样式节点
          'css-loader', // 转化 CSS 为 CommonJS
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, // 解决报错：bezierEasingMixin()； Inline JavaScript is not enabled. Is it set in your options
              },
            },
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: path.resolve('node_modules'),
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }],

      },
      {
        test: /\.(tsx|ts)$/,
        include: [path.resolve('src')],
        exclude: path.resolve('node_modules'),
        use: ['babel-loader']
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        exclude: path.resolve('node_modules'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, //图片比较小于limit值时候加载为base64,图片较大则加载原始图片(此时需要file-loader去加载原始处处文件)
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.json']
  },
  mode: 'development',
  entry: {
    china: path.resolve('src/index.tsx'),
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
    hot: true, // 热更新,为true时会加载webpack.HotModuleReplacementPlugin
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MAPLIBRE: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      excludeChunks: ['landuse'],
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new OpenBrowserPlugin({
      url: `http://127.0.0.1:${PORT}/index.html`
    })
  ]
};
