import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue(), vueJsx()],
    server: {
      port: env.VITE_CLIENT_PORT ? +env.VITE_CLIENT_PORT : 5173, // convert string to number
    },
  }
})
