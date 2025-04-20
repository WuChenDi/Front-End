import { describe, it, expect } from 'vitest'
import { trapRainWater } from '../index'

describe('trapRainWater', () => {
  it('应该正确计算简单矩阵的积水量', () => {
    const heightMap = [
      [1, 4, 3, 1, 3, 2],
      [3, 2, 1, 3, 2, 4],
      [2, 3, 3, 2, 3, 1]
    ]
    expect(trapRainWater(heightMap)).toBe(4)
  })

  it('应该正确计算复杂矩阵的积水量', () => {
    const heightMap = [
      [12, 13, 1, 12],
      [13, 4, 13, 12],
      [13, 8, 10, 12],
      [12, 13, 12, 12],
      [13, 13, 13, 13]
    ]
    expect(trapRainWater(heightMap)).toBe(14)
  })

  it('应该处理没有积水的情况', () => {
    const heightMap = [
      [3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3]
    ]
    expect(trapRainWater(heightMap)).toBe(0)
  })

  it('应该处理空矩阵', () => {
    expect(trapRainWater([])).toBe(0)
  })

  it('应该处理单行矩阵', () => {
    const heightMap = [[1, 2, 3, 4, 5]]
    expect(trapRainWater(heightMap)).toBe(0)
  })

  it('应该处理单列矩阵', () => {
    const heightMap = [[1], [2], [3], [4], [5]]
    expect(trapRainWater(heightMap)).toBe(0)
  })
})
