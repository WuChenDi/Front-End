function selectionSort(arr) {
  console.time("选择排序耗时");

  if (!Array.isArray(arr)) return;

  const { length } = arr;

  for (let i = 0; i < length - 1; i++) {
    let min = arr[i],
      minIndex = i,
      step = 0;
    for (let j = i + 1; j < length; j++) {
      step++;
      if (min > arr[j]) {
        min = arr[j];
        minIndex = j;
      }
    }
    console.log(
      `Step${i + 1}: ${arr}, min: ${min}, minIndex: ${minIndex}, length: ${step}`
    );

    [arr[i], arr[minIndex]] = [min, arr[i]];
  }

  console.timeEnd("选择排序耗时");
  return arr;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = selectionSort(array);
console.log(`selectionSort排序之后newArr: ${newArr}`);
