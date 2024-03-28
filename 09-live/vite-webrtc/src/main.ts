import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(router).use(store).mount('#app');
