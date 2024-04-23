import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import MicroVitePlugin from '@cdlab996/vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // MicroVitePlugin('vueApp', {
    //   useDevMode: false,
    // }),
  ],
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
