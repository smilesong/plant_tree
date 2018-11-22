import {
	SAVE_ATTENTION,
	SAVE_REGIST,
	SAVE_UP,
} from './mutation-types.js'


export default{
	//保存关注公众号FLAG
	[SAVE_ATTENTION](state, newAttention) {
		state.isAttention = newAttention
	},
	//保存注册手机号FLAG
	[SAVE_REGIST](state, newRegist) {
		state.isRegist = newRegist
	},
	////保存上传作品FLAG
	[SAVE_UP](state, newUp) {
		state.isUp = newUp
	},
}