<template>
	<div>
		<head-top>
     
		<div slot="regist" class="back_main back_main_regist">
       <router-link :to="'/home'"><span class="icon icon-angle-left"></span></router-link>
			请提供您的手机号！
		</div>
		</head-top>
		<ul class="tel_wrap ">
          <li>
            <input class="tel_btn" type="number" maxlength="11" placeholder="请输入手机号"  v-model.trim="phoneNumber"/>
          </li>
          <li class="tel_in">
            <input class="verify_btn" v-model="verifyCode" type="number" placeholder="请输入验证码"/>
            <input class="time_btn" @click.prevent="getVerifyCode" :disabled="isShowA" type="button" value="获取验证码"/>
          </li>
          <li>
            <input class="commit_btn" :class="{reg_color:isHasReg,input_b:!isClick}" @click.prevent="commitRegist"  :disabled="isClick" type="button" value="下一步"/>
          </li>
          <li class="tip_text" v-if="showAlert">{{alertTips}}</li>
        </ul>
	</div>
</template>

<script>
import headTop from '../../components/header/head'
import {mobileCode} from '../../service/getData'
import {mapState,mapMutations,mapActions} from 'vuex'
	 export default {
	 name: 'regist',//命名路由 参看这里https://router.vuejs.org/zh-cn/essentials/named-routes.html 
	 data(){
	 	return {
      phoneNumber:null,//手机号码
      computedTime:30,//倒计时
      isShowA:false,
      verifyCode:null,//短信验证码
      reVerifyCode:null,//返回的短信验证码
      alertTips:"",
      showAlert:false,
      isHasReg:false,//是否注册标识
      isClick:true,//下一步按钮是否可点击
    }
	 },
     components:{
        headTop
    },
    computed:{
      ...mapState(['isRegist']),
      rightPhoneNumber: function (){//判断手机号码
          return /^1[3|4|5|7|8][0-9]{9}$/g.test(this.phoneNumber);
      }
    },
	  mounted(){
	 	 this.$root.eventHub.$on('cc',(target)=>{
         /*this.alertTips=data;*/
          this.showAlert=true;
          console.log("xxxxxxxxxxxxxxx")
         console.log(target)
    })
	 },
   methods:{
       /*...mapMutations([
        'SAVE_REGIST'
      ]),*///和110行一起配对使用
       ...mapActions(['saveRegist']),
       //获取短信验证码
       getVerifyCode(){
        if(this.rightPhoneNumber){//如果手机号正确,
           this.showAlert=false;
          this.computedTime=3;
          this.isShowA=true;
          let timer=setInterval(()=>{
            console.log(this.computedTime)
          document.querySelector('.time_btn').value=String(this.computedTime)+"s";
          this.computedTime--;
            if(this.computedTime==0){
              this.isShowA=false;
              document.querySelector('.time_btn').value="再次获取";
              clearInterval(timer);
              this.isClick=false;//原则上验证码填入后可点击下面按钮，这里测试需要，在这个定时器结束后才可以点击

            }
          },1000)
          //发送短信验证码
          let res= mobileCode(this.phoneNumber);
          /*console.log(res)
          console.log(res.message)
           this.verifyCode=Math.ceil(Math.random()*10)+res.message;
          */
          res.then((cont)=>{
            if(cont.message){
              this.verifyCode=Math.ceil(Math.random()*10)+cont.message;
              this.reVerifyCode=this.verifyCode;
              // this.isClick=false;//原则上验证码填入后可点击下面按钮
            }
          },(err)=>{

          })
          
        }else{
          this.showAlert=true;
          this.alertTips="请输入正确的手机号"
        }
      },
      //提交注册
      commitRegist:function (){ //保存用户信息。这里只让他的注册标识改为1，实际手机号并未存入库中，没用库都是假数据嘛哈哈哈
          if(this.rightPhoneNumber && this.verifyCode==this.reVerifyCode &&this.verifyCode!=""&&this.verifyCode!=null){
            this.showAlert=false;
            // this.SAVE_REGIST(Number(true));//更改注册标识为已注册了
            this.saveRegist(Number(true))
            document.querySelector('.commit_btn').value="注册成功";
            this.isClick=true;//注册成功后下一步按钮不可点击
            console.log(this.isRegist)
            this.isHasReg=Boolean(this.isRegist);
            setTimeout(()=>this.$router.push({ path: '/enroll'}),1000)
          }else if(!this.rightPhoneNumber){
            this.showAlert=true;
            this.alertTips="请输入正确的手机号"
          }else{
            this.showAlert=true;
            this.alertTips="请输入正确的验证码"
          }
      },
      closeTip(){
          this.showAlert = false;
      }
   }

}
</script>

<style lang="less" scoped>
.fl{
	display: flex;
	flex-direction: row;
    justify-content: space-between;
}

.input_b{
  background-color: #EEC350;
}
  .tel_wrap{
  	.fl;
  	flex-direction: column;
  	align-items: center;
  	width:90%;
  	padding-top: 4.2rem;
  	margin-left:5%;
  	li{
  		.fl;
	    height: 3rem;
	    width: 100%;
	    margin: 0.8rem 0;
	    line-height: 3rem;
	    font-size: 1.2rem;

	    input{
	    	border: 0;
		    border-radius: 2rem;
		    flex-grow: 1;
	        padding: 0 1rem;
	        color:#BF5102;
	    }
  	}
  	
  	li:nth-child(2){
  		input:nth-child(1){
  			border-top-right-radius: 0;
  			border-bottom-right-radius: 0;
  		}
  		input:nth-child(2){
  			border-top-left-radius: 0;
  			border-bottom-left-radius: 0;
  			background-color: #EEC350;
  		}
  	}
    .tip_text{
      color:red;
    }
   
  }

</styles>