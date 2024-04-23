import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './style.css'

import { registerMicroApps, start } from 'qiankun'

/*
 * name: 微应用名称 - 具有唯一性
 * entry: 微应用入口 - 通过该地址加载微应用
 * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
 * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
 * props: 共享给微应用的数据
 */
registerMicroApps(
  [
    {
      name: 'vueApp',
      entry: '//localhost:10001',
      container: '#vue',
      activeRule: '/vue',
      props: { type: 'vueApp' },
    },
    {
      name: 'reactApp',
      entry: '//localhost:20001',
      container: '#react',
      activeRule: '/react',
      props: { type: 'reactApp' },
    },
    {
      name: 'angularapp',
      entry: '//localhost:30001',
      container: '#angular',
      activeRule: '/angular',
      props: { type: 'angularapp' },
    },
  ],
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line no-console
    beforeLoad: (app) => console.log('before load', app.name),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line no-console
    beforeMount: [(app) => console.log('before mount', app.name)],
  }
)

start({
  prefetch: false, // 取消预加载
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#base-app')
