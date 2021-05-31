<template>
	<div class="me">
		me.....
		<button @click="getUserProfile" v-if="!userInfo.username">嘿嘿嘿</button>
		<view v-else>{{ userInfo.username }}</view>
	</div>
</template>

<script>
import { handleAuth } from '@/utils/auth';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		getUserProfile() {
			uni.getUserProfile({
				desc: '微信昵称、头像用于完善用户信息',
				lang: 'zh_CN',
				success: userInfoRes => {
					uni.login({
						success: res => {
							handleAuth(res.code, userInfoRes);
						}
					});
				},
				fail: () => {
					uni.showToast({
						title: '用户未授权',
						image: '/static/imgs/error.png',
						duration: 2000
					});
				}
			});
		}
	},
	mounted() {
		console.log(this.userInfo);
	}
};
</script>

<style></style>
