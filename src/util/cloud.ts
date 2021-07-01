import Taro from '@tarojs/taro'
import * as toast from '../util/toast'

function handleError(error: any): void {
  console.error(error)
  toast.fail('网络异常')
}

// 云函数调用
export function requestCloud(name: string, data: any, resolve: Function): void {
  Taro.cloud.callFunction({
      name,
      data,
      complete: (res: any) => {
        const data = res.result
        if (!data.code || data.code !== 200) {
          handleError(data.msg)
          return
        }
        resolve(data)
      }
    }
  )
}
