function mergeSort(arr) {
  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length < 2) return arr;

  const m = length >> 1,
    left = mergeSort(arr.slice(0, m)),
    right = mergeSort(arr.slice(m));

  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  if (i < left.length) {
    result.push(...left.slice(i));
  } else {
    result.push(...right.slice(j));
  }
  return result;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = mergeSort(array);
console.log(`mergeSort排序之后newArr: ${newArr}`);
