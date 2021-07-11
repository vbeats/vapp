<script>
import { initStore, checkToken } from 'utils/auth';

export default {
	onLaunch: async () => {
		// init vuex
		await initStore();
		// check token
		await checkToken();
	},
	onShow: async () => {},
	onHide: function() {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
</style>
