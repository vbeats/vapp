<template>
	<u-mask :show="true" :mask-click-able="false">
		<u-toast ref="uToast" />
		<view class="warp">
			<view class="login" @tap.stop @click.stop>
				<view class="title">您还未登录</view>
				<view class="sub-title">请先授权登录进行操作</view>
				<image src="../../../static/images/rocket.svg" class="logo"></image>
				<u-button :custom-style="btLoginStyle" throttle-time="3000" :ripple="false" @click="login">微信登录</u-button>
			</view>
		</view>
	</u-mask>
</template>

<script>
import store from '../../../store';
import { login } from '../../../utils/util';
export default {
	name: 'login',
	data() {
		return {
			btLoginStyle: {
				width: '400rpx',
				backgroundColor: '#28CE3E',
				color: '#fff',
				fontSize: '1rem'
			}
		};
	},
	methods: {
		login() {
			uni.showLoading({ title: '数据加载中' });
			uni.getUserProfile({
				desc: '用户完善用户信息',
				lang: 'zh_CN',
				success: async res => {
					const userInfo = res.userInfo;
					const { code } = await login();
					await store.dispatch('login', { code, userInfo });
					uni.hideLoading();
					uni.navigateBack({
						animationDuration: 380,
						animationType: 'fade-out'
					});
				},
				fail: () => {
					this.$refs.uToast.show({
						title: '用户拒绝授权',
						type: 'error'
					});
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import 'index.styl'
</style>
