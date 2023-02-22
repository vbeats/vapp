import {useAppStore} from './store/app'
import {useUserStore} from './store/user'
import dayjs from "dayjs";
import {handleAuth, refreshToken} from "./util/auth";

const loadAppCache = async () => {
    const appStore = useAppStore()

    await appStore.loadCache()
}

const loadUserCache = async () => {
    const userStore = useUserStore()

    await userStore.loadCache()
}

const checkToken = async () => {
    setTimeout(checkToken, 5 * 60 * 1000)
    const userStore = useUserStore()

    const token = userStore.token || ''
    const expire = userStore.expire || -1
    const now = dayjs().unix()

    // token过期了
    if (!token || token === '' || expire - now <= 0) {
        await handleAuth()
        return
    }

    // token如果到期了 刷新; 未到期, 剩余时间大于一次检查周期320s>5分钟 直接用
    if (token !== '' && expire - now >= 320) {
        return
    }

    // token存在 过期时间小于5分钟  刷新token有效期
    await refreshToken()
}

export default async () => {
    // 云开发初始化环境
    /*Taro.cloud.init({
        // @ts-ignore
        env: CLOUD_ENV,
    })*/

    // 加载系统缓存
    await loadAppCache()

    // 加载用户信息
    await loadUserCache()

    // 检查token
    await checkToken()
}