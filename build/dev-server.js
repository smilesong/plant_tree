
var config = require('../config')//这里是引入了一个文件夹
if (!process.env.NODE_ENV) //process 是node里的一个全局变量。proces.env 属性返回一个用户环境信息（对象）
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)// process.env 的环境属性是可以自己添加的
var path = require('path')//使用js自带的路径工具
var express = require('express')//使用express
var fs = require('fs')
var webpack = require('webpack')//使用webpack
var opn = require('opn')//一个可以强制打开浏览器并跳转到指定URL的插件
var proxyMiddleware = require('http-proxy-middleware')//这个中间件是和服务器相关的
var webpackConfig = require('./webpack.dev.conf') // 使用 dev 环境的 webpack 配置


/* 如果没有指定运行端口，使用 config.dev.port 作为运行端口 */
var port = process.env.PORT || config.dev.port
    var server = express()  /* 使用 express 启动一个服务 */

   /* server.get("/json/:name",function(req,res){
        res.json(require("../plant_tree/static/json/"+req.params.name));
    })*/
    /*这里是加载动态打包image的 express的实现，有效。隐藏掉是用了另外一种方法，
    在用到image的地方用了require(..img)，参看worklist 
    L19*/
  /*  server.get("/img/:name.:type",function(req,res){ /*路由访问，是访问动态加载的图片的一个方法*/
        //设置请求的返回头type,content的type类型列表见上面*/
       /* res.setHeader("Content-Type", "image/"+req.params.type);
        //格式必须为 binary 否则会出错
        var content =  fs.readFileSync("./plant_tree/static/img/"+req.params.name+'.'+req.params.type,"binary");   
        res.writeHead(200, "Ok");
        res.write(content,"binary"); //格式必须为 binary，否则会出错
        res.end();
    })*/

    var compiler = webpack(webpackConfig)   // 启动 webpack 进行编译

    /* 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中 */
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })

    /* 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload */
    var hotMiddleware = require('webpack-hot-middleware')(compiler)

    /* 当 html-webpack-plugin 模板更新的时候强制刷新页面 */
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })
//代理  请求配置挂在到启动的 express 服务上
    var context = config.dev.context
    switch(process.env.NODE_ENV){
        case 'dev': var proxypath='http:localhost:80' ;break;
        case 'prod': var proxypath= config.dev.proxypath;break;
        defalut: var proxpath=config.dev.proxypath;
    }
    var pathRewrite=config.dev.pathRewrite
    var options = {
        target:config.dev.proxypath,  
        pathRewrite:pathRewrite,
        changeOrigin: true
    }
    if (context.length) {
        server.use(proxyMiddleware('/json',options))
    }
// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
server.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
server.use(devMiddleware)

//将 Hot-reload 挂在到 express 服务上
server.use(hotMiddleware)

// serve pure static assets
// 拼接 static 文件夹的静态资源路径
 var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)//
// 为静态资源提供响应服务
server.use(staticPath, express.static('./static'))

//添加资源访问路经  这个隐藏掉是上面L86可以包括这两行的效果 begin--------------------------
// server.use(staticPath+"/images",express.static("./static/images"))
// server.use(staticPath+"/json",express.static("./static/json"))
//添加资源访问路经  end----------------------------

//让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = server.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})