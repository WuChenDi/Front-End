import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import MicroVitePlugin from '@cdlab996/vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // MicroVitePlugin('main', {
    //   // set to true for main/master app
    //   isMain: true,
    // }),
  ],
})
