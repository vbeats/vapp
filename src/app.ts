import {createApp} from 'vue'
import {createPinia} from "pinia"
import bootstrap from "./bootstrap"
import {Button} from "@nutui/nutui-taro"
import "@nutui/nutui-taro/dist/style.css"
import './app.styl'

const app = createApp({
    onShow(options) {
        console.log('options: ', options)
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

app.use(createPinia())
app.use(bootstrap)
app.use(Button)

export default app
