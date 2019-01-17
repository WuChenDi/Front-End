- let const
- es6 强制开启严格模式
- es5 开启严格模式要添加 "use strict"
```js
function test() {
  // Duplicate declaration "a" 
  // let不允许在相同作用域内重复声明同一个变量，即同一个作用域内不允许出现名称相同的变量。
  let a = 1;
  // let a = 2;
  console.log(a);
}

function test1() {
  // 块作用域
  for (let i = 1; i < 3; i++) {
    console.log(i);
  }
  // console.log(i);
}

function last() {
  // const用于声明常量，一旦声明，必须立即赋值，且以后不可更改。
  const PI = 3.1415926;
  // const PI;
  // PI = 8;
  // 这里的k为对象的时候，对象是引用类型，这里的返回值是对象的指针，k是指向这个对象存储的这个指针，这个指针是不变的，但是，对象本身是可以变的
  const k = {
    a: 1
  }
  k.b = 3;
  console.log(PI, k);
}

test();
test1();
last();
```