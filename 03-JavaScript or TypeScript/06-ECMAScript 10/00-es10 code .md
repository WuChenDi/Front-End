```js
// JSON.stringify() 0xD800-0xDFFF
console.log(JSON.stringify("\u{D800}")); // "\ud800"

// flat(depth) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
// depth 指定要提取嵌套数组的结构深度，默认值为 1。
let arr = [1, [2, 3], [4, 5, [6, 7, [8, 9]]]];
console.log(arr.flat(4)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

let arr1 = [1, 2, 3];
console.log(arr1.map(item => [item * 2]).flat()); // [2, 4, 6]
console.log(arr1.flatMap(item => [item * 2])); // [2, 4, 6]


let str = "   foo   ";
console.log(str.replace(/^\s+|\s+$/g, "")); // foo
console.log(str.trimLeft()); // foo   
console.log(str.trimRight()); //    foo
// console.log(str.trimStart()); // foo   
// console.log(str.trimEnd()); //    foo
console.log(str.trim()); // foo


let str = `"foo" and "bar" and "baz"`;

function select(regExp, str) {
  const matches = [];
  while (true) {
    const match = regExp.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }
  return matches;
}
console.log(select(/"([^"]*)"/g, str));
console.log(str.match(/"([^"]*)"/));

function select1(regExp, str) {
  const matches = [];
  str.replace(regExp, function(all, first) {
    matches.push(first);
  });
  return matches;
}
console.log(select1(/"([^"]*)"/g, str));

function select2(regExp, str) {
  const matches = [];
  for (const match of str.matchAll(regExp)) {
    matches.push(match[1]);
  }
  return matches;
}
console.log(select2(/"([^"]*)"/g, str));

const arr = [
  ["foo", 1],
  ["bar", 2]
];
const obj = Object.fromEntries(arr);
console.log(obj.bar);

const obj1 = {
  abc: 1,
  def: 2,
  ghksks: 3
};

let res = Object.fromEntries(
  Object.entries(obj1).filter(([key, val]) => key.length === 3)
);

console.log(res);
try {
  // console.log();
} catch {}
BigInt;

console.log(11n);
```
