const login = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			scopes: 'auth_base',
			success: res => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}


export {
	login
}
