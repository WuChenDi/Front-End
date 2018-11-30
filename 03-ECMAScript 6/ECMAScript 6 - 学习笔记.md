# 整理ES6笔记

## 一. let和const

* 在JavaScript中咱们以前主要用关键var来定义变量，ES6之后，新增了定义变量的两个关键字，分别是let和const。
* 对于变量来说，在ES5中var定义的变量会提升到作用域中所有的函数与语句前面，而ES6中let定义的变量则不会，let声明的变量会在其相应的代码块中建立一个暂时性死区，直至变量被声明。
* let和const都能够声明块级作用域，用法和var是类似的，let的特点是不会变量提升，而是被锁在当前块中。

一个非常简单的例子：
```js
function test() {
if(true) {
  console.log(a)//TDZ，俗称临时死区，用来描述变量不提升的现象
  let a = 1
}
}
test()  // a is not defined

function test() {
    if(true) {
      let a = 1
    }
    console.log(a)
}    
test() // a is not defined
```

唯一正确的使用方法：先声明，再访问。
```js
function test() {
    if(true) {
      let a = 1
      console.log(a)
    }
}
test() // 1
```
const：声明常量，一旦声明，不可更改，而且常量必须初始化赋值。
const虽然是常量，不允许修改默认赋值，但如果定义的是对象Object，那么可以修改对象内部的属性值。
```js
const type = {
  a: 1
}
type.a = 2 //没有直接修改type的值，而是修改type.a的属性值，这是允许的。
console.log(type) // {a: 2}
```

### **const和let的异同点**
* **相同点**：const和let都是在当前块内有效，执行到块外会被销毁，也不存在变量提升（TDZ），不能重复声明。
* **不同点**：const不能再赋值，let声明的变量可以重复赋值。
* **const**实际上保证的，**并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动**。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

### **块级作用域的使用场景**
* 除了上面提到的常用声明方式，我们还可以在循环中使用，最出名的一道面试题：循环中定时器闭包的考题
* 在for循环中使用var声明的循环变量，会跳出循环体污染当前的函数。
```js
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) //5, 5, 5, 5, 5
  }, 0)
}
console.log(i) //5 i跳出循环体污染外部函数

//将var改成let之后
for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) // 0,1,2,3,4
  }, 0)
}
console.log(i)//i is not defined i无法污染外部函数
```

在实际开发中，我们选择使用var、let还是const，取决于我们的变量是不是需要更新，通常我们希望变量保证不被恶意修改，而使用大量的const。使用const声明，声明一个对象的时候，也推荐使用const，当你需要修改声明的变量值时，使用let，var能用的场景都可以使用let替代。

### symbol
* ES6 以前，我们知道5种基本数据类型分别是Undefined，Null，Boolean，Number以及String，然后加上一种引用类型Object构成了JavaScript中所有的数据类型，但是ES6出来之后，新增了一种数据类型，名叫symbol，像它的名字表露的一样，意味着独一无二，意思是每个 Symbol类型都是独一无二的，不与其它 Symbol 重复。
* 可以通过调用 Symbol() 方法将创建一个新的 Symbol 类型的值，这个值独一无二，不与任何值相等。
```js
var mySymbol=Symbol();
console.log(typeof mySymbol) //"symbol"
```

## 二. 字符串

### ES6字符串新增的方法

* **UTF-16码位**：ES6强制使用UTF-16字符串编码。关于UTF-16的解释请自行百度了解。

* **codePointAt()**：该方法支持UTF-16，接受编码单元的位置而非字符串位置作为参数，返回与字符串中给定位置对应的码位，即一个整数值。

* **String.fromCodePoiont()**：作用与codePointAt相反，检索字符串中某个字符的码位，也可以根据指定的码位生成一个字符。

* **normalize()**：提供Unicode的标准形式，接受一个可选的字符串参数，指明应用某种Unicode标准形式。

* 在ES6中，新增了3个新方法。每个方法都接收2个参数，需要检测的子字符串，以及开始匹配的索引位置。

* **模板字符串**：字符串是JavaScript中基本类型之一，应该算是除了对象之外是使用最为频繁的类型吧，字符串中包含了例如substr，replace，indexOf,slice等等诸多方法，ES6引入了模板字符串的特性，用反引号来表示，可以表示多行字符串以及做到文本插值（利用模板占位符）。

```js
// 以前的多行字符串我们这么写：
console.log("hello world 1\n\
hello cala");
// "hello world
// hello cala"

//有了模板字符串之后
console.log(`hello world
string text line 2`);
// "hello world
// hello cala"
```

可以用${}来表示模板占位符，可以将你已经定义好的变量传进括弧中，例如：
```js
var name="cala";
var age=22;
console.log(`hello,I'am ${name},my age is ${age}`)
//hello,I'am cala,my age is 22
```

**includes(str, index)**：如果在字符串中检测到指定文本，返回true，否则false。
```js
let t = 'abcdefg'
if(t.includes('cde')) {
  console.log(2)
}
//true
```

**startsWith(str, index)**：如果在字符串起始部分检测到指定文本，返回true，否则返回false。
```js
let t = 'abcdefg'
if(t.startsWith('ab')) {
  console.log(2)
}
//true
```

**endsWith(str, index)**：如果在字符串的结束部分检测到指定文本，返回true，否则返回false。
```js
let t = 'abcdefg'
if(t.endsWith('fg')) {
  console.log(2)
}
//true
```

如果你只是需要匹配字符串中是否包含某子字符串，那么推荐使用新增的方法，如果需要找到匹配字符串的位置，使用indexOf()。

## 三. 函数

函数的默认参数

在ES5中，我们给函数传参数，然后在函数体内设置默认值，如下面这种方式。
```js
function a(num, callback) {
  num = num || 6
  callback = callback || function (data) {console.log('ES5: ', data)}
  callback(num * num)
}
a() //ES5: 36，不传参输出默认值

//你还可以这样使用callback
a(10, function(data) {
  console.log(data * 10) // 1000， 传参输出新数值
})
```

在ES6中，我们使用新的默认值写法
```js
function a(num = 6, callback = function (data) {console.log('ES6: ', data)}) {
  callback(num * num)
}

a() //ES6: 36， 不传参输出默认值

a(10, function(data) {
  console.log(data * 10) // 1000，传参输出新数值
})
```
## 四. 箭头函数

```js
const arr = [5, 10]
const s = arr.reduce((sum, item) => sum + item)
console.log(s) // 15
```
箭头函数中this的使用跟普通函数也不一样，在JavaScript的普通函数中，都会有一个自己的this值，主要分为：

**普通函数：**
1. 函数作为全局函数被调用时，this指向全局对象
2. 函数作为对象中的方法被调用时，this指向该对象
3. 函数作为构造函数的时候，this指向构造函数new出来的新对象
4. 还可以通过call，apply，bind改变this的指向

**箭头函数：**
1. 箭头函数没有this，函数内部的this来自于父级最近的非箭头函数，并且不能改变this的指向。
2. 箭头函数没有super
3. 箭头函数没有arguments
4. 箭头函数没有new.target绑定。
5. 不能使用new
6. 没有原型
7. 不支持重复的命名参数。

**箭头函数的简单理解**

1. 箭头函数的左边表示输入的参数，右边表示输出的结果。
```js
const s = a => a
console.log(s(2)) // 2
```
2. 在箭头函数中，this属于词法作用域，直接由上下文确定，对于普通函数中指向不定的this，箭头函数中处理this无疑更加简单，如下：
```js
//ES5普通函数
function Man(){
  this.age=22;
  return function(){
    this.age+1;
  }
}
var cala=new Man();
console.log(cala())//undefined

//ES6箭头函数
function Man(){
  this.age=22;
  return () => this.age+1;
}
var cala=new Man();
console.log(cala())//23
```

3. 箭头函数中没有arguments(我们可以用rest参数替代),也没有原型，也不能使用new 关键字，例如：
```js
//没有arguments
var foo=(a,b)=>{return arguments[0]*arguments[1]}
console.log(foo(3,5))
//arguments is not defined

//没有原型
var Obj = () => {};
console.log(Obj.prototype); 
// undefined

//不能使用new 关键字
var Obj = () => {"hello world"};
var o = new Obj(); 
// TypeError: Obj is not a constructor
```

4. 箭头函数给数组排序
```js
const arr = [10, 50, 30, 40, 20]
const s = arr.sort((a, b) => a - b)
console.log(s) // [10,20,30,40,50]
```

**尾调用优化**
尾调用是指在函数return的时候调用一个新的函数，由于尾调用的实现需要存储到内存中，在一个循环体中，如果存在函数的尾调用，你的内存可能爆满或溢出。

ES6中，引擎会帮你做好尾调用的优化工作，你不需要自己优化，但需要满足下面3个要求：
1. 函数不是闭包
2. 尾调用是函数最后一条语句
3. 尾调用结果作为函数返回

尾调用实际用途——递归函数优化
* 在ES5时代，我们不推荐使用递归，因为递归会影响性能。
* 但是有了尾调用优化之后，递归函数的性能有了提升。
```js
//新型尾优化写法
"use strict";  
function a(n, p = 1) {
  if(n <= 1) {
    return 1 * p
  }
  let s = n * p
  return a(n - 1, s)
}
//求 1 x 2 x 3的阶乘
let sum = a(3)
console.log(sum) // 6
```

## 五. ES6对象新增方法

* **Object.assign()**
* Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
* Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
* （String类型和 Symbol 类型的属性都会被拷贝。

* 合并对象
```js
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

* 合并具有相同属性的对象
```js
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };
var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

## 六. Map和Set

* Map和Set都叫做集合，但是他们也有所不同。Set常被用来检查对象中是否存在某个键名，Map集合常被用来获取已存的信息。
* Set是有序列表，含有相互独立的非重复值。

**Array和Set对比**
* 都是一个存储多值的容器，两者可以互相转换，但是在使用场景上有区别。如下:
* Array的indexOf方法比Set的has方法效率低下
* Set不含有重复值（可以利用这个特性实现对一个数组的去重）
* Set通过delete方法删除某个值，而Array只能通过splice。两者的使用方便程度前者更优
* Array的很多新方法map、filter、some、every等是Set没有的（但是通过两者可以互相转换来使用）

**Object和Map对比**
* Object是字符串-值，Map是值-值
* Object键为string类型,Map的键是任意类型
* 手动计算Object尺寸,Map.size可以获取尺寸
* Map的排序是插入顺序
* Object有原型，所以映射中有一些缺省的键。可以理解为Map=Object.create(null)

**Set操作集合**
```js
let set = new Set()
// Set转化为数组
let arr = Array.from(set)
let arr = [...set]
// 实例属性（继承自Set）
set.constructor === Set 
set.size 
// 操作方法
set.add(1) // 添加一个值
set.delete(1) //删除一个值
set.has(1) //判断是否有这个值（Array中的indexOf）
set.clear() //清除所有值
// 获取用于遍历的成员方法(Set的遍历顺序就是插入顺序)
set.keys() // 返回键名的遍历器
set.values() // 返回键值得遍历器
set.entries() // 返回键值对的遍历器
set.forEach() // 循环遍历每个值(和Array的方法一致)
for (let key of set.keys()){}
for (let val of set.values()){}
for (let entry of set.entries()){}
// 使用数组方法来处理set值
set = new Set(arr)
set = new Set([...set].map((x) => x = x * 2))
set = new Set([...set].filter((x) => x > 2))
```

**Map的方法集合**
```js
let map = new Map()
// 实例属性(继承自Map)
map.constructor === Map
map.size
// 操作方法
map.set(1,2)
map.get(1)
map.delete(1)
map.has(1)
map.clear()
// 遍历方法
map.keys()
map.values()
map.entries()
map.forEach()
// Map和数组的转换
map = new Map([['key','val'],[2,1]]) // 要求双成员数组
let arr = [...map]
// 值得注意的是Map的键是跟内存绑定的
map.set([1], 's')
map.get([1])
let arr = [1]
let arr1 = [1]
map.set(arr, 's')
map.get(arr)
map.set(arr1, 's')
map.get(arr1)
```

## 七. 迭代器（Iterator）

1. entries() 返回迭代器：返回键值对
```js
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.entries()) {
  console.log(v)
}
// [0, 'a'] [1, 'b'] [2, 'c']

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b'] ['c', 'c']

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b']
```

2. values() 返回迭代器：返回键值对的value
```js
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.values()) {
  console.log(v)
}
//'a' 'b' 'c'

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.values()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.values()) {
  console.log(v)
}
// 'a' 'b'
```

3. keys() 返回迭代器：返回键值对的key
```js
//数组
const arr = ['a', 'b', 'c'];
for(let v of arr.keys()) {
  console.log(v)
}
// 0 1 2

//Set
const arr = new Set(['a', 'b', 'c']);
for(let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for(let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b'
```

虽然上面列举了3种内建的迭代器方法，但是不同集合的类型还有自己默认的迭代器，在for of中，数组和Set的默认迭代器是values()，Map的默认迭代器是entries()。

**for of循环解构**

对象本身不支持迭代，但是我们可以自己添加一个生成器，返回一个key，value的迭代器，然后使用for of循环解构key和value。
```js
const obj = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    for(let i in obj) {
      yield [i, obj[i]]
    }
  }
}
for(let [key, value] of obj) {
  console.log(key, value)
}
// 'a' 1, 'b' 2
```

**字符串迭代器**
```js
const str = 'abc';
for(let v of str) {
  console.log(v)
}
// 'a' 'b' 'c'
```

## ES6给数组添加了几个新方法：find()、findIndex()、fill()、copyWithin()

1. find()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
```js
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1
```

2. findIndex()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索。
```js
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0
```

3. fill()：用新元素替换掉数组内的元素，可以指定替换下标范围。
```js
arr.fill(value, start, end)
```

4. copyWithin()：选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。
```js
arr.copyWithin(target, start, end)

const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3)) // [1,2,3,1,2] 从下标为3的元素开始，复制数组，所以4, 5被替换成1, 2

const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) // [1,2,3,2,3] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，所以4, 5被替换成2, 3

const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) // [1,2,3,2,5] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，结束位置为2，所以4被替换成2
```