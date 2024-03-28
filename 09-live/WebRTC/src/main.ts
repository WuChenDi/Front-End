import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app
	.use(router)
	.use(Antd)
	.mount("#app");
