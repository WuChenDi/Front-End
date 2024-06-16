export function hasGroupsSizeX(deck: number[]): boolean {
  // if (deck.length === 0) return false

  // deck.sort((a, b) => a - b)
  // let min = Number.MAX_SAFE_INTEGER
  // const dst: number[][] = []
  // let result = true
  // const tmp: number[] = []

  // for (let i = 0; i < deck.length; i++) {
  //   tmp.push(deck[i])
  //   for (let j = i + 1; j < deck.length; j++) {
  //     if (deck[i] === deck[j]) {
  //       tmp.push(deck[j])
  //     } else {
  //       if (min > tmp.length) {
  //         min = tmp.length
  //       }
  //       dst.push([].concat(tmp))
  //       tmp.length = 0
  //       i = j - 1
  //       break
  //     }
  //   }
  // }

  // if (tmp.length > 0) {
  //   if (min > tmp.length) {
  //     min = tmp.length
  //   }
  //   dst.push([].concat(tmp))
  // }

  // dst.every((item) => {
  //   if (item.length % min !== 0) {
  //     result = false
  //     return false
  //   }
  //   return true
  // })

  // return result

  // 计算两个数的最大公约数
  const gcd = (num1: number, num2: number): number => {
    return num2 === 0 ? num1 : gcd(num2, num1 % num2)
  }

  // 统计每个数字出现的频率
  const timeMap = new Map<number, number>()
  deck.forEach((num) => {
    timeMap.set(num, (timeMap.get(num) || 0) + 1)
  })

  // 计算所有频率的最大公约数
  const timeArray = [...timeMap.values()]
  let g = timeArray[0]
  for (let i = 1; i < timeArray.length; i++) {
    g = gcd(g, timeArray[i])
  }

  // 判断最大公约数是否大于等于2
  return g >= 2
}
