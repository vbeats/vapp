import request from '../utils/request'
import store from '../store'
// 获取用户信息 token
export function getToken(userInfo) {
	if (!checkUserInfo(userInfo)) {
		uni.showToast({
			title: '用户拒绝授权',
			image: '/static/imgs/error.png',
			duration: 2000
		})
		return
	}

	// 1. 用户是否授权
	// 2. 校验用户登录态 checkSession?  不校验了  防止code与server端session_key同时无效
	// 3. reLogin--> code+userInfo-->server(session_key,openid-->解密数据)-->更新user信息--->返回自定义token
	// 4. localStorage更新token userInfo

	uni.login({
		success: (res) => {
			uni.getUserInfo({
				provider: 'weixin',
				withCredentials: true,
				lang: 'zh_CN',
				success: (userInfoRes) => {
					handleAuth(res.code, userInfoRes)
				},
				fail: () => {
					uni.showToast({
						title: '用户授权已取消',
						image: '/static/imgs/error.png',
						duration: 2000
					})
				}
			})
		}
	})
}

function checkUserInfo(userInfo) {
	if (!userInfo || !userInfo.detail.userInfo) {
		return false
	}
	return true
}

export function handleAuth(code, userInfo) {
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
	const user = userInfo.userInfo
	const params = {
		code,
		nick_name: user.nickName,
		gender: user.gender,
		country: user.country,
		city: user.city,
		province: user.province,
		avatar_url: user.avatarUrl,
		signature: userInfo.signature,
		raw_data: userInfo.rawData,
		iv: userInfo.iv,
		encrypted_data: userInfo.encryptedData,
	}

	request('/auth/oauth/token?appid=wechat&secret=a135ec07-6eb2-4300-840a-9977dd8c813c', {
		'tenant_code': '000000',
		'type': 3,
		'platform': 1,
		'wechat': params
	}).then(res => {
		// 更新 storage user access_token refresh_token 有效时间
		if (res.data && res.data.code === 200) {
			const data = res.data.data
			store.dispatch('updateUser', data)
			uni.setStorageSync('user', data)
			uni.setStorageSync('access_token', data.access_token)
			uni.setStorageSync('refresh_token', data.refresh_token)
			uni.setStorageSync('access_token_expire', new Date().getTime() + 7200 * 1000)
			uni.setStorageSync('refresh_token_expire', new Date().getTime() + 20 * 24 * 3600 * 1000)
		}
	}).catch(() => {
		uni.showToast({
			title: '数据请求失败',
			image: '/static/imgs/error.png',
			duration: 2000
		})
	})
}
