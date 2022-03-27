# Generator

### 基本概念
Generators 是可以用来控制迭代器的函数
### 语法/使用
```javascript
{
  // genertaor基本定义
  let tell = function* () {
    yield "a";
    yield "b";
    return "c";
  };

  let k = tell();

  console.log(k.next()); // { value: 'a', done: false }
  console.log(k.next()); // { value: 'b', done: false }
  console.log(k.next()); // { value: 'c', done: true }
  console.log(k.next()); // { value: undefined, done: true }
}

```

- 函数内部用 yield 来控制程序的执行的 "暂停"，并返回一个对象，这个对象包括两个属性：value 和 done
- 函数的返回值通过调用 next 来 "恢复" 程序执行
- Generator 函数的定义不能使用箭头函数，否则会触发 SyntaxError 错误



generator（生成器）是 ES6 标准引入的新的数据类型。一个 generator 看上去像一个函数，但可以返回多次。


```javascript
{
  let obj = {};
  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  for (let value of obj) {
    console.log("value", value);
  }
  // value 1
  // value 2
  // value 3
}

{
  let state = function* () {
    while (1) {
      yield "A";
      yield "B";
      yield "C";
    }
  };
  let status = state();
  console.log(status.next()); // { value: 'A', done: false }
  console.log(status.next()); // { value: 'B', done: false }
  console.log(status.next()); // { value: 'C', done: false }
  console.log(status.next()); // { value: 'A', done: false }
  console.log(status.next()); // { value: 'B', done: false }
}

// {
//   let state = async function () {
//     while (1) {
//       await "A";
//       await "B";
//       await "C";
//     }
//   };
//   let status = state();
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
//   console.log(status.next());
// }

{
  let draw = function (count) {
    //具体抽奖逻辑
    console.info(`剩余${count}次`);
  };

  let residue = function* (count) {
    while (count > 0) {
      count--;
      yield draw(count);
    }
  };

  let star = residue(5);
  let btn = document.createElement("button");
  btn.id = "start";
  btn.textContent = "抽奖";
  document.body.appendChild(btn);
  document.getElementById("start").addEventListener(
    "click",
    function () {
      star.next();
    },
    false
  );
}

{
  // 长轮询
  let ajax = function* () {
    yield new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({
          code: 0,
        });
      }, 200);
    });
  };

  let pull = function () {
    let genertaor = ajax();
    let step = genertaor.next();
    step.value.then(function (d) {
      if (d.code != 0) {
        setTimeout(function () {
          console.info("wait");
          pull();
        }, 1000);
      } else {
        console.info(d); // { code: 0 }
      }
    });
  };

  pull();
}
```
