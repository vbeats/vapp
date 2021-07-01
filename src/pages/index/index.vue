<template>
  <view class="index">
    dahduawhdwaudadwa
    index
    <button @tap="test">dddd</button>
    <login :show="!user||!user.access_token"/>
  </view>
</template>

<script lang="ts">
import {toRaw} from 'vue'
import {useStore} from 'vuex'
import login from '../../components/login/index.vue'
import './index.styl'

export default {
  name: 'index',
  components: {login},
  setup() {
    const store = useStore()
    const user = toRaw(store.getters.getUserInfo).user || null

    const test = () => {
      console.log('test...')
    }

    return {
      user,
      test
    }
  }
}
</script>
