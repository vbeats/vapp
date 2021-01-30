import request from '../utils/request'
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
			handleAuth(res.code, userInfo)
		}
	})
}

function checkUserInfo(userInfo) {
	if (!userInfo || !userInfo.detail.userInfo) {
		return false
	}
	return true
}

function handleAuth(code, userInfo) {
	console.log(code, userInfo)
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
	const user = userInfo.detail
	const params = {
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
	}

	request('/auth/oauth?appid=wechat&secret=a135ec07-6eb2-4300-840a-9977dd8c813c', {
		'wechat': params
	}).then(res => {
		console.log(res)
	}).catch(() => {
		uni.showToast({
			title: '数据请求失败',
			image: '/static/imgs/error.png',
			duration: 2000
		})
	})
}
