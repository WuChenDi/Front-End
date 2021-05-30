import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "../pages/Home.vue");
const ChartDemo = () =>
  import(/* webpackChunkName: "ChartDemo" */ "../components/ChaerDemo.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home, children: [] },
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
