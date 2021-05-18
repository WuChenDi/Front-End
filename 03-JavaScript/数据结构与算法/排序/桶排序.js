function bucketSort(array, bucketSize = 5) {
  console.time("桶排序耗时");

  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length === 0) return array;


  console.timeEnd("桶排序耗时");
  return result;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = bucketSort(array);
console.log(`bucketSort排序之后newArr: ${newArr}`);
