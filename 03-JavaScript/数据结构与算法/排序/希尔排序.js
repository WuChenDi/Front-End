function shellSort(arr) {
  console.time("希尔排序耗时");

  if (!Array.isArray(arr)) return;

  const { length } = arr;
  let temp,
    log,
    step = 1,
    gap = length;

  // (gap = Math.trunc(gap/2)) == (gap >>= 1)
  while (gap > 0 && (gap >>= 1)) {
    console.log(`Gap is ${gap}`);
    for (let i = gap; i < length; i++) {
      temp = arr[i];
      let j = i - gap;
      while (j >= 0 && arr[j] > temp) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j + gap] = temp;

      log = "";
      arr.forEach((v, i) => {
        log += `${v}\t${(i + 1) % gap === 0 ? "\n" : ""}`;
      });
      console.log(`Step ${step++}: \n${log}`);
    }
  }
  console.timeEnd("希尔排序耗时");
  return arr;
}

const array = Array.from(new Array(10), () => ~~(Math.random() * 100));
console.log(`原始array: ${array}`);
const newArr = shellSort(array);
console.log(`insertionSort排序之后newArr: ${newArr}`);
