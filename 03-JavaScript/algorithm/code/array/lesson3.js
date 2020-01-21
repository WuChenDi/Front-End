export default (arr, n) => {
  let max = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        max++;
        i++;
      } else if (arr[i - 1] === 0 && arr[i + 1] === 0) {
        max++;
        i++;
      }
    }
  }

  return max >= n;
};
