var path = require('path')  // 使用 NodeJS 自带的文件路径插件
var config = require('../config') // 引入 config/index.js
var utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//用来单独打包css文件
 var projectRoot = path.resolve(__dirname, '../');//解析为绝对路径 

 var env = process.env.NODE_ENV   /* 将 NodeJS 环境作为我们的编译环境 */
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
    /* 是否在 dev环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
    var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
    /* 是否在 production 环境下开启 cssSourceMap ，在 config/index.js 中可配置 */
    var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
    /* 最终是否使用 cssSourceMap */
    var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

    module.exports = {
      entry: {
        app: './src/main.js'  // 编译文件入口
      },
      output: {
         path: config.build.assetsRoot,  //path 指编译输出的静态资源根路径(输出目录 path 的绝对路径)。本项目中指../plant_tree
         publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
         //publicPath 很重要  其中一个作用是为动态加载文件指定根路径，这里是指静态输出资源的根目录plant——tree
      },
      resolve: {
        extensions: ['.js', '.vue', '.less', '.css', '.scss'],  // 自动补全的扩展名
        modules: [path.join(__dirname, '../node_modules')], // 告诉 webpack 解析模块时应该搜索的目录
        alias: {
        // 默认路径代理，例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
        'vue$': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets'),
        'components': path.resolve(__dirname, '../src/components')
      }
    },
    resolveLoader: {
      modules: [path.join(__dirname, '../node_modules')],
      moduleExtensions: [ '-loader' ]
    },
    module: {// rule.loaders是rule.use的别名、// loader包用于对模块的源代码进行转换。
      rules: [{
            test: /\.vue$/, //条件匹配资源。对所有以.vue为后缀的文件，使用vue包转换
            loader: 'vue-loader' 
          }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },/* { //这个貌似可以去掉
  　　　　　　test: /\.html$/,
  　　　　　　loader: 'html-withimg-loader'
      　　　　},*/
          {
            test: /\.(png|svg|jpg|gif)$/,
           use: [  //写法2
              {
                loader:'file-loader',  //输出图片到指定公共路径
                options:{
                  name:utils.assetsPath('img/[hash:8].[name].[ext]'),
                  // name:utils.assetsPath('img/[name].[ext]'),
              }
            }],// [ext]资源扩展名 [name] 资源的基本名称
            /*use: [   //file-loader 的两种写法 写法1
           'file-loader?name='+utils.assetsPath('img/[hash:8].[name].[ext]')
           ],*/
           use:[
              {
                loader: 'url-loader',//http://www.jb51.net/article/122936.htm
                 options: { //Loads files as base64 encoded URL
                 limit:8192,
                  name:utils.assetsPath('img/[hash:8].[name].[ext]'),
                 // name:utils.assetsPath('img/[name].[ext]'),
                 fallback:'file-loader',
              }
            }
           ]
       }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
        'file-loader?name='+utils.assetsPath('fonts/[hash:8].[name].[ext]')
        ]
            /*loader: 'url-loader',
             options: {
              name:utils.assetsPath('fonts/[hash:8].[name].[ext]')
            }*/
          },  {
            test: /\.less$/,
            use: [  //开发环境下fallback:'style-loader',建议style-loader 代替mini
            'style-loader', /*将js串解析成css的style样式*/
           //MiniCssExtractPlugin.loader,/*将js串提取成一个css文件*/
            'css-loader', /* 将css解析成js串(commonJs模块）*/
            'less-loader', /*将less编译成css*/
            ]
          }, {
            test: /\.css$/,
            use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
            ]
          } 
          ]},
       /*  devServer: {  //这个项目没有用devserver，使用的是express+dev-middleware
            proxy: {
              '/json/*': {
                   target:"https://www.easy-mock.com/mock/5bc5532f1e3c5836f8687075/songsong",  
                  changeOrigin: true,
                  pathRewrite: {
                      '^/json': ''
                  },
                  secure: false
                }
            }
          },*/
          plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
     filename: utils.assetsPath('css/[name].css'),
     chunkFilename: utils.assetsPath('css/[id].css')
   })
    ]
  }


  //
  // url-loader 打包文件（如图片）到一个指定的输出路径；但是当文件大小小于指定的值时，可以返回一个base64格式的图片
  //file-loader 打包文件（本项目如图片，字体）到一个指定的输出路径。URL-loader和file-loader可共同使用

  // css-loader和style-loader：如果我们在打包的入口js文件中import了css文件，并且想要把css文件作为<style>的内容插入到模版文件，
  //这时候我们要用到webpack的css-loader和style-loader，
  //前者用于在js中加载css( 即解释 @import 和 url() ，在import/require() 后再解析(resolve)它们)，
  //后者把加载（或者解析的）的css作为style标签内容插入到html中。

// mini-css-extract-plugin：这个插件将CSS提取到单独的文件中（对比着style-loader的内联样式）。
//它为每个包含CSS的JS文件创建一个CSS文件。(也就是说如果有a.js，b.js连两个入口js的话，
//a中import两个css（1.css,2.css),同样b中有3个（3,4,5.css）,最终1,2打包成一个css，345打包成一个css
//简单说这个mini就是合并

/*函数解释*/
//path.join([...path]) 使用特定分隔符把全部的 路径path片段连接到一起,生成一个路径
//path.resolve()把一个路径或路径片段解析为一个绝对路径。如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上
//_dirname 当前模块的所在的目录名