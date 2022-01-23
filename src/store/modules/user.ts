import Taro from '@tarojs/taro'
import {mapToState} from '../../util/util'

const state: any = {
  showLogin: false,
}

const defaultUser = {showLogin: false}

const user: any = {
  // localstorage 用户信息加载到vuex中
  load_user: (state: any): void => {
    const user = Taro.getStorageSync('user') || {...defaultUser}
    mapToState({...user}, state)
  },
  // 用户信息
  update_user: (state: any, userInfo: any): void => {
    let user = Taro.getStorageSync('user') || {...defaultUser}
    if (userInfo.userInfo) {
      user = {...user, ...userInfo.userInfo}
    }

    if (userInfo.phone) {
      user = {...user, phone: userInfo.phone}
    }

    mapToState(user, state)
    Taro.setStorageSync('user', {...state})
  },
  // 用户认证 || refresh_token
  auth: (state: any, data: any): void => {
    const now = new Date().getTime()
    data.access_token_expire = now + 7200 * 1000
    data.refresh_token_expire = now + 7776000 * 1000 // 90天

    mapToState(data, state)
    state.showLogin = false
    Taro.setStorageSync('user', {...state})
  },
  // 清除用户信息
  logout: (state: any): void => {
    mapToState(defaultUser, state)
    Taro.removeStorageSync('user')
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
