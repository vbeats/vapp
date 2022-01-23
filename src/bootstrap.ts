import Taro from '@tarojs/taro'
import store from './store'
import {AUTH} from './util/api'
import {handleLogin} from './util/auth'

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
    return
  }
  //  access_token有效期>320秒  refresh_token有效期> 2小时
  if (access_token && refresh_token && (access_token_expire - now) / 1000 > 320 && (refresh_token_expire - now) / 1000 > 320) {
    return
  }
  // access_token 过期
  // refresh_token有效时间 >320秒  刷新token
  if ((refresh_token_expire - now) / 1000 > 320) {
    const res = await Taro.cloud.callFunction({
      name: 'auth',
      data: {
        action: 'refresh_token',
        api: AUTH,
        refresh_token,
      },
    })
    const result: any = res.result
    if (result.code === 401) {
      await store.dispatch('logout')
    } else if (result.code === 200) {
      await store.dispatch('auth', result.data)
    }
  } else {
    // 都无效了  重新认证授权  用户超过refresh_token expire(90天) 没有使用
    await handleLogin()
  }
}

export default async () => {
  Taro.cloud.init({
    // @ts-ignore
    env: CLOUD_ENV,
  })

  // 加载用户信息
  await loadUser()
  // 检查token
  await checkToken()
}
