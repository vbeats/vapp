import Vue from 'vue'
  import Vuex from 'vuex'
  import actions from './actions'
  import getters from './getters'
  import user from './modules/user'

  Vue.use(Vuex)

  export default new Vuex.Store({
  	actions,
  	modules: {
  		user
  	},
  	getters
  })
