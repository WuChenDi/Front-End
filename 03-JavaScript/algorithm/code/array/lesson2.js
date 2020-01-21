export default arr => {
  arr.sort((a, b) => {
    a - b;
  });
  let min = Number.MAX_SAFE_INTEGER;
  let dst = [];
  let result = true;
  let tmp = [];
  for (let i = 0; i < arr.length; i++) {
    tmp.push(arr[i]);
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[i] === arr[j]) {
        tmp.push(arr[j]);
      } else {
        if (min > tmp.length) {
          min = tmp.length;
        }
        dst.push([].concat(tmp));
        tmp.length = 0;
        i = j;
        break;
      }
    }
  }
  dst.every(item => {
    if (item.length % min !== 0) {
      result = false;
      return false;
    }
  });
  return result;
};
