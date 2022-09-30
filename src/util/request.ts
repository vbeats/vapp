import axios, {AjaxRequestConfig, AjaxRequestTask} from 'uni-ajax'
import {API} from "@/common/const"
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user"
import {login} from "@/util/auth"

const queue = new Map()

const instance = axios.create({
    baseURL: API,
    header: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
    xhr: (task: AjaxRequestTask, config: AjaxRequestConfig) => {
        queue.get(config.url)?.abort()
        queue.set(config.url, task)
    }
})

instance.interceptors.request.use(
    config => {
        const userStore = storeToRefs(useUserStore())
        config.header.Authorization = 'Bearer ' + userStore.access_token?.value
        config.header['X-USER-ID'] = userStore.id?.value || ''
        config.header['X-TENANT-ID'] = userStore.tenant_id?.value || ''

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        switch (response.data.code) {
            case 401:  // 重新认证
                login()
                break
            case 200:
                return response.data
            default:
                return Promise.reject(response.data.msg)
        }
        throw new Error()
    },
    error => {
        uni.showModal({
            content: error.errMsg,
            showCancel: false
        })
        return Promise.reject(error)
    }
)

export default instance