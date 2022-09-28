import {defineStore} from 'pinia'
import dayjs from "dayjs";
import {ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE} from "@/common/const"

const defaultUser = {
    id: '',
    tenant_id: '',
    access_token: '',
    refresh_token: '',
    access_token_expire: -1,
    refresh_token_expire: -1
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
                    state.access_token = userStorage.access_token
                    state.refresh_token = userStorage.refresh_token
                    state.access_token_expire = userStorage.access_token_expire
                    state.refresh_token_expire = userStorage.refresh_token_expire
                })
            }
        },
        saveToken(param: any) {
            const now = dayjs().unix()
            this.$patch(state => {
                state.id = param.id
                state.tenant_id = param.tenant_id
                state.access_token = param.access_token
                state.refresh_token = param.refresh_token
                state.access_token_expire = now + ACCESS_TOKEN_EXPIRE
                state.refresh_token_expire = now + REFRESH_TOKEN_EXPIRE * 24 * 3600
            })
            uni.setStorageSync('user', this.$state)
        },
        updateAccessToken(param: any) {
            const now = dayjs().unix()
            this.$patch(state => {
                state.id = param.id
                state.tenant_id = param.tenant_id
                state.access_token = param.access_token
                state.access_token_expire = now + ACCESS_TOKEN_EXPIRE
            })
            uni.setStorageSync('user', this.$state)
        }
    },

    getters: {},
})