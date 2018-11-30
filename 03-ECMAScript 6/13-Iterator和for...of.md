# Iterator和for...of循环
## 什么是Iterator接口
## Iterator的基本用法
## for...of
```js
{
  let arr = ['hello', 'world'];
  let map = arr[Symbol.iterator]();
  console.log(map.next());
  console.log(map.next());
  console.log(map.next());
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
            }
          } else {
            return {
              value: arr[index++],
              done: true
            }
          }
        }
      }
    }
  }
  for (let key of obj) {
    console.log(key);
  }
}

{
  let arr = ['hello', 'world'];
  for (let value of arr) {
    console.log('value', value);
  }
}
```