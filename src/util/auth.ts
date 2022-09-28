// login : code--->session
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user"
import dayjs from "dayjs"
import {getToken} from "@/api/auth"
import {ref} from "vue";

const timer = ref()

const login = () => {
    uni.login({
        provider: 'weixin',
        success: async res => {
            const result = await getToken({
                wx_param: {
                    appid: uni.getAccountInfoSync().miniProgram.appId,
                    code: res.code,
                },
                grant_type: 'wx_miniapp'
            })
            await useUserStore().saveToken({...result.data})
        }
    })
}

// check access_token refresh_token
const checkToken = async () => {
    timer.value = setTimeout(checkToken, 5 * 60 * 1000)

    const now = dayjs().unix()
    const userStore = useUserStore()
    const {access_token, refresh_token, access_token_expire, refresh_token_expire} = storeToRefs(userStore)

    if (access_token.value === '' || refresh_token_expire.value - now <= 320) {
        // refresh_token有效时间不足一次检查周期5分钟
        login()
        return
    }

    // access_token如果到期了 刷新; 未到期, 直接用
    if (access_token.value !== '' && access_token_expire.value - now >= 320) {
        // 剩余时间大于一次检查周期320s>5分钟
        return
    }

    // 刷新token
    const res = await getToken({
        refresh_token: refresh_token.value,
        grant_type: 'refresh_token',
    })

    await userStore.updateAccessToken({...res.data})
}

const clearTimer = () => {
    clearTimeout(timer.value)
}


export {checkToken, login, clearTimer}