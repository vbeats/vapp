<template>
  <view class="login" v-show="showModal">
    <view class="content">
      <text class="title">您还未登录</text>
      <text class="hint">请先授权登录进行操作</text>
      <image class="logo" src="../../assets/imgs/hot.svg"/>
      <nut-button type="success" size="large" :block="true"
                  shape="square"
                  @tap="login" class="bt-login">微信登录
      </nut-button>
    </view>
    <image src="../../assets/imgs/close.svg" class="close" @tap="closeModal"/>
  </view>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import {useStore} from 'vuex'
import './index.styl'
import {requestCloud} from "../../util/cloud"
import * as toast from '../../util/toast'
import {ref, watchEffect} from "vue";

export default {
  name: 'login',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const showModal = ref()

    // 用户登录认证
    const login = () => {
      Taro.getUserProfile({
        lang: "zh_CN",
        desc: "用户头像与昵称用于完善用户信息",
        success: res => {
          requestCloud(
            'auth',
            {
              action: 'login',
              api: BASE_URL + '/auth/oauth/token',
              cloudId: res.cloudID
            },
            async res => {
              await store.dispatch('update_user', res.data)
            }
          )
        },
        fail: () => {
          toast.fail('用户拒绝授权')
        }
      })
    }

    const closeModal = () => {
      showModal.value = false
    }

    watchEffect(() => {
      showModal.value = props.show
    })

    return {
      login, closeModal, showModal
    }
  }
}
</script>
