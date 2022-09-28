import {CLIENT_ID, CLIENT_SECRET} from "@/common/const"
import axios from '@/util/request'

export async function getToken(param: any): Promise<any> {
    return axios.post('/auth/oauth/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        ...param
    })
}