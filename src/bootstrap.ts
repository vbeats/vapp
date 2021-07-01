// 初始化资源
import Taro from "@tarojs/taro";
import {requestCloud} from "./util/cloud";
import store from "./store";

// 检查token
const checkToken = async () => {
  // token检查
  setTimeout(await checkToken, 5 * 60 * 1000)

  const user = Taro.getStorageSync('user')
  const access_token = Taro.getStorageSync('access_token') || ''
  const refresh_token = Taro.getStorageSync('refresh_token') || ''
  const access_token_expire = Taro.getStorageSync('access_token_expire') || -1
  const refresh_token_expire = Taro.getStorageSync('refresh_token_expire') || -1
  const now = new Date().getTime()

  if (!user) {
    // 未登录认证过
    return;
  }
  //  access_token有效期>320秒  refresh_token有效期> 2小时
  if (access_token && refresh_token && (access_token_expire - now) / 1000 > 320 && (refresh_token_expire - now) / 1000 > 320) {
    return;
  }
  // access_token 过期
  // refresh_token有效时间 >320秒  刷新token
  if ((refresh_token_expire - now) / 1000 > 320) {
    console.log("刷新了token....")
    requestCloud('auth', {
      action: 'refresh_token',
      api: BASE_URL + '/auth/oauth/token',
      refresh_token
    }, async res => {
      const data = res.data
      await store.dispatch('update_user', data)
    })
  } else {
    // 都无效了  重新认证授权  用户超过30d没有使用
    await store.dispatch('logout')
  }
}


// 初始化vuex中user数据

const loadUser = async () => {
  await store.dispatch('load_user')
}


export default (): void => {
// 初始化云环境, 全局初始化一次
  Taro.cloud.init({
      env: CLOUD_ENV
    }
  )

  checkToken().then()

  loadUser().then()

}
