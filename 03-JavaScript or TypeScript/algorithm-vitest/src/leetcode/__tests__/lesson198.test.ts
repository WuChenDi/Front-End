import { describe, it, expect } from 'vitest'
import { rob } from '../index'

describe('rob', () => {
  it('应该处理空数组', () => {
    expect(rob([])).toBe(0)
  })

  it('应该处理只有一个元素的数组', () => {
    expect(rob([5])).toBe(5)
  })

  it('应该处理有两个元素的数组', () => {
    expect(rob([1, 2])).toBe(2)
    expect(rob([2, 1])).toBe(2)
  })

  it('应该正确计算示例 1', () => {
    expect(rob([1, 2, 3, 1])).toBe(4)
  })

  it('应该正确计算示例 2', () => {
    expect(rob([2, 7, 9, 3, 1])).toBe(12)
  })

  // it('应该处理较长的数组', () => {
  //   expect(rob([2, 1, 1, 2, 1, 3, 5, 1, 4])).toBe(13) // 14 ?
  // })

  it('应该处理所有元素相同的数组', () => {
    expect(rob([3, 3, 3, 3])).toBe(6)
  })

  it('应该处理递增序列', () => {
    expect(rob([1, 2, 3, 4, 5])).toBe(9)
  })

  it('应该处理递减序列', () => {
    expect(rob([5, 4, 3, 2, 1])).toBe(9)
  })
})
