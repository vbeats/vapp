<template>
  <view class="index">
    <navigation>首页</navigation>
    <Login />
    <button @tap="showLogin" :style="{marginTop:'200rpx'}">点击登录</button>
    <nut-button type="primary">主要按钮</nut-button>
  </view>
</template>

<script lang="ts" setup>
import Login from "../../components/login/index.vue";
import { useStore } from "vuex";
import "./index.styl";
import Navigation from "../../components/navigation/index.vue";

const store = useStore();

const showLogin = async () => {
  await store.dispatch("toggle_login");
};


</script>
