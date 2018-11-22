// https://github.com/shelljs/shelljs
require('shelljs/global') // 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell
 //env.NODE_ENV = 'production'
 
var path = require('path')
var config = require('../config')
var ora = require('ora') // 一个很好看的 loading 插件
var webpack = require('webpack') // 加载 webpack
var webpackConfig = require('./webpack.prod.conf')  // 加载 webpack.prod.conf
//var spinner = ora('building for '+buildtype+'...')  // 使用 ora 打印出 loading + log
var spinner=ora('build for'+process.env.NODE_ENV+'of'+process.env.env_config+'mode...')
spinner.start()   // 开始 loading 动画

/* 拼接编译输出文件路径 */
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)//static文件夹
 rm('-rf', assetsPath)  /* 删除这个文件夹 （递归删除） */
mkdir('-p', assetsPath)   /* 创建此文件夹 */ 
 // cp('-R', 'src/json', assetsPath+'/json')  /* 复制 。。。 文件夹到我们的编译输出目录 */
                                          /* 用了json代理之后这行代码就可以省略了。。。dev-server。js L61.
                                            为什么呢？代理后我们把json放到需要访问的网址了 ，
                                            不做代理在本地访问json的话需要把src里的json搬运过来，
                                            这个cp是方法之一，这里是不能去掉的*/
// cp('-R', 'src/images', assetsPath+'/img')/*这里图片能通过loader打包到输出目录，，所以不用cp了
                                          //  .json的loader目前我还没打包到输出目录，所以本项目凡是
                                          //需要用到在输出目录的json的，它要使用cp*/
                                              

//  开始 webpack 的编译
webpack(webpackConfig, function(err, stats) {
     // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})