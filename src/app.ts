import {createApp} from 'vue'
import store from './store'
import bootstrap from "./bootstrap"
import './app.styl'

const app = createApp({
  onShow(options) {
    console.log(options)
  },

  onLaunch() {
    bootstrap()
  },
})

app.use(store)

export default app
