'use strict';
const uniId = require('uni-id')
const data = {
	code: 200,
	msg: 'success'
}
exports.main = async (event, context) => {
	const {
		code
	} = event

	try {
		const res = await uniId.loginByWeixin({
			code
		})

		const {
			token,
			tokenExpired,
			msg,
		} = res

		data.code = res.code === 0 ? 200 : 401
		data.msg = msg
		data.data = {
			token,
			token_expire: tokenExpired
		}
	} catch (err) {
		console.error(err)
		data.code = 600
		data.msg = "微信登录异常"
	}

	return data
};
