# globalThis

```javascript
var getGlobal = function () {
	if (typeof self !== "undefined") {
		return self;
	}
	if (typeof window !== "undefined") {
		return window;
	}
	if (typeof global !== "undefined") {
		return global;
	}
	throw new Error("unable to locate global object");
};

var globals = getGlobal();

if (typeof globals.setTimeout !== "function") {
	// 此环境中没有 setTimeout 方法！
}
```

[globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
