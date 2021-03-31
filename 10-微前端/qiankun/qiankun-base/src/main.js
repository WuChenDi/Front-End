import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import { registerMicroApps, start } from "qiankun";

registerMicroApps([
	{
		name: "vueApp",
		entry: "//localhost:10001",
		container: "#vue",
		activeRule: "/vue",
		props: { a: 1 },
	},
	{
		name: "reactApp",
		entry: "//localhost:20001",
		container: "#react",
		activeRule: "/react",
	},
]);

start({
	prefetch: false,
});

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
