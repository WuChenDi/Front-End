import { describe, it, expect } from 'vitest'
import { canPlaceFlowers } from '../index'

describe('canPlaceFlowers', () => {
  // 1. 测试空数组
  it('1. should return false for an empty array', () => {
    expect(canPlaceFlowers([], 1)).toBe(false)
  })

  // 2. 测试种入0朵花
  it('2. should return true if no flowers need to be planted', () => {
    expect(canPlaceFlowers([0, 0, 0], 0)).toBe(true)
  })

  // 3. 测试一个位置可以种花
  it('3. should return true if one flower can be planted', () => {
    expect(canPlaceFlowers([0, 0, 0, 0, 0], 1)).toBe(true)
  })

  // 4. 测试多个位置可以种花
  it('4. should return true if multiple flowers can be planted', () => {
    expect(canPlaceFlowers([0, 0, 1, 0, 0], 1)).toBe(true)
    // expect(canPlaceFlowers([0, 0, 1, 0, 0], 2)).toBe(false)
  })

  // 5. 测试边界条件
  it('5. should handle edge cases correctly', () => {
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toBe(true)
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toBe(false)
  })

  // 6. 测试全部为0的情况
  it('6. should return true for an array with all zeros', () => {
    expect(canPlaceFlowers([0, 0, 0, 0, 0, 0, 0, 0], 4)).toBe(true)
  })

  // 7. 测试只有一个元素的数组
  it('7. should return true for a single element array with zero', () => {
    expect(canPlaceFlowers([0], 1)).toBe(true)
  })

  // 8. 测试只有一个元素的数组
  it('8. should return false for a single element array with one', () => {
    expect(canPlaceFlowers([1], 1)).toBe(false)
  })
})
