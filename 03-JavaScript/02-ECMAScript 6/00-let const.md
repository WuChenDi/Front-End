-   let const
-   es6 强制开启严格模式
-   es5 开启严格模式要添加 "use strict"

```js
{
    // let不允许在相同作用域内重复声明同一个变量，即同一个作用域内不允许出现名称相同的变量。
    let a = 1;
    let a = 2; // Identifier 'a' has already been declared
    console.log(a); // 1

    // let声明的变量只在它所在的代码块有效。
    // for循环的计数器，就很合适使用let命令
    for (let i = 0; i < 10; i++) {
        // ...
    }

    console.log(i);
    // ReferenceError: i is not defined
    // 计数器i只在for循环体内有效，在循环体外引用就会报错。
}

{
    // const用于声明常量，一旦声明，必须立即赋值，且以后不可更改。
    // 使用const声明对象的时候，只能保证对象的引用地址不被更改，并非此对象不被修改。
    const PI = 3.1415926;
    PI; // 3.1415926

    PI = 3; // TypeError: Assignment to constant variable.

    // 解释：这里的k为对象的时候，对象是引用类型，这里的返回值是对象的指针，k是指向这个对象存储的这个指针，这个指针是不变的，但是，对象本身是可以变的
    const k = {
        a: 1
    };
    k.b = 3;
    console.log(PI, k); // 3.1415926 {a: 1, b: 3}
}
```
