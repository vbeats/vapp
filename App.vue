<script>
import request from 'utils/request';
import { handleAuth } from 'utils/auth.js';

export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow() {
		// storage-->vuex
		this.initStore();
		// 校验token是否有效
		this.checkToken();
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		initStore() {
			const user = uni.getStorageSync('user');
			if (user) {
				this.$store.dispatch('updateUser', user);
			}
		},
		checkToken() {
			setTimeout(this.checkToken, 5 * 1000);

			const user = uni.getStorageSync('user');
			const access_token = uni.getStorageSync('access_token') || '';
			const refresh_token = uni.getStorageSync('refresh_token') || '';
			const access_token_expire = uni.getStorageSync('access_token_expire') || -1;
			const refresh_token_expire = uni.getStorageSync('refresh_token_expire') || -1;
			const now = new Date().getTime();

			if (!user) {
				// 未登录认证过
				return;
			}

			//  access_token有效期>320秒  refresh_token有效期> 2小时
			if (access_token && refresh_token && (access_token_expire - now) / 1000 > 320 && (refresh_token_expire - now) / 1000 > 320) {
				return;
			}

			// refresh_token有效时间 >320秒  刷新token
			if ((refresh_token_expire - now) / 1000 > 320) {
				request('/auth/oauth/token?appid=wechat&secret=a135ec07-6eb2-4300-840a-9977dd8c813c', {
					type: 0,
					platform: 1,
					refresh_token: refresh_token
				}).then(res => {
					if (res.data && res.data.code === 200) {
						const data = res.data.data;
						this.$store.dispatch('updateUser', data);
						uni.setStorageSync('user', data);
						uni.setStorageSync('access_token', data.access_token);
						uni.setStorageSync('refresh_token', data.refresh_token);
						uni.setStorageSync('access_token_expire', new Date().getTime() + 7200 * 1000);
						uni.setStorageSync('refresh_token_expire', new Date().getTime() + 20 * 24 * 3600 * 1000);
					}
				});
			} else {
				// 都无效了  重新login --> getUserInfo -->auth认证获取新的token
				uni.login({
					success: res => {
						uni.getUserInfo({
							provider: 'weixin',
							withCredentials: true,
							lang: 'zh_CN',
							success: userInfoRes => {
								handleAuth(res.code, userInfoRes);
							},
							fail: () => {
								uni.showToast({
									title: '用户授权已取消',
									image: '/static/imgs/error.png',
									duration: 2000
								});
							}
						});
					}
				});
			}
		}
	}
};
</script>

<style>
/*每个页面公共css */
</style>
