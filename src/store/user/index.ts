import {defineStore} from 'pinia'

const defaultUser = {
    id: '',
    tenant_id: '',
    token: '',
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        ...defaultUser
    }),

    actions: {
        loadStorage() {
            const userStorage = uni.getStorageSync('user')
            if (userStorage) {
                this.$patch(state => {
                    state.id = userStorage.id
                    state.tenant_id = userStorage.tenant_id
                    state.token = userStorage.token
                })
            }
        },
        saveToken(param: any) {
            console.log(param)
            this.$patch(state => {
                state.id = param.id
                state.tenant_id = param.tenant_id
                state.token = param.token.token_value
            })
            uni.setStorageSync('user', this.$state)
        }
    },

    getters: {},
})