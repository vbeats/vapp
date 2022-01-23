<template>
  <view v-show="show" class="login">
    <view class="content">
      <text class="title">您还未登录</text>
      <text class="hint">请先授权登录进行操作</text>
      <image class="logo" src="../../assets/img/hot.svg"/>
      <button class="bt-login" type="primary" @tap.stop="login">微信登录
      </button>
    </view>
    <image class="close" src="../../assets/img/close.svg" @tap="closeModal"/>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import {showErrorToast} from "../../util/msg";
import {useStore} from "vuex";
import _ from "lodash";
import {ref, watchEffect} from "vue";
import "./index.styl";
import {handleLogin} from "../../util/auth";

const store = useStore();
const show = ref(false);

// 用户登录认证
const login = async () => {
  Taro.getUserProfile({
    lang: "zh_CN",
    desc: "用户头像与昵称用于完善用户信息"
  }).then(async userInfo => {
    await _.debounce(handleLogin, 180, {maxWait: 800})(userInfo);
  }).catch(() => showErrorToast("用户拒绝授权"));
};

const closeModal = async () => {
  await store.dispatch("toggle_login");
};

watchEffect(async () => {
  const user = store.getters.getUserInfo;
  show.value = user.showLogin || false;
});
</script>
