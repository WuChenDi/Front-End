# Iterator &amp; for...of

- 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
- Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。
- 在 ES6 中，有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历，有些就不行（比如对象）。原因在于，这些数据结构原生部署了 Symbol.iterator 属性（详见下文），另外一些数据结构没有。凡是部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
- 在 ES6 中，有三类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、Set 和 Map 结构。
- 一个为对象添加 Iterator 接口的例子。

```javascript
{
	let arr = ["hello", "world"];
	let map = arr[Symbol.iterator]();
	console.log(map.next()); // { value: 'hello', done: false }
	console.log(map.next()); // { value: 'world', done: false }
	console.log(map.next()); // { value: undefined, done: true }
}

{
	let obj = {
		seart: [1, 3, 2],
		end: [7, 9, 8],
		[Symbol.iterator]() {
			let self = this;
			let index = 0;
			let arr = self.seart.concat(self.end);
			let len = arr.length;
			return {
				next() {
					if (index < len) {
						return {
							value: arr[index++],
							done: false,
						};
					} else {
						return {
							value: arr[index++],
							done: true,
						};
					}
				},
			};
		},
	};
	for (let key of obj) {
		console.log(key); // 1,3,2,7,9,8
	}
}

{
	let arr = ["hello", "world"];
	for (let value of arr) {
		console.log("value", value);
		// value hello
		// value world
	}
}
```
