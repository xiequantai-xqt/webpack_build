const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 用path.resolve拼接得到一个绝对路径
    filename: 'js/bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.scss'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    port: '3000', // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    compress: true, // 启用gzip压缩
    hot: true,
    proxy: {
      '/api': {
        // 匹配规则
        target: 'https://other-server.example.com', // 代理目标地址
        secure: false, // 接受在 HTTPS 上运行且证书无效的后端服务器
        changeOrigin: true, // 服务器源跟踪
        pathRewrite: { '^/api': '' } // 路径重写
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            {loader:"style-loader"},
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                    plugins: [['postcss-preset-env']]
                    }
                }
            },
            { loader: 'sass-loader' }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '这里是页面标题',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: false, // 是否支持optionsApi
      __VUE_PROD_DEVTOOLS__: false // 在生成环境是否支持devtools
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new VueLoaderPlugin()
  ]
}
