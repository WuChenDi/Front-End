# BigInt

新的原始数据类型：BigInt，表示一个任意精度的整数，可以表示超长数据，可以超出 2 的 53 次方。

```javascript
// js 中 Number类型只能安全的表示-(2^53-1)至 2^53-1 范的值
console.log(2 ** 53); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

BigInt

```javascript
const bigInt = 9007199254740993n;
console.log(bigInt); // 9007199254740993n
console.log(typeof bigInt); // bigint

console.log(1n == 1); // true
console.log(1n === 1); // false

const bigIntNum = BigInt(9007199254740993n);
console.log(bigIntNum); // 9007199254740993n
```
