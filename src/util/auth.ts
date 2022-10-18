// login : code--->session
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user"
import {getToken, tokenInfo} from "@/api/auth"
import {ref} from "vue"

const timer = ref()

const login = () => {
    uni.showLoading({})
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
        },
        complete: () => {
            uni.hideLoading()
        }
    })
}

const checkToken = async () => {
    timer.value = setTimeout(checkToken, 15 * 60 * 1000)

    const userStore = useUserStore()
    const {token} = storeToRefs(userStore)

    if (token.value === '') {
        login()
        return
    }

    // token info
    const res = await tokenInfo()
    if (!res.data.is_login && res.data.token_timeout <= 35 * 60) {
        login()
    }
}

const clearTimer = () => {
    timer.value && clearTimeout(timer.value)
}


export {checkToken, login, clearTimer}