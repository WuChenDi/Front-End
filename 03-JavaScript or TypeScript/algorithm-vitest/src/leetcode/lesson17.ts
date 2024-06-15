export function letterCombinations(str: string): string[] {
  if (str.length <= 0) return []

  // 建立电话号码键盘映射
  const map: string[] = [
    '',
    '1',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ]

  // 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
  const digits: string[] = str.split('')

  // 保存键盘映射后的字母内容，如 23=>['abc','def']
  const letterMaps: string[] = digits.map((d) => map[Number.parseInt(d)])

  if (digits.length === 1) {
    return letterMaps[0].split('')
  }

  // 生成组合的递归函数
  const comb = (prefix: string, arr: string[]): string[] => {
    if (arr.length === 0) return [prefix]

    const result: string[] = []
    const letters = arr[0]

    for (let i = 0; i < letters.length; i++) {
      result.push(...comb(prefix + letters[i], arr.slice(1)))
    }

    return result
  }

  return comb('', letterMaps)
}
