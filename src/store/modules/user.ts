import Taro from "@tarojs/taro";

const state: any = {
  user: {
    // username: '',
    // avatar: '',
    // gender: 0,
    // phone: '',
    // access_token: '',
    // refresh_token: '',
    // expire: 0
    showLogin: false
  }
}

const user: any = {
  // localstorage 用户信息加载到vuex中
  load_user: (state: any): void => {
    state.user = Taro.getStorageSync('user') || {showLogin: false}
  },
  // update vuex & storage用户信息
  update_user: (state: any, userInfo: any): void => {
    const now = new Date().getTime()
    state.user = {...userInfo, showLogin: false}
    Taro.setStorageSync('user', userInfo)
    Taro.setStorageSync('access_token', userInfo.access_token);
    Taro.setStorageSync('refresh_token', userInfo.refresh_token);
    Taro.setStorageSync('access_token_expire', now + 7200 * 1000);
    Taro.setStorageSync('refresh_token_expire', now + userInfo.expire * 1000);
  },
  // 清除用户信息
  logout: (state: any): void => {
    state.user = {showLogin: false}
    Taro.removeStorageSync('user')
    Taro.removeStorageSync('access_token')
    Taro.removeStorageSync('refresh_token')
    Taro.removeStorageSync('access_token_expire')
    Taro.removeStorageSync('refresh_token_expire')
  },
  // 显示/隐藏登录组件
  toggle_login: (state: any): void => {
    state.user.showLogin = !state.user.showLogin
  }
}

export default {
  state,
  mutations: user,
}
