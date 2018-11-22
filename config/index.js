// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {  // production 环境
        // env: {NODE_ENV: '"production"'},
        env:require('./prod.env'),//  {NODE_ENV: '"production"', ENV_CONFIG:'"prod"'}
        index: path.resolve(__dirname, '../plant_tree/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../plant_tree'), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/plant_tree/',//可以尝试下用这个路径/plant_tree/ 或者"/"
                                          // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        productionSourceMap: true,  // 是否开启 cssSourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,  // 是否开启 gzip
        productionGzipExtensions: ['js', 'css']  // 需要使用 gzip 压缩的文件扩展名
    },
    dev: { // dev 环境
       // env: {NODE_ENV: '"development"'},
        env:require('./dev.env'),
        port: 80,   // 运行测试页面的端口
        assetsSubDirectory: 'static',   // 编译输出的二级目录
        assetsPublicPath: '/',  // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        context: [ //代理路径   // 需要 proxyTable 代理的接口（可跨域）
              '/json', 
        ],
        proxypath: 'https://www.easy-mock.com/mock/5bc5532f1e3c5836f8687075/songsong',
        pathRewrite:{'^/json':''},
         //proxypath: 'https://mainsite-restapi.ele.me',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false   // 是否开启 cssSourceMap
    }
}