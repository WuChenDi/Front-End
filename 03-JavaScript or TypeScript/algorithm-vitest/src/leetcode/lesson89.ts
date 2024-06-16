export function grayCode(n: number): string[] {
  if (n === 0) {
    // 基础情况：n为0时直接返回空数组
    return []
  }
  // 递归函数，用来计算输入为n的格雷编码序列
  const make = (n: number): string[] => {
    if (n === 1) {
      return ['0', '1']
    } else {
      const prev = make(n - 1)
      const result: string[] = []
      const max = 2 ** n - 1
      for (let i = 0; i < prev.length; i++) {
        result[i] = `0${prev[i]}`
        result[max - i] = `1${prev[i]}`
      }
      return result
    }
  }
  return make(n)
}
