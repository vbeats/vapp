<template>
  <navigation>index页面</navigation>
  <view class="index">
    <login/>
    <button @tap="showLogin" :style="{marginTop:'200rpx'}">点击登录</button>
  </view>
</template>

<script lang="ts">
import login from '../../components/login/index.vue'
import {useStore} from 'vuex'
import './index.styl'
import Navigation from "../../components/navigation/index.vue";

export default {
  name: 'index',
  components: {Navigation, login},
  setup() {
    const store = useStore()

    const showLogin = async () => {
      await store.dispatch('toggle_login')
    }

    return {showLogin}
  }
}
</script>
