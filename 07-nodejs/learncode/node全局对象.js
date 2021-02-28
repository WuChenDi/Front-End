console.log(__dirname);
console.log(__filename);

// process 对象：process提供了 Node 进程中相关的信息：
//   比如 Node 的运行环境，参数信息等；
//   环境变量读取到 process 的 env 中

// setTimeout(() => {
// 	console.log("setTimeout");
// }, 1000);

// setInterval(() => {
// 	console.log("setInterval");
// }, 1000);

// setImmediate(() => {
// 	console.log("setImmediate");
// });

// process.nextTick(() => {
// 	console.log("process nextTick");
// });

console.log(global);
var name = "wuchendi";
console.log(name);
console.log(global.name);

console.log(global.process);
