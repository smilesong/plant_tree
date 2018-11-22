import App from '../App'
/*这是两种异步加载模块的方法。
方法1 require.ensure 是webpack内部函数；
方法2 import 是es6的*/
 const home = ()=> require.ensure([], () => require('../page/home/home'), 'home');//首页
// const home =() =>import('../page/home/home');
 //const work = ()=> require.ensure([], () => require('../page/work/work'), 'work');//作品展示页面
 const work =()=>import ('../page/work/work');
const regist = ()=> require.ensure([], () => require('../page/regist/regist'), 'regist');//手机注册页面
const attention = ()=> require.ensure([], () => require('../page/attention/attention'), 'attention');//手机注册页面
const enroll = ()=> require.ensure([], () => require('../page/enroll/enroll'), 'enroll');//报名和个人作品页面
  
export default  [{
    path: '/',//路由路径   这个路径表示当前页 index.html
    component: App, //该路由映射的组件
    children: [
 //地址为空时跳转home页面
    {
        path: '',
        redirect: '/home'
    },
    {  //嵌套路由  。可知这个组件APP有子路由，可以包含自己的rout-view
        path: '/home',
        component: home
    }, {
        path: '/work',//作品列表页面
        component: work,
        meta: { keepAlive: true }
    }, {
        path: '/regist',//注册页面
        component: regist
    },{
       path: '/attention',//关注公众号页面
        component: attention 
    },
    {
       path: '/enroll',//报名和个人作品页面
        component: enroll 
    }
    ]
}]
//require.ensure webpack特有的函数，用于异步按需加载js