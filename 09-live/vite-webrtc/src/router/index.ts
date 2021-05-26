import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const getUserMedia = () =>
  import(/* webpackChunkName: "getUserMedia" */ '../views/getUserMedia.vue');
const mediaDevices = () =>
  import(/* webpackChunkName: "mediaDevices" */ '../views/mediaDevices.vue');
const mediaRecoder = () =>
  import(/* webpackChunkName: "mediaRecoder" */ '../views/mediaRecoder.vue');
const getDisplayMedia = () =>
  import(/* webpackChunkName: "getDisplayMedia" */ '../views/getDisplayMedia.vue');
const socketIO = () => import(/* webpackChunkName: "socketIO" */ '../views/socketIO.vue');
const RTCPeerConnection = () =>
  import(/* webpackChunkName: "RTCPeerConnection" */ '../views/RTCPeerConnection.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About'),
  },

  { path: '/', redirect: '/getUserMedia' },
  {
    path: '/getUserMedia',
    name: 'getUserMedia',
    component: getUserMedia,
    meta: { title: 'WebRTC获取音视频设备' },
  },
  {
    path: '/mediaDevices',
    name: 'mediaDevices',
    component: mediaDevices,
    meta: { title: 'WebRTC音视频数据采集' },
  },
  {
    path: '/3/mediaRecoder',
    name: 'mediaRecoder',
    component: mediaRecoder,
    meta: { title: 'WebRTC录制' },
  },
  {
    path: '/3/getDisplayMedia',
    name: 'getDisplayMedia',
    component: getDisplayMedia,
    meta: { title: 'WebRTC屏幕捕获' },
  },
  {
    path: '/socketIO',
    name: 'socketIO',
    component: socketIO,
    meta: { title: 'WebRTC信令' },
  },
  {
    path: '/RTCPeerConnection',
    name: 'RTCPeerConnection',
    component: RTCPeerConnection,
    meta: { title: '端对端1V1传输' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
