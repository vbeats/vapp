import Taro from '@tarojs/taro'
import {showErrorToast} from './msg'
import store from '../store'
import {AUTH, BIND_PHONE} from './api'

const handleLogin = async (userInfo?: object) => {
  Taro.showLoading({title: '处理中~'})
  const rs = await Taro.cloud.callFunction({
    name: 'auth',
    data: {
      action: 'auth',
      api: AUTH,
      userInfo,
    },
  })
  Taro.hideLoading()
  const result: any = rs.result
  if (result.code !== 200) {
    showErrorToast(result.msg)
    return
  }
  await store.dispatch('auth', result.data)
  if (userInfo) {
    await store.dispatch('update_user', userInfo)
  }
}

const handleBindPhone = async (cloudId: string) => {
  Taro.showLoading({title: '处理中~'})
  const rs = await Taro.cloud.callFunction({
    name: 'auth',
    data: {
      action: 'bind_phone',
      api: BIND_PHONE,
      cloudId,
      access_token: store.getters.getUserInfo.access_token,
    },
  })
  Taro.hideLoading()
  const result: any = rs.result
  if (result.code !== 200) {
    showErrorToast(result.msg)
    return
  }
  await store.dispatch('update_user', {phone: result.data})
}

export {handleLogin, handleBindPhone}
