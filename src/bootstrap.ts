import {useUserStore} from "@/store/user"

export default async () => {
    const userStore = useUserStore()
    await userStore.loadStorage()

    // update
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
        console.log("有新版本👉: ", res.hasUpdate);
    });

    updateManager.onUpdateReady((res) => {
        uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            complete() {
                updateManager.applyUpdate()
            }
        })
    })

    updateManager.onUpdateFailed((err) => {
    })
}