import { describe, it, expect } from 'vitest'
import { grayCode } from '../index'

describe('grayCode Gray Code Generator Testing', () => {
  it('1. 应对 n=1 生成正确的格雷编码序列', () => {
    const n = 1
    const expectedOutput = ['0', '1']
    expect(grayCode(n)).toEqual(expectedOutput)
  })

  it('2. 应对 n=2 生成正确的格雷编码序列', () => {
    const n = 2
    const expectedOutput = ['00', '01', '11', '10']
    expect(grayCode(n)).toEqual(expectedOutput)
  })

  it('3. 应对 n=3 生成正确的格雷编码序列', () => {
    const n = 3
    const expectedOutput = ['000', '001', '011', '010', '110', '111', '101', '100']
    expect(grayCode(n)).toEqual(expectedOutput)
  })

  it('4. 应对 n=0 生成空序列', () => {
    const n = 0
    const expectedOutput: string[] = []
    expect(grayCode(n)).toEqual(expectedOutput)
  })
})
