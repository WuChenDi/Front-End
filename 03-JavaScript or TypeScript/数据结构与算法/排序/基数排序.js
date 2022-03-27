function radixSort(arr) {
  console.time("基数排序耗时");

  if (!Array.isArray(arr)) return;

  let maxLength = 0;
  for (let v of arr) {
    const { length } = String(v);
    if (length > maxLength) {
      maxLength = length;
    }
  }
  for (i = 0; i < maxLength; i++) {
    arr = sort(arr, i);
  }

  function sort(arr, index) {
    let buckets = [];
    for (let i = 0; i < 10; i++) {
      buckets.push([]);
    }
    for (let v of arr) {
      let pad = String(v).padStart(maxLength, "0");
      let num = pad[maxLength - 1 - index];
      buckets[num].push(v);
    }
    let result = [];
    for (let bucket of buckets) {
      result.push(...bucket);
    }
    return result;
  }
  console.timeEnd("基数排序耗时");
  return arr;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = radixSort(array);
console.log(`radixSort排序之后newArr: ${newArr}`);
