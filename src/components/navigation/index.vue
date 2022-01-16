<template>
  <view class="navigation" :style="navStyle">
    <view class="back" @tap="back" v-if="showBack">
      <image src="../../assets/img/back.svg" class="back-img" :style="backStyle" />
      <text class="text">{{ backText }}</text>
    </view>
    <view class="title">
      <slot />
    </view>
  </view>
  <view class="block" :style="navStyle"></view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro";
import "./index.styl";

export default {
  name: "navigation",
  props: {
    color: {
      type: String,
      required: false,
      default: "linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))"
    },
    backText: {
      type: String,
      required: false,
      default: "返回"
    },
    showBack: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const { top, height } = Taro.getMenuButtonBoundingClientRect();

    const navStyle = {
      height: top + height + "px",
      background: props.color,
      paddingBottom: "20px"
    };

    const backStyle = {
      width: height / 5 * 3 + "px",
      height: height / 5 * 3 + "px"
    };

    const back = () => {
      Taro.navigateBack();
    };

    return {
      navStyle, backStyle, back
    };
  }
};
</script>
