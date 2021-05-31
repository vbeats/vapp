import request from '../utils/request'
import store from '../store'
// 获取用户信息 token
export function handleAuth(code, user) {
	if (!code || code === '') {
		uni.showToast({
			title: 'code获取失败',
			image: '/static/imgs/error.png',
			duration: 2000
		})
		return
	}
	// 3. reLogin--> code+userInfo-->server(session_key,openid-->解密数据)-->更新user信息--->返回自定义token
	// 4. localStorage更新token userInfo
	const params = user && user.userInfo ? {
		code,
		nick_name: user.userInfo.nickName,
		gender: user.userInfo.gender,
		country: user.userInfo.country,
		city: user.userInfo.city,
		province: user.userInfo.province,
		avatar_url: user.userInfo.avatarUrl,
		signature: user.signature,
		raw_data: user.rawData,
		iv: user.iv,
		encrypted_data: user.encryptedData,
	} : {
		code
	}

	request('/auth/oauth/token?appid=wechat&secret=a135ec07-6eb2-4300-840a-9977dd8c813c', {
		'tenant_code': 'V00000000001',
		'type': 3,
		'platform': 1,
		'wechat': params
	}).then(res => {
		// 更新 storage user access_token refresh_token 有效时间
		const data = res.data.data
		store.dispatch('updateUser', data)
		uni.setStorageSync('user', data)
		uni.setStorageSync('access_token', data.access_token)
		uni.setStorageSync('refresh_token', data.refresh_token)
		uni.setStorageSync('access_token_expire', new Date().getTime() + 7200 * 1000)
		uni.setStorageSync('refresh_token_expire', new Date().getTime() + 20 * 24 * 3600 * 1000)
	})
}
