import Taro from "@tarojs/taro";
import errorIcon from "../assets/imgs/error.png"

export const fail = (title: string) => {
  Taro.showToast({
    title,
    duration: 3000,
    image: errorIcon
  })
}
