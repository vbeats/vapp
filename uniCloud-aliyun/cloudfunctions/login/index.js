'use strict';
const uniId = require('uni-id')
const db = uniCloud.database()
const data = {
	code: 200,
	msg: 'success'
}

exports.main = async (event, context) => {
	try {
		const {
			code,
			userInfo
		} = event

		console.log("用户登录 : code ", code, " 用户信息: ", JSON.stringify(userInfo))
		const res = await uniId.loginByWeixin({
			code
		})

		const {
			token,
			tokenExpired,
			msg,
			uid,
			openid
		} = res

		data.code = res.code === 0 ? 200 : 401
		data.msg = msg

		if (data.code === 200) {
			// user 集合是否存在此用户, 不存在新增, 存在更新
			const record = {
				nickname: userInfo.nickName,
				user_id: uid,
				openid,
				avatar: userInfo.avatarUrl,
				country: userInfo.country,
				province: userInfo.province,
				city: userInfo.city,
				gender: userInfo.gender,
				status: 0,
				update_time: Date.now()
			}
			const userCollection = db.collection('user')
			const user = await userCollection.where({
				user_id: uid
			}).get()

			if (user.data.length === 1) {
				await userCollection.where({
					_id: user.data[0]._id
				}).update(record)
			} else {
				await userCollection.add(record)
			}

			data.data = {
				token,
				token_expire: tokenExpired,
				userInfo
			}
		}
	} catch (err) {
		console.error(err)
		data.code = 401
		data.msg = "登录异常"
	}
	return data
};
