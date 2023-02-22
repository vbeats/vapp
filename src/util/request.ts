import Taro from "@tarojs/taro";
import {useUserStore} from "../store/user"
import dayjs from "dayjs";

// 小程序 系统设备信息
const systemInfo = Taro.getSystemInfoSync()
const accountInfo = Taro.getAccountInfoSync()
const {miniProgram} = accountInfo
const {SDKVersion, brand, model, system, locationAuthorized, locationEnabled, locationReducedAccuracy} = systemInfo

// 拦截器 请求头填充 wx-mini-*
const interceptor = async (chain: any) => {
    const requestParams = chain.requestParams

    const {header} = requestParams
    header['wx-mini-appid'] = miniProgram.appId                                                 // 小程序appid
    header['wx-mini-version'] = miniProgram.version                                             // 线上小程序版本号
    header['wx-mini-sdk-version'] = SDKVersion                                                  // 客户端基础库版本
    header['wx-mini-brand'] = brand                                                             // 设备品牌
    header['wx-mini-model'] = model                                                             // 设备型号
    header['wx-mini-system'] = system                                                           // 操作系统及版本
    header['wx-mini-location-authorized'] = locationAuthorized ? "true" : "false"               // 允许微信使用定位的开关
    header['wx-mini-location-enabled'] = locationEnabled ? "true" : "false"                     // 地理位置的系统开关
    header['wx-mini-location-reduced-accuracy'] = locationReducedAccuracy ? "true" : "false"    // true 表示模糊定位，false 表示精确定位，仅 iOS 支持

    return await chain.proceed(requestParams)
}

const axios = async (uri: string, data?: any, method: keyof Taro.request.Method = 'POST'): Promise<any> => {
    const userStore = useUserStore()

    const option: Taro.request.Option = {
        // @ts-ignore
        url: BASE_URL + uri,
        header: {
            'Content-Type': data ? 'application/json' : 'application/x-www-form-urlencoded',
            Authorization: userStore.token ? `Bearer ${userStore.token}` : '',
        },
        timeout: 8000,
        dataType: 'json',
        data,
        method
    }

    // 重复请求拦截
    const limitMethods = ['POST', 'DELETE', 'PUT']
    const rLimitData = {
        uri: uri,
        method: method?.toUpperCase() || '',
        time: dayjs()
    }

    const rateLimit = Taro.getStorageSync('rate-limit')
    if (uri === rateLimit.uri && limitMethods.includes(method?.toUpperCase() || '') && dayjs().diff(rateLimit.time) < 1500) {
        Taro.hideLoading()
        Taro.hideToast()
        return
    }

    Taro.setStorageSync('rate-limit', rLimitData)

    Taro.addInterceptor(Taro.interceptors.logInterceptor)
    Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
    Taro.addInterceptor(interceptor)

    return new Promise<any>((resolve, reject) => {
        Taro.showLoading()
        Taro.request({
            ...option,
            success: res => {
                const data = res.data
                if (data.code === 200) {
                    resolve(data)
                } else {
                    Taro.showModal({
                        title: '请求异常',
                        content: data.msg || '网络异常~ 稍后再试'
                    })
                    reject(data.msg)
                }
            },
            fail: err => {
                Taro.showModal({
                    title: '请求异常',
                    content: err.errMsg || '网络异常~ 稍后再试'
                })
                reject(err)
            },
            complete: () => {
                Taro.hideLoading()
            }
        })
    })
}

export default axios