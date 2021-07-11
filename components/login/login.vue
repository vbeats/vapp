<template>
	<u-mask :show="isShow" :mask-click-able="false">
		<u-toast ref="uToast" />
		<view class="warp">
			<view class="login" @tap.stop @click.stop>
				<view class="title">您还未登录</view>
				<view class="sub-title">请先授权登录进行操作</view>
				<image src="../../static/images/rocket.svg" class="logo"></image>
				<u-button :custom-style="btLoginStyle" throttle-time="3000" :ripple="false" @click="login">微信登录</u-button>
			</view>
			<image src="../../static/images/close.svg" class="bt-close" @click="isShow = false"></image>
		</view>
	</u-mask>
</template>

<script>
import store from '../../store';
import { login } from '../../utils/util';
export default {
	name: 'login',
	props: {
		show: {
			type: Boolean,
			required: true
		}
	},
	watch: {
		show(v) {
			this.isShow = v;
		}
	},
	data() {
		return {
			isShow: this.show,
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
					try {
						const userInfo = res.userInfo;
						const { code } = await login();
						await store.dispatch('login', { code, userInfo });
					} catch (err) {
						console.error(err);
					}
					uni.hideLoading();
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
