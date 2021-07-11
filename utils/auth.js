import store from '../store'
import {
	login
} from './util'
// 初始化store
const initStore = async () => {
	await store.dispatch('load_userinfo')
}

// 检查token
const checkToken = async () => {
	setTimeout(checkToken, 5 * 60 * 1000) // 5分钟检查一次
	// 检查 token 是否有效
	const token = uni.getStorageSync('token') || ''
	const token_expire = uni.getStorageSync('token_expire') || -1

	if (token === '') {
		return
	}

	// token剩余时间 < 320秒
	if ((token_expire - Date.now()) / 1000 < 320) {
		const {
			code
		} = await login()
		const res = await uniCloud.callFunction({
			name: 'checktoken',
			data: {
				code
			}
		})

		const {
			result
		} = res

		if (result && result.code !== 200) {
			uni.showToast({
				title: '网络异常',
				icon: "none"
			})
			return
		}

		uni.setStorageSync('token', result.data.token)
		uni.setStorageSync('token_expire', result.data.token_expire)

		await initStore()
	}
}

export {
	initStore,
	checkToken
}
