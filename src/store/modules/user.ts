import Taro from '@tarojs/taro'
import {mapToState} from '../../util/util'

const state: any = {
  // username: '',
  // avatar: '',
  // gender: 0,
  // phone: '',
  // access_token: '',
  // refresh_token: '',
  // expire: 0
  showLogin: false,
}

const defaultUser = {showLogin: false}

const user: any = {
  // localstorage 用户信息加载到vuex中
  load_user: (state: any): void => {
    const user = Taro.getStorageSync('user') || {...defaultUser}
    mapToState(user, state)
  },
  // 用户信息
  update_user: (state: any, userInfo: any): void => {
    mapToState(userInfo.userInfo, state)
    Taro.setStorageSync('user', userInfo.userInfo)
  },
  // 用户认证 || refresh_token
  auth: (state: any, data: any): void => {
    const now = new Date().getTime()
    mapToState(data, state)
    state.showLogin = false
    Taro.setStorageSync('access_token', data.access_token)
    Taro.setStorageSync('refresh_token', data.refresh_token)
    Taro.setStorageSync('access_token_expire', now + 7200 * 1000)
    Taro.setStorageSync('refresh_token_expire', now + 7776000 * 1000) // 90天
  },
  // 清除用户信息
  logout: (state: any): void => {
    mapToState(defaultUser, state)
    Taro.removeStorageSync('user')
    Taro.removeStorageSync('access_token')
    Taro.removeStorageSync('refresh_token')
    Taro.removeStorageSync('access_token_expire')
    Taro.removeStorageSync('refresh_token_expire')
  },
  // 显示/隐藏登录组件
  toggle_login: (state: any): void => {
    state.showLogin = !state.showLogin
  },
}

export default {
  state,
  mutations: user,
}
