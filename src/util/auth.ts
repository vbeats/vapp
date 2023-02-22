import {useUserStore} from "../store/user"
import Taro from "@tarojs/taro"
import axios from "./request"

// 用户登录认证
const handleAuth = async () => {
    const userStore = useUserStore()
    const loginRes = await Taro.login()
    if (!loginRes.code) {
        Taro.showToast({
            icon: 'error',
            title: '获取code失败'
        })
        return
    }
    if (!userStore.appid) {
        Taro.showToast({
            icon: 'error',
            title: '获取appid失败'
        })
        return
    }
    const res = await axios('/auth/oauth/token', {
            grantType: 'wx_ma',
            wxMaParam: {
                code: loginRes.code,
                appid: userStore.appid
            }
        }
    )

    const data = res.data
    userStore.saveToken({...data.user, token: data.token.tokenValue})
}

// 刷新token有效时间
const refreshToken = async () => {
    const userStore = useUserStore()
    await axios('/auth/oauth/refresh', {grantType: 'wx_ma'}, 'GET')

    userStore.refreshToken()
}


// 获取手机号
const bindPhone = async (code: String) => {
    const userStore = useUserStore()
    if (!userStore.appid) {
        Taro.showToast({
            icon: 'error',
            title: '获取appid失败'
        })
        return
    }
    const res = await axios('/user/user/bindPhone', {code, appid: userStore.appid})
    userStore.bindPhone(res.data)
}

export {handleAuth, refreshToken, bindPhone}