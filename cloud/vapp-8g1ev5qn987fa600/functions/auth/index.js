const cloud = require('wx-server-sdk')
const axios = require('./axios')
const config = require('./config')
const encrypt = require('./crypto')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const {tenant_code, platform, server_client_id, server_secret} = config
// 处理用户认证-->access_token  与   刷新token
// 返回res {code:200,msg:'success',data:xxx}
exports.main = async (event, context) => {
  let res = {code: 600, msg: '网络异常'}
  const {action, api} = event

  // -------------------------接口
  try {
    switch (action) {
      case 'auth':
        const {userInfo} = event
        const {OPENID, UNIONID} = cloud.getWXContext()

        // openid + userinfo --> 后端获取token
        res = await axios.post(api, {
          tenant_code,
          client_id: server_client_id,
          secret: server_secret,
          grant_type: 'WECHAT',
          platform,
          wechat: {
            openid: encrypt(OPENID),
            unionid: encrypt(UNIONID),
            nickname: userInfo ? userInfo.userInfo.nickName : '',
            gender: userInfo ? userInfo.userInfo.gender : undefined,
            avatar: userInfo ? userInfo.userInfo.avatarUrl : '',
            province: userInfo ? userInfo.userInfo.province : '',
            country: userInfo ? userInfo.userInfo.country : '',
            city: userInfo ? userInfo.userInfo.city : '',
            iv: userInfo ? userInfo.iv : undefined,
            raw_data: userInfo ? userInfo.rawData : undefined,
            encrypted_data: userInfo ? userInfo.encryptedData : undefined,
            signature: userInfo ? userInfo.signature : undefined,
          },
        })
        break
      case 'bind_phone':
        const {cloudId, access_token} = event
        axios.defaults.headers.Authorization = 'Bearer ' + access_token

        const openData = await cloud.getOpenData({
          list: [cloudId],
        })
        const data = openData.list[0].data
        res = await axios.post(api, {
          phone: encrypt(data.purePhoneNumber),
        })
        break
      case 'refresh_token':
        // 相关参数 ---> 后端获取新的token
        const {refresh_token} = event
        res = await axios.post(api, {
          tenant_code,
          client_id: server_client_id,
          secret: server_secret,
          grant_type: 'REFRESH_TOKEN',
          platform,
          refresh_token,
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
