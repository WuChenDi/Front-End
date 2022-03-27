// function insertionSort(arr) {
//   console.time("插入排序耗时");
//   if (!Array.isArray(arr)) return;

//   const { length } = arr;

//   if (length <= 1) return;

//   let preIndex, current;
//   for (let i = 1; i < length; i++) {
//     preIndex = i - 1;
//     current = arr[i];
//     while (preIndex >= 0 && arr[preIndex] > current) {
//       arr[preIndex + 1] = arr[preIndex];
//       preIndex--;
//     }
//     if (preIndex + 1 != i) {
//       arr[preIndex + 1] = current;
//       console.log("arr:", arr);
//     }
//   }
//   console.timeEnd("插入排序耗时");
//   return arr;
// }

function insertionSort(arr) {
  console.time("插入排序耗时");
  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length <= 1) return arr;

  for (let i = 1; i < length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  console.timeEnd("插入排序耗时");
  return arr;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = insertionSort(array);
console.log(`insertionSort排序之后newArr: ${newArr}`);
