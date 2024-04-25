// 第一种方式
// 首次访问页面时，加载 main.js (2Mb)
// 当页面业务逻辑发生变化时，又要加载2Mb的内容

// 业务逻辑 1Mb
console.log(_.join(['a', 'b', 'c'], '***'));
// 此处省略 10w 行业务逻辑
console.log(_.join(['a', 'b', 'c'], '***'));

// 第二种方式
// main.js 被拆成 lodash.js(1Mb)，main.js(1Mb)
// 当页面业务逻辑发生变化时，只需加载 main.js即可 (1Mb)
