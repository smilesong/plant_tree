<template>
	<div>
	<head-top>
		<div slot="work" class="back_main back_main_work">
			<router-link :to="'/home'"><span class="icon icon-home3"></span></router-link>
			<span>
        <input type="text" placeholder="试着输入名字或作品id" v-model="searchText" v-on:input="fuzzySearch"/>
				<span class="icon-search"></span>
			</span>
			<span class="icon icon-user" @click="judgeState"></span>
		</div>
		
	</head-top>	
	<!-- 作品列表 -->
	<work-list  :search-text="searchText"  :zan-flag="zanFlag" :throttle-flag="throttleFlag" v-on:zanCN="zanAct" >
	</work-list>
    <!-- tips -->
    <alert   :alert-flag="isAlertFlag"  :cxt="alertCxt" v-on:onTap="changeAlert">
    </alert>
   
</div>
</template>

<script >
import headTop from '../../components/header/head'
import alert from '../../components/common/alert'
import {mapState,mapMutations} from 'vuex'
import workList from '../../components/common/workList'
import {zanResult} from 'src/service/getData'

	 export default {
	 name: 'work',//命名路由 参看这里https://router.vuejs.org/zh-cn/essentials/named-routes.html 
	 data(){
	 	return {
           zanFlag:false,
           throttleFlag:true,//模糊查询标识
           isAlertFlag:false,
           alertCxt:"",
           searchText:"",//模糊查询的内容
           obj:{
            a:1
           }
        }
	 },
     computed:{
        ...mapState(['isAttention','isRegist',"isUp"]),
      
     },
     components:{
        headTop,
        workList,
        alert
     },
     created(){
        /* this.getIsAttention();//检测是否关注公众号
         this.isRegist();//检车是否注册*/
         console.log(this.obj)
         
     },
     methods:{
     	judgeState:function (){//判断是否关注公众号，是否注册
           if(!this.isAttention){ //未关注，则跳转到关注页面
             this.$router.push({ path: '/attention' })
           }else if(!this.isRegist){//未注册则跳转到注册页面
               this.$router.push({ path: '/regist'} )
           } else{ // 否则跳转到个人作品页面
              this.$router.push({ path: '/enroll'} )
           }
        },
        /*点赞*/
        async zanAct(){
           let res= await zanResult();
           if(res.returnCode=="0000"){//点赞成功 变色
               this.zanFlag=!this.zanFlag; //点赞成功flag变化，则在worklist组件中watch此flag重新（异步）加载作品列表
               this.isAlertFlag=true;//点赞失败给提示
            this.alertCxt="点赞成功";
           }else{
            this.isAlertFlag=true;;//点赞失败给提示
            this.alertCxt=res.returnMessage;
              
           }
         },
         /*提示框*/
          changeAlert(){
            this.isAlertFlag=false;
           },
           /* 模糊查询*/
        fuzzySearch(){
           console.log(this.searchText)
           this.throttle()
        },
        throttle(){
          if(this.throttleFlag){
             console.log("3333")
             this.throttleFlag=false;
            window.setTimeout(()=>{
              this.throttleFlag=true;
               console.log("4444")
            },1000)
          }else{
             console.log("222")
           return false;
          }
        }//

    }
}
</script>

<style lang="less" scoped>
.container{
	background-color:#FBF1CA;
}
.back_main_work{
	
   &>span:nth-child(2){
    	flex-basis: 60%;
    	position: relative;
    }
    &>span>input{
        	border:0;
        	height:2.2rem;
        	line-height: 2.2rem;
        	width:100%;
    	    padding: 0 4px 0px 30px;
        	border-radius:1rem;

    }
    [class^="icon"]{
        font-size:28px;
    }
    .icon-search{
      color: #EED0BB;
    font-size: 18px;
    position: absolute;
    left: 9px;
    top: 6px
    }
}

</style>