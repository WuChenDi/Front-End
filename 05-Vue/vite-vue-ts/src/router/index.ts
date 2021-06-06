import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "../pages/Home.vue");
const Watch = () => import(/* webpackChunkName: "Watch" */ "../components/Watch.vue");
const watchEffect = () => import(/* webpackChunkName: "watchEffect" */ "../components/watchEffect.vue");
const ChartDemo = () => import(/* webpackChunkName: "ChartDemo" */ "../components/ChaerDemo.vue");

const routes: Array<RouteRecordRaw> = [
  {path: "/", component: Home, children: []},
  {
    path: "/watch", component: Watch, children: [],
  },
  {
    path: "/watchEffect", component: watchEffect, children: [],
  },
  {
    path: "/chart", component: ChartDemo, children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
