const cloud = require('wx-server-sdk')
const axios = require('./axios')
const config = require('./config')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const {tenant_code, platform, server_appid, server_secret, login_type, refresh_token_type} = config
// 处理用户认证-->access_token  与   刷新token
// 返回res {code:200,msg:'success',data:xxx}
exports.main = async (event, context) => {

  let res = {code: 600, msg: '网络异常'}
  const {OPENID, APPID, CLIENTIP} = cloud.getWXContext()
  // 用户风险等级
  let risk_rank = 0
  try {
    const {errCode, riskRank} = await cloud.openapi.riskControl.getUserRiskRank({
      appid: APPID,
      openid: OPENID,
      scene: 0,
      clientIp: CLIENTIP,
      isTest: true
    })
    if (errCode === 0) {
      risk_rank = riskRank
    }
  } catch (err) {
    console.error("用户风控接口异常: ", err)
  }

  // -------------------------接口
  try {
    const {action, api} = event

    switch (action) {
      case 'login':
        const {code, userInfo} = event
        // code + userinfo --> 后端获取token
        // http 请求
        res = await axios.post(api + `?appid=${server_appid}&secret=${server_secret}`, {
          tenant_code, type: login_type, platform,
          wechat: {
            code,
            nickname: userInfo.userInfo.nickName || '',
            gender: userInfo.userInfo.gender,
            avatar: userInfo.userInfo.avatarUrl || '',
            province: userInfo.userInfo.province || '',
            country: userInfo.userInfo.country || '',
            city: userInfo.userInfo.city || '',
            iv: userInfo.iv,
            raw_data: userInfo.rawData,
            encrypted_data: userInfo.encryptedData,
            signature: userInfo.signature,
            risk_rank
          }
        })
        break
      case 'refresh_token':
        // 相关参数 ---> 后端获取新的token
        const {refresh_token} = event
        res = await axios.post(api + `?appid=${server_appid}&secret=${server_secret}`, {
          tenant_code, type: refresh_token_type, platform, refresh_token
        })
        break
      default:
        res = {code: 403, msg: '参数错误'}
    }
  } catch (err) {
    console.error('云函数执行异常.....', err)
  }
  return res
}
