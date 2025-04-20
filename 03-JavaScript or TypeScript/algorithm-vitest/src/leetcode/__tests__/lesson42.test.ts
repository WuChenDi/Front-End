import { describe, it, expect } from 'vitest'
import { trap } from '../index'

describe('trap', () => {
  it('应该返回正确的接雨水量 - 示例1', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6)
  })

  it('应该返回正确的接雨水量 - 示例2', () => {
    expect(trap([4, 2, 0, 3, 2, 5])).toBe(9)
  })

  it('当高度数组为空或只有一个元素时应返回0', () => {
    expect(trap([])).toBe(0)
    expect(trap([5])).toBe(0)
  })

  it('当没有形成凹槽时应返回0', () => {
    expect(trap([1, 2, 3, 4, 5])).toBe(0)
    expect(trap([5, 4, 3, 2, 1])).toBe(0)
  })

  it('处理平坦地形', () => {
    expect(trap([3, 3, 3, 3])).toBe(0)
  })

  it('处理复杂地形', () => {
    expect(trap([5, 2, 1, 2, 1, 5])).toBe(14)
  })
})
