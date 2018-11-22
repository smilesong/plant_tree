import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from  'vue-touch'
import routes from './router/router.js'
import FastClick from 'fastclick'
 import store from './store/'
// import ajax from './config/ajax'
import "./css/normalPhone"
import './css/icon'
import './css/main'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
/*FastClick.attach(document.body);*/

/*Vue.use(VueTouch,{name:'v-touch'})*/
Vue.use(VueRouter)
console.log(typeof Vue)

const router = new VueRouter({ // 创建router实例
	routes, //相当于 routes:routes
	mode:"history",
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition){
    console.log(savedPosition)
    if (savedPosition) {  // savedPosition is only available for popstate navigations.
      console.log(savedPosition)
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
        console.log(document.body.scrollTop)
      }

      console.log(from)
      console.log(to)
      console.log(to.meta.savedPosition)
      console.log(document.body.scrollTop)
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
    
  }
})


new Vue({
	router,//创建和挂载路由的根实例
	 store,// 
   data:{
    eventHub:new Vue()//这行代码测试兄弟组件传参 测试attention和regist.vue
   }
}).$mount('#app')

