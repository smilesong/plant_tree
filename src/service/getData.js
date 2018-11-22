 import fetch from '../config/fetch'
 import axios from  'axios';
 import {jsonBaseUrl} from 'src/config/env'

// import workListJson  from  '../json/getPhotographsBySortType.json'

/**
 * 获取work作品列表
 */
/* import Vue from 'vue'
 import VueResource from 'vue-resource' 

Vue.use(VueResource)*/
/*获取作品列表*/
export const workList = () => {
	let data={};
	  //return fetch("/json/getPhotographsBySortType.json", data);
	return axios.get(jsonBaseUrl+"/getPhotographsBySortType",{params:{}})
};

/**
 * 获取用户信息
 */

// export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});


/* 获取注册状态和是否关注*/
export const   getStateInfo=()=>{
   let data={};
	return fetch(jsonBaseUrl+"/stateInformation", data)
}

/*获取短信验证码*/

export const mobileCode = phone => {
	let data={mobile: phone};
	 console.log(jsonBaseUrl)
	return fetch('/json/getVerifyCode', data)
};


/*点赞*/

export const zanResult= (operateType) =>{
	// let data={operateType:operateType};
	 let data={};
	return fetch(jsonBaseUrl+'/saveOrUpdatePhotographsInfo', data)
}

/*举报*/
export const informAction= ({reportInfo,reportPicNo}) =>{//举报内容，作品编号
	// let data={operateType:operateType};
	 let data={reportInfo:reportInfo,reportPicNo:reportPicNo};
	return fetch(jsonBaseUrl+'/savePhotograpReport', data)
}