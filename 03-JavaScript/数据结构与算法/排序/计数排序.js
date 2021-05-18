function countingSort(arr) {
  console.time("计数排序耗时");

  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length <= 1) return arr;

  let counts = [],
    result = [];
  let min = Math.min(...arr);
  for (let v of arr) {
    counts[v - min] = (counts[v - min] ?? 0) + 1;
  }
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    while (count > 0) {
      result.push(i + min);
      count--;
    }
  }

  console.timeEnd("计数排序耗时");
  return result;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = countingSort(array);
console.log(`countingSort排序之后newArr: ${newArr}`);

console.log("----------------------------");

// TODO: k远大于n，代码执行久,如下
const array1 = [1, 100000001, 9, 1000, 3000];
console.log(`原始array: ${array1}`);
const newArr1 = countingSort(array1);
console.log(`countingSort排序之后newArr: ${newArr1}`);
// 原始array: 1,100000001,9,1000,3000
// 计数排序耗时: 4.344s
// countingSort排序之后newArr: 1,9,1000,3000,100000001
