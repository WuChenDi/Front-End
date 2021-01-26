import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const getUserMedia = () => import(/* webpackChunkName: "getUserMedia" */ "../views/getUserMedia.vue");
const mediaDevices = () => import(/* webpackChunkName: "mediaDevices" */ "../views/mediaDevices.vue");
const mediaRecoder = () => import(/* webpackChunkName: "mediaRecoder" */ "../views/mediaRecoder.vue");
const getDisplayMedia = () => import(/* webpackChunkName: "getDisplayMedia" */ "../views/getDisplayMedia.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/getUserMedia" },
	{
		path: "/getUserMedia",
		name: "getUserMedia",
		component: getUserMedia,
		meta: { title: "WebRTC获取音视频设备" },
	},
	{
		path: "/mediaDevices",
		name: "mediaDevices",
		component: mediaDevices,
		meta: { title: "WebRTC音视频数据采集" },
	},
	{
		path: "/3/mediaRecoder",
		name: "mediaRecoder",
		component: mediaRecoder,
		meta: { title: "WebRTC录制" },
	},
	{
		path: "/3/getDisplayMedia",
		name: "getDisplayMedia",
		component: getDisplayMedia,
		meta: { title: "WebRTC采集屏面数据" },
	},
];
// console.log(createWebHistory(process.env.BASE_URL));

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
