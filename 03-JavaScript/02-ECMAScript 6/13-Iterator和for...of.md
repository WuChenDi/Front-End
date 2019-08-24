# Iterator 和 for...of 循环

## 什么是 Iterator 接口

## Iterator 的基本用法

## for...of

```js
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
                            done: false
                        };
                    } else {
                        return {
                            value: arr[index++],
                            done: true
                        };
                    }
                }
            };
        }
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
