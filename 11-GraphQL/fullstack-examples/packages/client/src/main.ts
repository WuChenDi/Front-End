import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import apolloClient from './apolloClient'
// import App from './App.vue'
import App from './App'
import './style.css'

createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
}).mount('#app')
