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
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        // 配置资源输出位置和名称
        generator: {
          // 将图片文件输出到 imgs 目录中
          // 将图片文件命名 [name][hash:6][ext][query]
          // [name]: 之前的文件名称
          // [hash:6]: hash值取6位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'imgs/[name][hash:6][ext][query]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
