export function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let count = 1
  let sum = 0

  for (const val of flowerbed) {
    if (val === 1) {
      if (count > 1) sum += Math.floor((count - 1) / 2)
      count = 0
    } else {
      count++
    }
  }

  if (count > 1) sum += Math.floor(count / 2)

  return sum >= n
}
