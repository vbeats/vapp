<template>
  <view class="index">
    <navigation>首页</navigation>
    <Login/>
    <button :style="{marginTop:'200rpx'}" @tap="showLogin">点击登录</button>
    <nut-button type="primary">主要按钮</nut-button>
    <button open-type="getPhoneNumber" type="primary" @getphonenumber="bindPhone">绑定手机</button>
  </view>
</template>

<script lang="ts" setup>
import Login from "../../components/login/index.vue";
import {useStore} from "vuex";
import "./index.styl";
import Navigation from "../../components/navigation/index.vue";
import {showErrorToast} from "../../util/msg";
import _ from "lodash";
import {handleBindPhone} from "../../util/auth";

const store = useStore();

const showLogin = async () => {
  await store.dispatch("toggle_login");
};

const bindPhone = async (e: any) => {
  const param = e.detail
  if (!param.cloudID || param.cloudID === '') {
    showErrorToast("手机号获取失败")
    return
  }

  await _.debounce(handleBindPhone, 180, {maxWait: 800})(param.cloudID);
}

</script>
