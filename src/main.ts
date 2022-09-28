import {createSSRApp} from "vue"
import App from "./App.vue"
import {createPinia} from 'pinia'
import tmui from './tmui'

export function createApp() {
    const app = createSSRApp(App)

    app.use(createPinia())
    app.use(tmui)

    return {
        app,
    }
}
