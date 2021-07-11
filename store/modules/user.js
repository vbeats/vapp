const state = {
	userinfo: undefined,
	token: '', // uni id token
	token_expire: -1
}

const user = {
	load_userinfo(state) {
		const token = uni.getStorageSync('token') || ''
		const token_expire = uni.getStorageSync('token_expire') || -1
		const userinfo = uni.getStorageSync('userinfo') || undefined
		state.userinfo = userinfo
		state.token = token
		state.token_expire = token_expire
	},
	login: async (state, {
		code,
		userInfo
	}) => {
		const res = await uniCloud.callFunction({
			name: 'login',
			data: {
				code,
				userInfo
			}
		})

		const {
			result
		} = res

		if (result.code !== 200) {
			uni.showToast({
				title: result.msg || "通信异常",
				icon: "none"
			})
			return
		}
		state.token = result.data.token
		state.token_expire = result.data.token_expire
		state.userinfo = result.data.userInfo
		uni.setStorageSync('token', result.data.token)
		uni.setStorageSync('token_expire', result.data.token_expire)
		uni.setStorageSync('userinfo', result.data.userInfo)
	}
}

export default {
	state,
	mutations: user
}
