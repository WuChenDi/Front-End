function quickSort(arr) {
  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length <= 1) return arr;

  const pivotIndex = length >> 1;
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];

  for (let i of Object.keys(arr)) {
    arr[i] <= pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = quickSort(array);
console.log(`quickSort排序之后newArr: ${newArr}`);
