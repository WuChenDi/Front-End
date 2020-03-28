```js
// const input = {
//   a: 1,
//   b: 2
// };
// const test = {
//   d: 5
// };

// const output = {
//   ...input,
//   ...test,
//   c: 3
// };

// console.log(input, output); // {a:1, b:2} {a:1, b:2, d:5, c:3}
// input.a = 4;

// console.log(input, output); // {a:4, b:2} {a:1, b:2, d:5, c:3}

const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
};

const { a, b, ...rest } = input;

console.log(a, b, rest); // 1 2 {c:3, d:4, e:5}
```
