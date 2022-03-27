# 数组

## 一. 交集：合并去重 Set(),Array.from()

```js
let a = [1, 2, 5];
let b = [2, 5, 7];
let c = new Set([...a, ...b]);
console.log(Array.from(c)); //[1,2,5,7]
```

## 二. 并集：找出数组中相同的元素 filter(),has()

```js
let a = [1, 2, 5];
let b = [2, 5, 7];
let c = a.filter(x => new Set(b).has(x));
console.log(c); //[2,5]
```

## 三. 数组四种遍历方法：

-   keys()

```js
//未转化成Set()时，结果item是key值也就是数组的下标
console.log("未转化Set()");
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let item of arr.keys()) {
    console.log(item);
}
//转化成Set()时，结果item就是数组的元素
console.log("转化Set()");
arr = new Set(arr);
for (let item of arr.keys()) {
    console.log(item);
}
```

-   values()：必须使用 Set()转化后才能使用

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = new Set(arr);
for (let item of arr.values()) {
    console.log(item);
}
```

-   entries()

```js
console.log("未转化Set()");
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//未转化成Set()时，结果item是一个数组[key,value];key是从0开始
for (let item of arr.entries()) {
    console.log(item);
}
//转化成Set()时，结果item是一个数组[key,value];key的值与value值相同
console.log("转化Set()");
arr = new Set(arr);
for (let item of arr.entries()) {
    console.log(item);
}
console.log("测试key值是否与value值相等");
let arr2 = ["vue", "angular", "react"];
arr2 = new Set(arr2);
for (let item of arr2.entries()) {
    console.log(item);
}
```

-   forEach():箭头函数参数有三个，(键值：value、键名：key、集合：array)

```js
console.log("未转化Set()");
let arr = ["vue", "angular", "react"];
//未转化成Set()时，key从0开始
arr.forEach((value, key) => console.log(value, key));
//转化成Set()时，key的值与value值相同
console.log("转化Set()");
arr = new Set(arr);
new Set(arr).forEach((value, key) => console.log(value, key));
```

# 小技巧

## 四. 交换元素

-   利用 数组解构来实现值的互换

```js
let a = "world",
    b = ("hello"[(a, b)] = [b, a]);
console.log(a); // -> hello
console.log(b); // -> world
```

## 五. 调试

-   我们经常使用 console.log()来进行调试，试试 console.table()也无妨。

```js
const a = 5,
    b = 6,
    c = 7;
console.log({ a, b, c });
console.table({ a, b, c, m: { name: "xixi", age: 27 } });
```

## 六. 单条语句

-   ES6 时代，操作数组的语句将会更加的紧凑

```js
// 寻找数组中的最大值
const max = arr => Math.max(...arr);
max([123, 321, 32]); // outputs: 321
// 计算数组的总和
const sum = arr => arr.reduce((a, b) => a + b, 0);
sum([1, 2, 3, 4]); // output: 10
```

## 七. 数组拼接

-   展开运算符可以取代 concat 的地位了

```js
const one = ["a", "b", "c"];
const two = ["d", "e", "f"];
const three = ["g", "h", "i"];
const result = [...one, ...two, ...three];
```

## 八. 制作副本

-   我们可以很容易的实现数组和对象的 浅拷贝

```js
const obj = { ...oldObj };
const arr = [...oldArr];
```

## 九. 命名参数

-   解构使得函数声明和函数的调用更加可读

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

## 十. Async/Await 结合数组解构

-   数组解构非常赞!结合 Promise.all 和 解构和 await 会使代码变得更加的简洁

```js
const [user, account] = await Promise.all([fetch("/user"), fetch("/account")]);
```

注：console.table() 有一个隐藏的特性，如果某项数值为空字符串，则这一项不会显示在列表里

如：

console.table({"notdown_type":""})
所以有时候不好用
