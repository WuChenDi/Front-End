import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import '@/style/index.scss';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router).use(store).use(Antd).mount('#app');
