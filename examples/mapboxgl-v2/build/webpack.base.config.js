const path = require('path');

module.exports = {
  stats: 'errors-warnings', //只在发生错误或有新的编译时输出信息
  module: {
    rules: [{
        test: /\.(less|css)$/,
        use: [
          'style-loader', // 从 JS 中创建样式节点
          'css-loader', // 转化 CSS 为 CommonJS
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true // 解决报错：bezierEasingMixin()； Inline JavaScript is not enabled. Is it set in your options
              }
            }
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
        }]
      },
      {
        test: /\.(tsx|ts)$/,
        include: [path.resolve('docs'), path.resolve('src')],
        exclude: path.resolve('node_modules'),
        use: ['babel-loader']
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        exclude: path.resolve('node_modules'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240 //图片比较小于limit值时候加载为base64,图片较大则加载原始图片(此时需要file-loader去加载原始处处文件)
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.json']
  }
};
