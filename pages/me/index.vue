<template>
	<div class="me">
		me.....
		<button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!token">嘿嘿嘿</button>
	</div>
</template>

<script>
	import {
		getToken
	} from '@/utils/auth'
	export default {
		data() {
			return {
				token: uni.getStorageSync('token')
			}
		},
		methods: {
			getUserInfo(userInfo) {
				getToken(userInfo)
			}
		}
	}
</script>

<style>
</style>
