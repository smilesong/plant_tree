<template>
	<div>
		<head-top>
			<div slot="attention" class="back_main back_main_attention">
 <!-- <router-link :to="'/home'"><span class="icon icon-angle-left"></span></router-link> -->
 <a  @click="$router.go(-1)"><span class="icon icon-angle-left"></span></a>
				点击下面按钮关注公众号！
			</div>
		</head-top>
		<p class="attention_wrap"><input  :disabled="isShow"  class="input_a commitBtn"  :class="{reg_color:isShow}" @click="saveAttention" type="button" value="(测试)点击关注"/></p>
	</div>
</template>
<script>
	import headTop from '../../components/header/head'
	import {mapState,mapMutations} from 'vuex'
	 export default {
	 name: 'attention',//命名路由 参看这里https://router.vuejs.org/zh-cn/essentials/named-routes.html 
	 data(){
	 	return {
	 		isShow:false
	 	}
	 },
	  computed:mapState({
	 		isAttention:state=>state.isAttention
	 }),
     components:{
        headTop
    },
	 created(){
	 	
	 },
	 methods:{
	 	...mapMutations([
    		'SAVE_ATTENTION'
    	]),
          saveAttention:function(){  //关注成功后跳转到报名页面
          	 this.$root.eventHub.$emit('cc', event.target);//这行代码测试兄弟组件传参 对应regist.vue中的监听事件 
                                                              //测试结果 参数是event.target是生效，普通参数不生效，需继续测试。
             this.isShow=!this.isShow;
             this.SAVE_ATTENTION(Number(this.isShow));
             document.querySelector('.commitBtn').value="关注成功";
              // this.$router.push({ path: '/home' })
             console.log(this.isAttention)
             setTimeout(()=>this.$router.push({ path: '/regist'}),1000)
          }
	 }
}
</script>
<style lang="less" scoped>
	.attention_wrap{
		    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	    flex-direction: column;
	    align-items: center;
	    width: 90%;
	    padding-top: 4.2rem;
	    margin-left: 5%;
	  input{
	  	height: 3rem;
  	    border: 0;
	    border-radius: 2rem;
	    flex-grow: 1;
	    padding: 0 1rem;
	    color: #BF5102;
	    width: 100%;
	    margin-top: 1rem;
	     font-size:1.2rem;

	  }

	}
</style>