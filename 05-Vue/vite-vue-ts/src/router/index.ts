import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("../pages/Home.vue");
const Watch = () => import("../components/Watch.vue");
const watchEffect = () => import("../components/watchEffect.vue");
const ChartDemo = () => import("../components/ChaerDemo.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home, children: [] },
  {
    path: "/watch",
    component: Watch,
    children: [],
  },
  {
    path: "/watchEffect",
    component: watchEffect,
    children: [],
  },
  {
    path: "/chart",
    component: ChartDemo,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
