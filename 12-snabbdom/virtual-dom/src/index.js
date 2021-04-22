import { init, h } from "snabbdom";

let patch = init([]);

let vnode = h("div", "Hello World");
let app = document.querySelector("#app");
console.log(app);
let oldVnode = patch(app, vnode);

vnode = h("div#dd", "Hello cdd");
patch(oldVnode, vnode);

// let vnode = h("div#container", [
//   h("h1", "我是h1标签"),
//   h("ul", [h("li", "我是li标签")]),
// ]);

// let app = document.querySelector("#app");
// patch(app, vnode);

// setTimeout(() => {
//   var newVnode = h("div#container", [h("h2", "我是h2标签")]);
//   patch(vnode, newVnode);
// }, 2000);

// setTimeout(() => {
// 	var newVnode = h("div#container", [h("h2", "我是h2标签")]);
// 	patch(vnode, h("!"));
// }, 2000);

// // 定义 patch
// const patch = init([
// 	snabbdom_class,
// 	snabbdom_props,
// 	snabbdom_style,
// 	snabbdom_eventlisteners,
// ]);

// const container = document.getElementById("container");

// // 生成 vnode
// const vnode = h("ul#list", {}, [
// 	h("li.item", {}, "Item 1"),
// 	h("li.item", {}, "Item 2"),
// ]);

// patch(container, vnode);

// document.getElementById("btn-change").addEventListener("click", () => {
// 	// 生成 newVnode
// 	const newVnode = h("ul#list", {}, [
// 		h("li.item", {}, "Item 1"),
// 		h("li.item", {}, "Item B"),
// 		h("li.item", {}, "Item 3"),
// 	]);
// 	patch(vnode, newVnode);
// });
