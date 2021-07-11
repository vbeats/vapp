<template>
	<view>
		<!-- 登录组件 -->
		<login :show="!getUserInfo.userinfo || getUserInfo.token == ''"></login>
		<u-navbar back-text="返回" title="index页面" :background="{ backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))' }"></u-navbar>
		index....
	</view>
</template>

<script>
import store from '../../store';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['getUserInfo'])
	},
	onLoad() {},
	methods: {},
	mounted() {}
};
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
