import {defineStore} from 'pinia'
import Taro from "@tarojs/taro"
import dayjs from "dayjs"

// 小程序appid
const appid = Taro.getAccountInfoSync().miniProgram.appId

const defaultUserInfo = {
    id: '',
    merchantId: '',
    nickName: '',
    phone: '',
    token: '',
    expire: -1,
    roles: [],
    appid
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        ...defaultUserInfo
    }),

    actions: {
        // 加载缓存
        loadCache() {
            const userInfo = Taro.getStorageSync('user') || {...defaultUserInfo}
            this.$patch({...userInfo})
        },
        // 认证token
        saveToken(param: any) {
            this.$patch({...param, expire: dayjs().unix() + 4 * 3600})
            Taro.setStorageSync('user', this.$state)
        },
        // 刷新token有效时间
        refreshToken() {
            this.$patch(state => {
                state.expire = dayjs().unix() + 4 * 3600
            })
            Taro.setStorageSync('user', this.$state)
        },
        // 绑定手机号
        bindPhone(phone: String) {
            this.$patch(state => {
                state.phone = phone
            })
            Taro.setStorageSync('user', this.$state)
        }
    },

    getters: {},
})