import {defineStore} from 'pinia'
import Taro from "@tarojs/taro";

const defaultAppInfo = {}
export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        ...defaultAppInfo
    }),

    actions: {
        // 加载缓存信息
        loadCache() {
            const appInfo = Taro.getStorageSync('app') || {...defaultAppInfo}
            this.$patch({...appInfo})
        }
    },

    getters: {},
})