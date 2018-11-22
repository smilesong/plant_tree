<template>
	<div>
		<head-top>
     
		<div slot="enroll" class="back_main back_main_enroll">
			<router-link :to="'/work'"><span class="icon icon-angle-left"></span></router-link>
			<p v-if="isUp">修改</p>
			<p v-else>上传作品</p>
			
			<span  @click="updateInfo" class="icon icon-floppy"></span>
			
		</div>
		<!-- <div slot="enrollB" class="back_main back_main_regist">
			<router-link :to="'/home'"><span class="icon icon-angle-left"></span></router-link>
		</div> -->
	</head-top>

	<!-- tips -->
	<alert   :alert-flag="isAlertFlag"  :cxt="alertCxt" v-on:onTap="changeAlert">
		
	</alert>
	<!-- tips  end-->
	<form  class="enroll_wrap worklist_wrap">
			 <pre id="showPhoto"><input :disabled="isDisabled"  type="file" id="file"  @change="priviewPhoto"/> <img id="output" :src="url" hidden/></pre>
			 <div class="title_wrap"><input :disabled="isDisabled" class="title" v-model="title" type='text' placeholder="主题" /></div>
		     <div class="cont_wrap"><textarea :disabled="isDisabled"  v-model.trim="context" v-on:keyup="judgeNum" class="cont" rows="5" placeholder="请输入您的故事,字数不能大于150"></textarea>
		     	<section class="renum_wrap">已经输入<span>{{num}}</span>字，还剩<span>{{reNum}}</span>字</section>
		     </div>
		     <div v-if='!isUp' class="check_wrap"><input  id="check" v-model="isRead"  type='checkbox'><a>免责声明</a></div>
		     <!-- <input  :disabled="isDisabled" type="button" class="com_btn2 commitBtn" @click="commitInfo" :value="btnText"/> -->
	</form>
	

	</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import alert from '../../components/common/alert'
import {getStore, setStore} from 'src/config/mUtils'
	export default{
		data(){
         return {
         	url:null,
         	title:"",//标题
         	isRead:0,//是否已读
         	context:"",//故事内容
         	// isDisabled:false,
         	// btnText:"提交",
         	history:null,
         	isAlertFlag:false,
         	alertCxt:""
         	// alertPost:{isAlertFlag:false,alertCxt:""}
         }
		},
		filters:{
		},
		computed:{
			...mapState(["isUp"]),
			/*...mapState({
				isUp:{
					get:function(){
						state => state.isUp
					},
					set:function(newVal){
                       
					}
				}
			}),*/
			isDisabled(){
                switch(this.isUp){
			 	case 0:
			 	return false;
			 	break;
			 	case 1:
			 	return true;
			 	break;
			 	case 2:
			 	return false;
			 	break;
			 }
			},
			contextB(){
				if(this.context.length>0)
                return this.context.replace(/\s/gi,"")
			},
		    num(){
               if(this.contextB){
				return  Number(this.contextB.length)
			}else{
				return 0;
			}
			},
           reNum(){
           	if(this.contextB){
           			return  150-Number(this.contextB.length)
           	}
           else{
				return 150;
			}
           },
           personalInfo(){
           	return {url:this.url,title:this.title,context:this.context};
           }

		},
		components:{
	        headTop,
	        alert
	    },
	   /* mounted(){
              this.initChecked();
	    },*/
	    created:function(){
	    	if(getStore("personalInfo")){
	    		  this.history=JSON.parse(getStore("personalInfo"));
	    		  console.log(this.history)
	    		  this.url= this.history.url;
	    		  this.title=this.history.title;
	    		  this.context=this.history.context;
	    	}
            
	    },
	    mounted(){
	    	 console.log(document.querySelector("#showPhoto"));
	    	 document.querySelector("#showPhoto").style.backgroundImage='url('+this.url+')';
	    },
	    methods:{
	    	/*initChecked(){//初始化复选框 不知为何直接设置checked="ischeked"无效
              document.querySelector("#check").checked=this.isRead;
	    	},*/
	    	/* 上传图片*/
	    	...mapMutations(['SAVE_UP']),
	    	createObjectURL(blob){
	          if (window.URL){
	                return window.URL.createObjectURL(blob);
	            } else if (window.webkitURL){
	                return window.webkitURL.createObjectURL(blob);
	            } else {
	                return null;
	            }
	    	},
           priviewPhoto:function(event){
                let e=event ? event : window.event,
                     file=e.target.files,
                     reader=new FileReader();
                     if(/image/.test(file[0].type)){
                       this.url=this.createObjectURL(file[0]);
                       document.querySelector("#showPhoto").style.backgroundImage='url('+this.url+')';
                     }else{
                     	// this.isDisabled=true;
                     	console.log("not a image")
                     }
           },
           judgeNum(){
               if(this.contextB&&Number(this.contextB.length)>150){
               	this.context=this.contextB.substr(0,150);
               }
           },
           /*提交*/
           commitInfo(){
           	        this.isAlertFlag=true;
                 if(this.url==null||this.url.length==""){
                      console.log("请上传作品")
                      this.alertCxt="请上传您的个人作品哦!";
                 }else if(this.title==""){
                       console.log("输入主题")
                        this.alertCxt="请输入作品主题哦!"
                 }else if(this.context==""||this.context.length==0){
                      console.log("请输入您的故事")
                      this.alertCxt="请输入您的故事哦"
                 }else if(this.isRead!=1&&this.isUp==0){
                 	 console.log("请先阅读免责声明")
                 	 this.alertCxt="请先阅读免责声明！"
                 }else{
                 	this.isAlertFlag=false;
                 	// this.SAVE_UP(1);
                 	// this.isDisabled=true;
                 	if(this.isUp==0){ 
			            this.SAVE_UP(1);
                 		console.log("提交成功")//跳转
                 		// this.btnText="提交成功";
                 	}else{
                 		console.log("修改成功");//跳转
                 		this.SAVE_UP(1);
                 		// this.btnText="修改成功";
                 	}
                 	
                 	setTimeout(()=>this.$router.push({ path: '/work'}),1000)
                 	setStore('personalInfo',this.personalInfo);//提交作品时将作品存储在本地sessionStorage中 ，一直保持到浏览器关闭
                 	
                 }
           },
           //更新作品信息
           updateInfo(){
           	 switch(this.isUp){
           	 	case 0://提交
                 this.commitInfo();
           	 	break ;
           	 	case 1://修改状态
                this.SAVE_UP(2);
               /* this.isDisabled=false;*/
           	 	break;
           	 	case 2://保存状态
           	 	this.commitInfo()
           	 	break;
           	 }
           /*	if(this.isUp==0){
           		return 
           	}else {
           	  this.isDisabled=false;
              // this.btnText="保存";	
           	}*/
           },
           changeAlert(){
           	this.isAlertFlag=false;
           }
	    }
	}
</script>
<style lang="less" scoped>
  @color:#BF5102;
	.enroll_wrap{
      width:92%;
      left:4%;
     display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-bottom:0.6rem;
	}
	#showPhoto{
		align-self:stretch;
       height:48vh;
       background-size: cover;
       background-image: url("../../images/1.jpg");
       flex-shrink:1;
	}
	#file{
		width:100%;
	    height: 100%;
	    opacity: 0;
	}
	
	.title_wrap{
		border-bottom:1px solid  @color;
        align-self:stretch;
	.title{
		width:100%;
		border:0;
	    height: 2.4rem;
	    line-height: 2.4rem;
	    background-color: transparent;
	    padding: 0 2%;
	 }
	}
	.cont_wrap{
		  align-self:stretch;
		  position: relative;
		.cont{
	       width:100%;
			 border:0;
			 padding:6px;
		}
		.renum_wrap{
			position: absolute;
			right: 6px;
			bottom: 6px;
			color:#c0c0c0;
		}
	}
	.check_wrap{
		display: flex;
        align-items: center;
	    align-self:left;
	    font-size: 1.2rem;
	    color:@color;
       input{
       	display: inline-block;
	    width: 1.4rem;
	    height: 1.4rem;
       }
       a{
       	border-bottom:1px solid @color;
       margin-left:6px;
       letter-spacing: 1px;
       }
	}
	.com_btn2{
		flex-grow:0;
		height: 3rem;
		line-height: 3rem;
		align-self:stretch;
	}
</style>