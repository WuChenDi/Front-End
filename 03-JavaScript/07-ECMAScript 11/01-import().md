# import()

按需获取的动态 import. 该类函数格式（并非继承  Function.prototype）返回 promise 函数

```javascript
{
	const modulePage = "page.js";
	import(modulePage).then((module) => {
		module.init();
	});
}

{
	(async () => {
		const helpersModule = "helpers.js";
		const module = await import(helpersModule);
		const total = module.sum(2, 2);
	})();
}
```
