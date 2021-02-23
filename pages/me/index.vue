<template>
	<div class="me">
		me.....
		<button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!userInfo.username">嘿嘿嘿</button>
	</div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		getUserInfo(userInfo) {
			getToken(userInfo);
		}
	},
	mounted() {
		console.log(this.userInfo);
	}
};
</script>

<style></style>
