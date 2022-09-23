import {defineConfig} from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import {viteStaticCopy} from 'vite-plugin-static-copy'
import {resolve} from 'path'

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/cloud/**/*',
                    dest: `cloud`
                }
            ]
        }),
        uni()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});
