// 初始化资源
import Taro from "@tarojs/taro";
import store from "./store";

// 初始化vuex中user数据
const loadUser = async () => {
  await store.dispatch('load_user')
}

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
    const res = await Taro.cloud.callFunction({
      name: 'auth',
      data: {
        action: 'refresh_token',
        api: BASE_URL + '/auth/oauth/token',
        refresh_token
      }
    })
    const result: any = res.result
    if (result.code === 401) {
      await store.dispatch('logout')
    } else if (result.code === 200) {
      await store.dispatch('update_user', result.data)
    }
  } else {
    // 都无效了  重新认证授权  用户超过refresh_token expire 没有使用
    await store.dispatch('logout')
  }
}

export default (): void => {
// 初始化云环境, 全局初始化一次
  Taro.cloud.init({
      env: CLOUD_ENV
    }
  )

  loadUser().then()

  checkToken().then()

}
