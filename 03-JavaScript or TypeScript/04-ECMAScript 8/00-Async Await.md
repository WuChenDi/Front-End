```js
// async function firstAsync () {
//   return 27
// }

// console.log(firstAsync() instanceof Promise)  // true

// firstAsync().then(val => {
//   console.log(val) // 27
// })
//

async function firstAsync() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("now it is done");
    }, 1000);
  });

  console.log(await promise);
  console.log(await 0);
  console.log(await Promise.resolve(1));
  console.log(2);
  return Promise.resolve(3);
}

firstAsync().then(val => {
  console.log(val);
});
// now it is done
// 0
// 1
// 2
// 3
```
