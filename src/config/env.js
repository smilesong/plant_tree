/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl = 'baseUrl'; 
let routerMode = 'hash';
let imgBaseUrl;
let jsonBaseUrl;
switch (process.env.NODE_ENV){
	case 'development'://开发环境
	console.log("aaaa")
	baseUrl='http://localhost';
	  imgBaseUrl = baseUrl+'/img/';
	  jsonBaseUrl=baseUrl+'/json/';
	  break;
	case 'prodution'://生产环境
	 console.log("bbbb")
     imgBaseUrl = 'http://localhost/img2/';
     break;
}

module.exports={
	imgBaseUrl,
	baseUrl,
	jsonBaseUrl,
	routerMode
}

