import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('../pages/Home.vue') },
  {
    path: '/LifeCycles',
    component: () => import('../pages/Life')
  },
  {
    path: '/Ref',
    component: () => import('../components/Ref')
  },
  {
    path: '/RefTemplate',
    component: () => import('../components/RefTemplate')
  },
  {
    path: '/ToRef',
    component: () => import('../components/ToRef')
  },
  {
    path: '/ToRefs',
    component: () => import('../components/ToRefs')
  },
  {
    path: '/VModel',
    component: () => import('../pages/VModel')
  },
  {
    path: '/Watch',
    component: import('../pages/Watch')
  },
  {
    path: '/GetInstance',
    component: import('../components/GetInstance.vue')
  },
  {
    path: '/chart',
    component: () => import('../components/ChaerDemo.vue')
  },
  {
    path: '/Modifier',
    component: import('../pages/Modifier')
  },
  {
    path: '/CustomRef',
    component: import('../pages/CustomRef')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
