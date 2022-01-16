import {createApp} from 'vue'
import store from './store'
import {Button, Toast} from '@nutui/nutui-taro'
import bootstrap from './bootstrap'
import '@nutui/nutui-taro/dist/style.css'
import './app.styl'

const App = createApp({
  onShow(options) {
    console.log(options)
  },
  onLaunch: async (options) => {
    console.log(options)
    await bootstrap()
  },
})

App.use(store).use(Button).use(Toast)

export default App
