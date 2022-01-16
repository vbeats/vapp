import Taro from '@tarojs/taro'
import errorImg from '../assets/img/error.png'

const showErrorToast = (title: string = '网络异常~', duration: number = 2000) => {
  Taro.showToast({
    title,
    image: errorImg,
    duration,
  })
}

export {showErrorToast}
