## 一. 交换元素

* 利用 数组解构来实现值的互换

```js
let a = 'world', b = 'hello'
[a, b] = [b, a]
console.log(a) // -> hello
console.log(b) // -> world
```

## 二. 调试

* 我们经常使用 console.log()来进行调试，试试 console.table()也无妨。
```js
const a = 5, b = 6, c = 7
console.log({ a, b, c });
console.table({a, b, c, m: {name: 'xixi', age: 27}});
```

## 三. 单条语句

* ES6时代，操作数组的语句将会更加的紧凑
```js
// 寻找数组中的最大值
const max = (arr) => Math.max(...arr);
max([123, 321, 32]) // outputs: 321
// 计算数组的总和
const sum = (arr) => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3, 4]) // output: 10
```

## 四. 数组拼接

* 展开运算符可以取代 concat的地位了
```js
const one = ['a', 'b', 'c']
const two = ['d', 'e', 'f']
const three = ['g', 'h', 'i']
const result = [...one, ...two, ...three]
```

## 五. 制作副本

* 我们可以很容易的实现数组和对象的 浅拷贝
```js
const obj = { ...oldObj }
const arr = [ ...oldArr ]
```

## 六. 命名参数

* 解构使得函数声明和函数的调用更加可读
```js
// 我们尝尝使用的写法
const getStuffNotBad = (id, force, verbose) => {
 ...do stuff
}
// 当我们调用函数时， 明天再看，尼玛 150是啥，true是啥
getStuffNotBad(150, true, true)
// 看完本文你啥都可以忘记, 希望够记住下面的就可以了
const getStuffAwesome = ({id, name, force, verbose}) => {
 ...do stuff
}
// 完美
getStuffAwesome({ id: 150, force: true, verbose: true })
```

## 七 Async/Await结合数组解构

* 数组解构非常赞!结合 Promise.all和 解构和 await会使代码变得更加的简洁
```js
const [user, account] = await Promise.all([
 fetch('/user'),
 fetch('/account')
])
```

注：console.table() 有一个隐藏的特性，如果某项数值为空字符串，则这一项不会显示在列表里，如：
console.table({"notdown_type":""})
所以有时候不好用