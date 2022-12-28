// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')

// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack 中的所有的配置信息都应该写在module.exports中
module.exports = {
  mode : 'development',
  // 指定入口文件
  entry: './src/index.ts',

  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: "bundle.js",
    // 告诉webpack不使用箭头函数
    environment: {
      arrowFunction: false,
      const: false, // 不使用const
    }
  },

  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的时规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": '11'
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方法 "usage"表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }

          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      // 设置less文件对处理
      {
        test: /\.less$/,
        // 执行顺序从下往上执行
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss加载器
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { // 指定post使用对插件
                plugins: [ // 要使用的插件
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions' // 配置要兼容的浏览器信息 （兼容主流浏览器最新的2个版本）
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },

  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "Webpack App"
      template: "./src/index.html"
    })
  ],

  // 用来设置引用模块
  resolve: {
    // 凡事以ts,js结尾的文件都能做模块化引用
    extensions: ['.ts', '.js']
  }
}
