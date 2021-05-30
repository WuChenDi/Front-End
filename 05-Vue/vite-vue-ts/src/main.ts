import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueHighcharts from "./directive/highcharts";

const app = createApp(App);

app.use(router).use(store).use(VueHighcharts).mount("#app");
