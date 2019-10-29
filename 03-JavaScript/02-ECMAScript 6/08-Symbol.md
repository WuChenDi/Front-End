# Symbol

## ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。

## 基本数据类型有 6 种：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）

```js
{
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1 === a2); // false

    let a3 = Symbol.for("a3");
    let a4 = Symbol.for("a3");
    console.log(a3 === a4); // true
}

{
    let a1 = Symbol.for("abc");
    let obj = {
        [a1]: "123",
        abc: 345,
        c: 456
    };
    console.log("obj", obj); // obj { abc: 345, c: 456, [Symbol(abc)]: '123' }

    for (let [key, value] of Object.entries(obj)) {
        console.log("let of", key, value);
        // let of abc 345
        // let of c 456
    }

    Object.getOwnPropertySymbols(obj).forEach(function(item) {
        console.log(obj[item]); // 123
    });

    Reflect.ownKeys(obj).forEach(function(item) {
        console.log("ownkeys", item, obj[item]);
        // ownkeys abc 345
        // ownkeys c 456
    });
}
```
