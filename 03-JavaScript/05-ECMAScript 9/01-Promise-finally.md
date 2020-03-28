```js
const Gen = time => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (time < 500) {
        reject(time);
      } else {
        resolve(time);
      }
    }, time);
  });
};

Gen(Math.random() * 1000)
  .then(val => console.log("resolve", val))
  .catch(err => console.log("reject", err))
  .finally(() => {
    console.log("finish");
  });
```
