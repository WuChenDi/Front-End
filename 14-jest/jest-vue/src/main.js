import Vue from "vue";
import App from "./App.jsx";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
