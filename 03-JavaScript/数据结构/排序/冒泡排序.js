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
  console.log(`result: ${arr}`);
  console.timeEnd("冒泡排序耗时");
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
  console.log(`优化-result: ${arr}`);
  console.timeEnd("优化-冒泡排序耗时");
}

const arr = [7, 8, 4, 5, 6, 3, 2, 1];
bubbleSort(arr);
// result: 1,2,3,4,5,6,7,8
// 冒泡排序耗时: 4.7ms

const arr2 = [7, 8, 4, 5, 6, 3, 2, 1];
bubbleSortOptimize(arr2);
// 优化-result: 1,2,3,4,5,6,7,8
// 优化-冒泡排序耗时: 0.136ms
