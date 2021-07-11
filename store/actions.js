const actions = {
	load_userinfo: ({
		commit
	}) => {
		commit('load_userinfo')
	},
	login: ({
		commit
	}, {
		code,
		userInfo
	}) => commit('login', {
		code,
		userInfo
	})
}

export default actions
