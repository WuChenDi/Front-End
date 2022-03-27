function bubbleSort(arr) {
  console.time("冒泡排序耗时");

  if (!Array.isArray(arr)) return;

  const { length = 0 } = arr;
  if (length <= 1) return;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  console.timeEnd("冒泡排序耗时");
  return arr;
}

function bubbleSortOptimize(arr) {
  console.time("优化-冒泡排序耗时");

  if (!Array.isArray(arr)) return;

  const { length } = arr;
  if (length <= 1) return;

  for (let i = 0; i < length - 1; i++) {
    let changeState = false;
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        changeState = true;
      }
    }

    if (!changeState) break;
  }
  console.timeEnd("优化-冒泡排序耗时");
  return arr;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = bubbleSort(array);
console.log(`bubbleSort排序之后newArr: ${newArr}`);

console.log("----------------------------");

const array2 = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array2}`);
const newArr2 = bubbleSortOptimize(array2);
console.log(`bubbleSortOptimize排序之后newArr: ${newArr2}`);
