<script lang="ts" setup>
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app"
import {checkToken, clearTimer} from "@/util/auth"
import bootstrap from "@/bootstrap"

onLaunch(() => {
  console.log("App Launch")
})

onShow(async () => {
  console.log("App Show")

  // 加载 storage cache
  await bootstrap()
  // 检查token
  await checkToken()
})

onHide(() => {
  console.log("App Hide")
  // 停止定时器
  clearTimer()
})

</script>

<style lang="stylus">
/* #ifdef APP-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */
</style>
