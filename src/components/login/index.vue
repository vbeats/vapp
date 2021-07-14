<template>
  <view class="login" v-show="show">
    <view class="content">
      <text class="title">您还未登录</text>
      <text class="hint">请先授权登录进行操作</text>
      <image class="logo" src="../../assets/images/hot.svg"/>
      <button @tap="login" class="bt-login" type="primary">微信登录
      </button>
    </view>
    <image src="../../assets/images/close.svg" class="close" @tap="closeModal"/>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import {ref, watchEffect} from "vue"
import {showErrorToast} from "../../util/taroUtil"
import {useStore} from "vuex"
import './index.styl'
import _ from "lodash";

export default {
  name: 'login',
  setup() {
    const store = useStore()
    const show = ref(false)
    const wechatCode = ref('')

    // 用户登录认证
    const login = () => {
      Taro.getUserProfile({
        lang: "zh_CN",
        desc: "用户头像与昵称用于完善用户信息",
      }).then(async userInfo => {
        await _.debounce(handleLogin, 180, {maxWait: 800})(userInfo)
      }).catch(() => showErrorToast('用户拒绝授权'))
    }

    const handleLogin = async (userInfo: object) => {
      Taro.showLoading({title: '处理中~'})
      const rs = await Taro.cloud.callFunction({
        name: 'auth',
        data: {
          action: 'login',
          api: BASE_URL + '/auth/oauth/token',
          code: wechatCode.value,
          userInfo
        }
      })
      Taro.hideLoading()
      const result: any = rs.result
      if (result.code !== 200) {
        showErrorToast(result.msg)
        // 重新获取code
        const {code} = await Taro.login()
        wechatCode.value = code
        return
      }
      await store.dispatch('update_user', result.data)
    }

    const closeModal = async () => {
      await store.dispatch('toggle_login')
    }

    watchEffect(async () => {
      const {user} = store.getters.getUserInfo
      show.value = user.showLogin || false
      if (show.value) {
        // login获取code, 有效时间5分钟
        await getCode()
      }
    })

    const getCode = async () => {
      setTimeout(getCode, 4 * 60 * 1000) // 4分钟一次
      if (!show.value) {
        return
      }
      const {code} = await Taro.login()
      wechatCode.value = code
    }

    return {
      login, closeModal, show
    }
  }
}
</script>
