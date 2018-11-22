<template>
	<div class="worklist_wrap">
		<ul  v-if="workListArray.length">
			<li class="work_li" v-for="(item,index) in workListArray">
				<div class="work_header">
					<div class="avatar"><img :src="require('../../images/'+ item.nickPic)" /></div>
					<div class="header_right">
						<div class="name">{{item.nickName}}</div>
						<div class="time">{{item.creatDate}}</div>
					</div>
					<div class="work_id"><span>ID</span><span>{{item.id}}</span></div>
				</div>
				<div class="work_content">
					<p class="work_text">{{item.picStory}}</p>
					<div class='work_image'>
						<!-- <img :src="imgBaseUrl + item.picUrl" /> -->
						<img :src="require('../../images/' + item.picUrl)" />
					</div>
				</div>
				<div class="work_footer">
					<div class="work_footer_in"><span class="icon-like"  v-on:click="$emit('zanCN')" :class="{zan_color:item.isLike}"></span><span class="number">{{item.likeCounts}}</span></div>
					<div @click="informCN(item.id)" class="work_footer_in"><span class="icon-warning"></span><span>举报</span></div>
					
				</div>
			</li>
		</ul>
		 <!-- tips -->
		    <alert   :alert-flag="isAlertFlag"  :cxt="alertCxt" v-on:onTap="changeAlert">
		    </alert> 
		<!--  inform -->
		<transition name="fade">
			<section    v-if="informFlag" class="inform_wrap" >
				<div class="inform_wrap_in">
					<h1>是否举报</h1>
					<p>本图片是如下哪种非法违规图片</p>
					<ul class="inform_choice">
						<li v-for="(item,index) in informItems" >
					        <input   type="checkbox"   :id="index" :value="index" v-model="informArr">
					        <label :for="index">{{item}}</label>
						</li>
					</ul>
					<span v-if="tipsInform">请选择你要举报的内容</span>
					<div class="inform_btn_wrap"><span @click="closeInform">否，误点</span><span @click="letInform">是,我要举报</span></div>
				</div>
			</section>
		</transition>

	</div>
</template>

<script>
import {workList,informAction} from 'src/service/getData'
import alert from '../../components/common/alert'
import {imgBaseUrl} from 'src/config/env'
export default{
	data(){
		return {
  		 workListArray:[],//作品列表
  		 imgBaseUrl:imgBaseUrl,
  		 informFlag:false,
  		 informItems:["涉黄","暴力","广告","涉政","其他"],
  		 select:0,
  		 informArr:["0"],//举报的内容0~4分别代表5项内容,
  		 id:0,//作品id
  		 isAlertFlag:false,
         alertCxt:"",
         tipsInform:0
  		}
  	},
  	props:['zanFlag'],
  	computed:{

  	},
  	watch:{
  		zanFlag:'initData',
  	},
  	mounted(){
  		this.initData();
  		 console.log("kkkkkkk-----------kkkkkkkkkk");
         console.log(this.imgBaseUrl)
  		// this.informFlag.b=1;
  		// this.$set(this.informFlag,"b",1);
  	},
  	components:{
        alert
     },
  	methods:{
  		async initData(){
  			//获取作品列表数据  async 
  			/* 方法1 使用fetch 时的写法*/
      /* let response= await workList().then(res=>{
       	 this.workListArray=[...res];
        	console.log(res) // => '更新完成'
       }).catch(
       	reason=> console.log(reason.message)
       	); */

       /* 方法2 使用axios 时的写法*/
       let response= await workList().then(res=>{
       	 this.workListArray=[...res.data];
        	console.log(res) // => '更新完成'
       }).catch(
       	reason=> console.log(reason.message)
       	);

       
      /* this.$nextTick(function () {
       	console.log(this.zanFlag) // => '更新完成'
      })*/
      
   },
   informCN(id){  //举报弹窗出现
   	this.informFlag=true;
   	this.id=id;
   	console.log(this.id)
   },
   closeInform(){
   	 this.informArr=["0"];//重置举报内容为默认
   	 this.informFlag=false;
   },
  async  letInform(){ //提交举报.以数组的形式提交举报的内容.
    if(this.informArr.length>0){
    	this.tipsInform=0;
    let res=await informAction({reportInfo:this.informArr,reportPicNo:this.id});
      if(res.returnCode="0000"){
      	this.informFlag=false;
       this.isAlertFlag=true;//点赞失败给提示
       this.alertCxt="举报成功";
       this.informArr=["0"];
      }
       
    }else{
       this.tipsInform=1;
    }
   },
   /*提示框*/
      changeAlert(){
        this.isAlertFlag=false;
       }
	}
}
</script>

<style lang="less" scoped>

@color1:#dadada;
@color2:#FAEDBD;
@color3:#BF5102;
@color4:#EFD076;
@color5:#F8F1DB;
@color6:#D98613;
@pad1:10px;
.selected{
	background-color:@color4
}
.flex_a{
	display: flex;
	flex-direction: row;
}
.zan_color,.zan_color2{
	color:@color3;
}
/* .zan_color2{
	color:rgb(162, 70, 4);
	} */
	.work_li{
		background-color: #fff;
		margin: @pad1;
		box-shadow: none;
		border-radius: 4px;
		.work_header{
			.flex_a;
			padding:@pad1;
			.avatar{
				width:4rem;
				height: 4rem;
				border-radius:4px;
				overflow:hidden;
				margin-right:@pad1;
				img{
					width:4rem;
					height: 4rem;
				}
			}
			.header_right{
				.flex_a;
				flex-direction: column;
				justify-content: space-around;
				.name{
					font-size: 1.2rem;
					color:#D98613
				}
			}
			.work_id{
              flex: 1;
		    text-align: right;
		    font-size: 1.2rem;
		    letter-spacing: 1px;
		    color:#D98613;
			}
		}
		.work_content{
			border-top:1px solid @color2;
			border-bottom:1px solid @color2;
			padding:@pad1; 
		}
		.work_text{
			margin:@pad1 0;
			font-size: 1.2rem;
			text-align: justify;
		}
		.work_footer{
			.flex_a;
			justify-content: space-between;
			text-align:center;
			font-size:1.4rem;
			padding:@pad1*2;

		/* .noz_color{
		   color:#F4DFB4;
		   } */
		   .work_footer_in{
		   	.flex_a;
		   	flex-direction: row;
		   	align-items: center;
		   	color:#D98613;
		   	[class^="icon"]{
		   		margin-right:@pad1;
		   	}
		   }
		}

	}
	.inform_wrap_in{
		.flex_a;
		flex-direction:column;
		justify-content: space-between;
		overflow: hidden;
		padding: 1.2rem 0px 0px;
		h1{
			font-size: 1.7rem;
			font-weight: bold;
		}
		.inform_btn_wrap{
			.flex_a;
			justify-content: space-around;
			align-items: stretch;
			border-top: 1px solid #EBCAB2;
			width: 100%;
			height: 4rem;
			span{
				flex-basis:50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			span:hover{
              background-color: @color5;
			}
			span:nth-of-type(2){
				border-left:1px solid #EBCAB2;
			}
		}
	}
	.inform_choice{
		.flex_a;
		justify-content:space-around;
		width: 100%;
		li{
			/* border:1px solid @color4;
			border-radius:1rem;
			padding:2px 10px; */
			input{
				display: none;
			}
			label{
			    width: 100%;
			    height: 100%;
			    display: inline-block;
			    border: 1px solid @color4;
			    padding: 2px 10px;
			    border-radius: 1rem;
			}
			input:checked+label{
				background-color: @color4;
			}
		}
		/* li:hover{
			background-color: @color4;
		} */
	}
	</style>