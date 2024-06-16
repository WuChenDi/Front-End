import { describe, it, expect } from 'vitest'
import {hasGroupsSizeX} from '../index'

describe('hasGroupsSizeX', () => {
  // 1. 基本测试
  it('1. should return true for deck [1,2,3,4,4,3,2,1]', () => {
    expect(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1])).toBe(true)
  })

  // 2. 测试长度为1的数组
  it('2. should return false for deck [1]', () => {
    expect(hasGroupsSizeX([1])).toBe(false)
  })

  // 3. 测试无法分组的数组
  it('3. should return false for deck [1,1,1,2,2,2,3,3]', () => {
    expect(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3])).toBe(false)
  })

  // 4. 测试可以分组的数组
  it('4. should return true for deck [1,1,2,2,2,2]', () => {
    expect(hasGroupsSizeX([1, 1, 2, 2, 2, 2])).toBe(true)
  })

  // 5. 测试只有相同元素的数组
  it('5. should return true for deck [1,1,1,1]', () => {
    expect(hasGroupsSizeX([1, 1, 1, 1])).toBe(true)
  })

  // 6. 测试多组相同元素的数组
  it('6. should return true for deck [1,1,2,2,3,3,4,4]', () => {
    expect(hasGroupsSizeX([1, 1, 2, 2, 3, 3, 4, 4])).toBe(true)
  })

  // 7. 测试不同元素的数组
  it('7. should return false for deck [1,2,3,4]', () => {
    expect(hasGroupsSizeX([1, 2, 3, 4])).toBe(false)
  })

  // 8. 测试空数组
  it('8. should return false for an empty array', () => {
    expect(hasGroupsSizeX([])).toBe(false)
  })
})
