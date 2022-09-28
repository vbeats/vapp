import {useUserStore} from "@/store/user"

export default async () => {
    const userStore = useUserStore()
    await userStore.loadStorage()
}