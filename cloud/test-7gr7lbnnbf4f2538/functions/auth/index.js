const cloud = require('wx-server-sdk')
const axios = require('./axios')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// --------------------服务端配置信息----------------------
const tenant_code = 'V00000000001'
const server_appid = 'wechat'
const server_secret = 'a135ec07-6eb2-4300-840a-9977dd8c813c'
// -----------------------------------------------------

// 处理用户认证-->access_token  与   刷新token
// 返回res {code:200,msg:'success',data:xxx}
exports.main = async (event, context) => {
  console.log(event, context)
  let response = {code: 500, msg: '网络异常'}
  let res

  try {
    const {OPENID} = cloud.getWXContext()
    const {action, api} = event

    switch (action) {
      case 'login':
        const userInfo_openData = await cloud.getOpenData({
          list: [event.cloudId]
        })

        // openid + userinfo --> 后端获取token
        const userInfo = userInfo_openData.list[0].data
        // http 请求
        res = await axios.post(api + '?appid=' + server_appid + "&secret=" + server_secret, {
          tenant_code, type: 3, platform: 2,
          wechat: {
            openid: OPENID,
            nickname: userInfo.nickName,
            gender: userInfo.gender,
            avatar: userInfo.avatarUrl,
            province: userInfo.province,
            country: userInfo.country,
            city: userInfo.city
          }
        })
        response = res.data
        break
      case 'refresh_token':
        // 相关参数 ---> 后端获取新的token
        const {refresh_token} = event
        res = await axios.post(api + '?appid=' + server_appid + "&secret=" + server_secret, {
          tenant_code, type: 0, platform: 2, refresh_token
        })
        response = res.data
        break
      default:
        response = {code: 401, msg: '参数错误'}
    }
  } catch (err) {
    console.error('云函数执行异常.....', err)
    response = {code: 401, msg: '参数错误'}
  }
  return response
}
