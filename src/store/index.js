import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
const state={
	isAttention:0,//是否关注公众号
	isRegist:0,//是否注册\
	isUp:0//是否已经上传作品
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})