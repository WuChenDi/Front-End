import { createApp } from "vue";
import App from "./App";
import router from "./router";
import { setupStore } from "./store";

import VueHighcharts from "./directive/highcharts";

async function bootstrap() {
  const app = createApp(App);

  app.use(router);

  setupStore(app);

  app.use(VueHighcharts);

  app.mount("#app", true);
}

void bootstrap();
