import Taro from '@tarojs/taro'
import {showErrorToast} from './msg'
import store from '../store'

const handleLogin = async (userInfo?: object) => {
  Taro.showLoading({title: '处理中~'})
  const rs = await Taro.cloud.callFunction({
    name: 'auth',
    data: {
      action: 'auth',
      // @ts-ignore
      api: BASE_URL + '/auth/oauth2/token',
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

export default handleLogin
