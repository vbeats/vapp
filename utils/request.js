const URL = 'http://192.168.100.80:8088'

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
				resolve(res)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}

export default request
