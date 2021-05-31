const URL = 'http://localhost:8080'

const TOKEN = uni.getStorageSync('access_token') || ''

function request(path, params, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: URL + path,
			data: params,
			method: 'POST',
			header: {
				'token': TOKEN,
			},
			timeout: 6000,
			success: (res) => {
				if (res.data && res.data.code && res.data.code === 200) {
					resolve(res)
				} else {
					uni.showToast({
						title: '数据请求失败',
						image: '/static/imgs/error.png',
						duration: 2000
					})
					reject(res.data && res.data.msg ? res.data.msg : '接口请求异常')
				}
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

export default request
