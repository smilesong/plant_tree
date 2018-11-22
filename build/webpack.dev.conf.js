
var config = require('../config')//使用了 config/index.js
var webpack = require('webpack') // 使用 webpack
var merge = require('webpack-merge')  // 使用 webpack 配置合并插件
var utils = require('./utils') // 使用一些小工具
var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf
/* 使用 html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中 */
var HtmlWebpackPlugin = require('html-webpack-plugin') 


// add hot-reload related code to entry chunks
// 将 Hot-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})// Object.keys 返回一个对象自身的可枚举属性组成的字符串数组。
//forEach对数组的每个函数执行一次提供的函数。这里的name="entry"
//concat 可以连接两个或多个数组返回一个新的数组；或者连接两个字符串返回一个新的字符串；字符串多用+来连接

/* 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并 */
module.exports = merge(baseWebpackConfig, {
    module: {
          // 使用 styleLoaders
       /* rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })*/
       /* rules:[{
            test:/\.json$/,
            loader:'json-loader'
        }]*/
    },
     output: {
       /* publicPath:'/',*/
        // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: utils.assetsPath('js/[name].js'), // 编译入口文件输出的文件名 //publicPath是 正式发布环境下编译输出的上线路径的根路径
        chunkFilename: utils.assetsPath('js/[name].bundle.js'),//非入口文件（按需加载文件）的名字,比如路由里 home.js,work.js ...
      },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    /*devServer: {
       proxy: {
          '/json/*': {
                 target: 'https://www.easy-mock.com/mock/5bc5532f1e3c5836f8687075/songsong',  
                pathRewrite:{'^/json':''},
                changeOrigin: true
            }
        }
    },*/
    plugins: [ //使用插件
        new webpack.DefinePlugin({ //使用webpack内置插件definePlugin指定环境
            'process.env': config.dev.env
        }),  
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // new webpack.optimize.OccurenceOrderPlugin(), // OccurenceOrderPlugin is needed for webpack 1.x only
        new webpack.HotModuleReplacementPlugin(),//模块热替换，用于修改模块时,无需完全更新。通俗的说就是修改js时页面会随之更改，不用刷新页面。
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({ //用于修改入口文如js的名称时，页面上的对应出口文件名字自动修改
            filename: 'index.html',
            template: 'index.html',// 依赖的文件模板
            title:"titles",
            inject: true
        }),
        
        ],
       /* optimization:{//这个在开发环境里使用
            runtimeChunk:{
                name:"manifest"
            }
        }*/

    })

//HtmlWebpackPlugin
// NoEmitOnErrorsPlugin: 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。