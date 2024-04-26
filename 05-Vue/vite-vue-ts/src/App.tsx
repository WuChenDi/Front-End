/* eslint-disable no-console */
import { defineComponent, ref } from 'vue'
import HelloWorldTSX from './components/HelloWorldTSX'
import logo from './assets/logo.png'

export default defineComponent({
  name: 'App',
  setup() {
    const menu = ref([
      { path: '/', name: 'index' },
      { path: '/LifeCycles', name: 'LifeCycles' },
      { path: '/Ref', name: 'Ref' },
      { path: '/RefTemplate', name: 'RefTemplate' },
      { path: '/ToRef', name: 'ToRef' },
      { path: '/ToRefs', name: 'ToRefs' },
      { path: '/VModel', name: 'VModel' },
      { path: '/Watch', name: 'Watch/watchEffect' },
      { path: '/GetInstance', name: 'Get component instance' },
      { path: '/chart', name: 'ChartDemo' },
      { path: '/Modifier', name: 'Modifier' },
      { path: '/CustomRef', name: 'customRef' },
    ])

    return () => (
      <>
        <img alt='Vue logo' src={logo} />
        <HelloWorldTSX msg='Hello Vue 3' onChange={(e: string) => console.log(e)} />
        <ul>
          {menu.value.map((i) => (
            <li key={i.path}>
              <router-link to={i.path}>{i.name}</router-link>
            </li>
          ))}
        </ul>

        <router-view />
      </>
    )
  },
})
