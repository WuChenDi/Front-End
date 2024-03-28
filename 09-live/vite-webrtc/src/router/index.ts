import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
  },

  { path: '/', redirect: '/getUserMedia' },
  {
    path: '/getUserMedia',
    name: 'getUserMedia',
    component: () => import('../views/getUserMedia.vue'),
    meta: { title: 'WebRTC获取音视频设备' },
  },
  {
    path: '/mediaDevices',
    name: 'mediaDevices',
    component: () => import('../views/mediaDevices.vue'),
    meta: { title: 'WebRTC音视频数据采集' },
  },
  {
    path: '/3/mediaRecoder',
    name: 'mediaRecoder',
    component: () => import('../views/mediaRecoder.vue'),
    meta: { title: 'WebRTC录制' },
  },
  {
    path: '/3/getDisplayMedia',
    name: 'getDisplayMedia',
    component: () => import('../views/getDisplayMedia.vue'),
    meta: { title: 'WebRTC屏幕捕获' },
  },
  {
    path: '/socketIO',
    name: 'socketIO',
    component: () => import('../views/socketIO.vue'),
    meta: { title: 'WebRTC信令' },
  },
  {
    path: '/RTCPeerConnection',
    name: 'RTCPeerConnection',
    component: () => import('../views/RTCPeerConnection.vue'),
    meta: { title: '端对端1V1传输' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
