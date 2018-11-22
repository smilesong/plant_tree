<template>
	<div class="bg">
		<figure class="im0 imc"><img src="../../images/p1_bg1.jpg"/></figure>
		<figure class="im1 imc"><img src="../../images/p1_title.png"/></figure>
		<figure class="im2 imc"><img src="../../images/p1_txt.png"/></figure>
		<figure class="im3 imc"><img src="../../images/p1_txtshai.png"/></figure>
		<div class="wrap_btn">
			<router-link  :to="'/work'"  class="wrab_in"><img  src="../../images/p1_btn1.png"/></router-link>
			<!-- <router-link  :to="'/regist'"   class="wrab_in"><img src="../../images/p1_btn2.png"/></router-link> -->
			<div   @click="judgeState"   class="wrab_in"><img  src="../../images/p1_btn2.png"/></div>

		</div>
	</div>

</template>
<script>
import {mapState,mapMutations} from 'vuex'
import {getStateInfo} from 'src/service/getData'
export default{
	 name: 'home',//命名路由 参看这里https://router.vuejs.org/zh-cn/essentials/named-routes.html 
	 data(){
	 	return {
	 		
	 	}
	 },
	 /*写法1*/
     /*computed:mapState({
	 		isAttention:state=>state.isAttention,
	 		isRegist:state=>state.isRegist
	 }),*/
	 computed:{
	 	...mapState(['isAttention','isRegist',"isUp"])
	 },
	/*async beforeMount(){  //这里有服务器段数据时，是否注册和关注要使用服务器的数据，这里是假数据。
	   //获取是否关注和注册  async 
       let res= await getStateInfo();
       this.SAVE_ATTENTION(res.isAttention);
       this.SAVE_REGIST(res.isRegist) 
	 },*/
	 created(){
       
	 },
	 methods:{
	 	...mapMutations([
    		'SAVE_ATTENTION', 'SAVE_REGIST'
    	]),
	 	judgeState:function (){//判断是否关注公众号，是否注册
	 		console.log("ssss")
	 		console.log(this.isAttention)
	 		console.log(this.isRegist)
           if(!this.isAttention){ //未关注，则跳转到关注页面
             this.$router.push({ path: '/attention' })
           }else if(!this.isRegist){//未注册则跳转到注册页面
	 	       this.$router.push({ path: '/regist'} )
	 	   } else{ // 否则跳转到个人作品页面
              this.$router.push({ path: '/enroll'} )
	 	   }
	 	}
	 }
	}
	</script>

	<style  lang="less" scoped>
	
	
	.bg{
		height: 100vh;
		background-color:#fff;
		/*  background-image:url('../../images/p1_bg1.jpg'); //注意这个背景图片的路径写法*/ 
		
		.imc{
           position: relative;
           align:center;
		}
		.im0{
			position: absolute;
		}
		.im1{ 
			width:90%;
			left:5%;
			top:3rem;
		}
		.im2{
			width:80%;
			left:10%;
			margin-top:3rem;
		}
		.im3{
			position: absolute;
			width:86%;
			left:6%;
			bottom:5rem;
		}
	.wrap_btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: absolute;
		bottom:1rem;
		margin:0 8%;
		.wrab_in{
           width: 46%;
		}
	}	
	}

	</style>