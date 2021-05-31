import getters from './getters'
const state = {
	user: {}
}

const mutations = {
	updateUser(state, userInfo) {
		state.user = {
			...userInfo
		}
	}
}

export default {
	state,
	mutations,
	getters
}
