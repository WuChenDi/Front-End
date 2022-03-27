export default (n) => {
  // 递归函数，用来算输入为n的格雷编码序列
  let make = (n) => {
    if (n === 1) {
      return ['0', '1']
    } else {
      let prev = make(n - 1)
      let result = []
      let max = Math.pow(2, n) - 1
      for (let i = 0; i < prev.length; i++) {
        result[i] = `0${prev[i]}`
        result[max - i] = `1${prev[i]}`
      }
      return result
    }
  }
  return make(n)
}
