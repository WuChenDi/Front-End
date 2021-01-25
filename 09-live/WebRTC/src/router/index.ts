import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const mediaDevices = () => import(/* webpackChunkName: "mediaDevices" */ "../views/mediaDevices.vue");
const mediaRecoder = () => import(/* webpackChunkName: "mediaRecoder" */ "../views/mediaRecoder.vue");

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { title: "WebRTC获取音视频设备" },
	},
	{
		path: "/mediaDevices",
		name: "mediaDevices",
		component: mediaDevices,
		meta: { title: "WebRTC音视频数据采集" },
	},
	{
		path: "/mediaRecoder",
		name: "mediaRecoder",
		component: mediaRecoder,
		meta: { title: "WebRTC录制" },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
