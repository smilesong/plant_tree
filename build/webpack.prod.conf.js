var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf.js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin'); /* 一个可以插入 html 并且创建新的 .html 文件的插件 */
// var env = config.build.env
 const env = config.build[process.env.env_config+'Env'] 
//const env = config.build[process.env.env_config];  
//const env =  process.env.NODE_ENV;

/* 合并 webpack.base.conf.js */
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules:[
      {
        test: /\.(png|svg|jpe?g|gif)$/,
       use: [  //
          {
            loader:'image-webpack-loader',  //压缩图片
            options:{
              bypassOnDebug:true,//webpack 1x
              disable:false,//webpack@2 ,and newer 
          }
        }] 
      }
    ]
  },
    //devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,  /* 编译输出目录 */
      filename: utils.assetsPath('js/[name].[chunkhash].js'), /* 编译输出文件名 */
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')  // 没有指定输出名的文件(动态加载的？)输出的文件名
    },
    /*vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
      },*/
      plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
          'process.env': env
        }),
       /* new MiniCssExtractPlugin({
          filename: utils.assetsPath('css/[name].css'),
          chunkFilename: utils.assetsPath('css/[id].css')
        }),*/
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        /* 输入输出的 .html 文件 */
        new HtmlWebpackPlugin({
          filename: config.build.index,  // 生成的 html 文件名
          template: 'index.html', // 使用的模板
          inject: true, // 默认值，注入的js在html文件body底部
          chunksSortMode: 'dependency'
          })
        ],

        optimization: {
         minimizer: [
         new UglifyJsPlugin({   /* 压缩 js 亲测可用  表现形式是 js压缩后变成一行了*/
          cache: true,
          parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
         new OptimizeCSSAssetsPlugin({})  //压缩css 亲测可用
         ],
         runtimeChunk:{ //代码分割 提取webpack运行文件 
            name:"manifest",//提取webpack的manifest name可以用其他的名字
         },
         splitChunks: {  ////代码分割 提取 第三方库  //打包 公共文件
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(scss|css)$/,  //scss和css文件提取
              minChunks: 1,
              reuseExistingChunk: true,
              chunks: 'all',
              enforce: true
            },
            commons: { //这个不用写test，他是将c.js 提取出来。a,b.js分别都引入c.js的情况
              chunks: 'initial',
              minChunks: 2, //至少被两个模块同时引用。通俗说至少两个js都引入了同样的一个js 
              maxInitialRequests: 5,
              minSize: 0
            },
            vendor: { //公共代码就是提取 包括共代码提取，如公用的vue jQuery。
              test: /node_modules/,  //node_modules内的依赖库
              chunks: 'initial', //chunks表示将选择哪些块进行优化。包括all，async，和intial.intial
              name: 'vendor', //提取的公共模块打包后的文件名
              priority: 10,
              enforce: true
            }
          }
        }
      }
      
    })

/* 开启 gzip 的情况下使用下方的配置 */
if (config.build.productionGzip) {
  /* 加载 compression-webpack-plugin 插件 */
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
    /* 向webpackconfig.plugins中加入下方的插件 */
  webpackConfig.plugins.push(
    /* 使用 compression-webpack-plugin 插件进行压缩 */
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
        ),
      threshold: 10240,
      minRatio: 0.8
    })
    )
}

module.exports = webpackConfig





