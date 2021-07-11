<template>
	<view>
		<u-navbar back-text="返回" title="index页面" :background="{ backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))' }"></u-navbar>
		index....
		<view @click="login">登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},

	onLoad() {},
	methods: {
		login() {
			uni.navigateTo({
				url: '../sub/login/login'
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
