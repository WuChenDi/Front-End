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
      { path: '/watch', name: 'watch' },
      { path: '/watchEffect', name: 'watchEffect' },
      { path: '/chart', name: 'ChartDemo' }
    ])

    return () => (
      <>
        <img alt='Vue logo' src={logo} />
        <HelloWorldTSX msg='Hello Vue 3' onChange={e => console.log(e)} />
        <ul>
          {menu.value.map(i => (
            <li key={i.path}>
              <router-link to={i.path}>{i.name}</router-link>
            </li>
          ))}
        </ul>

        <router-view />
      </>
    )
  }
})
