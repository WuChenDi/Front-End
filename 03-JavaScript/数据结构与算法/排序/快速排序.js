function quickSort(arr) {
  if (!Array.isArray(arr)) return;

  const { length } = arr;

  if (length <= 1) return arr;

  const pivotIndex = Math.floor(length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];

  for (let i of Object.keys(arr)) {
    arr[i] <= pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

const array2 = [5, 4, 3, 2, 1];
console.log("quickSort", quickSort(array2));
