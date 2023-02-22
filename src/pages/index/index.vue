<template>
  <view class="index">

    <nut-button type="success" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">按一下</nut-button>

    {{ phone }}
  </view>
</template>

<script lang="ts" setup>
import {useUserStore} from "../../store/user"
import Taro from "@tarojs/taro";
import {bindPhone} from "../../util/auth";
import {computed} from "vue";

const userStore = useUserStore()

const phone = computed(() => userStore.phone)

// 获取用户手机号
const getPhoneNumber = async (e: any) => {
  const code = e.detail?.code || ''
  if (code) {
    await bindPhone(code)
  } else {
    Taro.showModal({
      title: '用户未授权',
      content: e.detail.errMsg
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
