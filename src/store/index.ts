import {createStore} from 'vuex'
import actions from './actions'
import user from './modules/user'
import getters from './getters'

export default createStore({
  actions,
  modules: {
    user,
  },
  getters,
})
