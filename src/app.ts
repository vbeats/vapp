import {createApp} from 'vue'
import store from './store'
import bootstrap from "./bootstrap"
import NutUI from "@nutui/nutui"
import "@nutui/nutui/dist/style.css"
import './app.styl'

const app = createApp({
  onShow(options) {
    console.log(options)
  },

  setup() {
    bootstrap()
  },
})

app.use(store).use(NutUI)

export default app
