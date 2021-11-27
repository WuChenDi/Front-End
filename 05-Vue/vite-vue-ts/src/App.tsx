import { defineComponent, ref } from 'vue'
import logo from './assets/logo.png'

export default defineComponent({
  name: 'App',
  setup() {
    const menu = ref([
      { path: '/', name: 'index' },
      { path: '/LifeCycles', name: 'LifeCycles' },
      { path: '/watch', name: 'watch' },
      { path: '/watchEffect', name: 'watchEffect' },
      { path: '/chart', name: 'ChartDemo' }
    ])

    return () => (
      <>
        <img alt='Vue logo' src={logo} />
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
