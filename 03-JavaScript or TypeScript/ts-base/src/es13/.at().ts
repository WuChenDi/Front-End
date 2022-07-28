{
  // 反向索引

  const arr = [1, 2]


  console.log(arr[arr.length - 1])  // 2
  // ↓↓
  console.log(arr.at(-1)) // 2

  console.log(arr[arr.length - 2])  // 1
  // ↓↓
  console.log(arr.at(-2)) // 1

  // 动态算出来也能变得简洁
  console.log([1, 2, 3].map(v => v + 1)[[1, 2, 3].map(v => v + 1).length - 1])  // 4
  console.log([1, 2, 3].map(v => v + 1).at(-1)) // 4
}
