import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('../pages/Home.vue') },
  {
    path: '/LifeCycles',
    component: () => import('../pages/Life')
  },
  {
    path: '/watch',
    component: import('../components/Watch.vue')
  },
  {
    path: '/watchEffect',
    component: () => import('../components/watchEffect.vue')
  },
  {
    path: '/chart',
    component: () => import('../components/ChaerDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
