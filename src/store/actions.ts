import {ActionTree} from 'vuex'

const actions: ActionTree<any, any> = {
  load_user: ({commit}): any => commit('load_user'),
  update_user: ({commit}, userInfo: any): any => commit('update_user', userInfo),
  auth: ({commit}, data: any): any => commit('auth', data),
  logout: ({commit}): any => commit('logout'),
  toggle_login: ({commit}): any => commit('toggle_login'),
}

export default actions
