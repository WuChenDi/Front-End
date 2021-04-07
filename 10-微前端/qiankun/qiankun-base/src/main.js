import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import { registerMicroApps, start } from "qiankun";

/*
 * name: 微应用名称 - 具有唯一性
 * entry: 微应用入口 - 通过该地址加载微应用
 * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
 * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
 * props: 共享给微应用的数据
 */
registerMicroApps(
	[
		{
			name: "vueApp",
			entry: "//localhost:10001",
			container: "#vue",
			activeRule: "/vue",
			props: { type: "vueApp" },
		},
		{
			name: "reactApp",
			entry: "//localhost:20001",
			container: "#react",
			activeRule: "/react",
			props: { type: "reactApp" },
		},
	],
	{
		beforeLoad: (app) => console.log("before load", app.name),
		beforeMount: [(app) => console.log("before mount", app.name)],
	}
);

start({
	prefetch: false, // 取消预加载
});

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
