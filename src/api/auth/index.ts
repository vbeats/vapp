import axios from '@/util/request'

export async function getToken(param: any): Promise<any> {
    return axios.post('/auth/oauth/token', {...param})
}

export async function tokenInfo(): Promise<any> {
    return axios.get('/auth/oauth/tokenInfo')
}