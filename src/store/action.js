/*import {
	getStateInfo//获取是否关注是否注册信息
}from '../service/getData'*/

import {
	SAVE_ATTENTON,//保存否关注
	SAVE_REGIST, //保存注册信息
	SAVE_UP,//保存已经上传作品标识
}from './mutation-types.js'

export default{
	async saveAttention({
		commit,state
	}){
       commit(SAVE_ATTENTION,1)  //commit dispatch两者都可实现效果,参数要改
      //dispatch(SAVE_ATTENTION,1)
	},
	async saveRegist({
		dispatch,commit
	}){
      // commit(SAVE_REGIST,1)
      commit(SAVE_REGIST,1)
	},
	async saveUp({
		commit,state
	}){
      commit(SAVE_UP,1)
	}
}

