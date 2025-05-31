import { describe, it, expect } from 'vitest'
import { evalRPN } from '../index'

describe('evalRPN', () => {
  // 测试基本加法和乘法
  it('should correctly evaluate (2 + 1) * 3', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toBe(9)
  })

  // 测试加法和除法
  it('should correctly evaluate 4 + (13 / 5)', () => {
    expect(evalRPN(['4', '13', '5', '/', '+'])).toBe(6)
  })

  // 测试复杂表达式
  it('should correctly evaluate ((10 * (6 / ((9 + 3) * -11))) + 17) + 5', () => {
    expect(
      evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])
    ).toBe(22)
  })

  // 测试单个数字
  it('should handle single number input', () => {
    expect(evalRPN(['42'])).toBe(42)
  })

  // 测试负数
  it('should handle negative numbers', () => {
    expect(evalRPN(['-5', '3', '+'])).toBe(-2)
  })

  // 测试除法向零截断
  it('should truncate division toward zero', () => {
    expect(evalRPN(['10', '3', '/'])).toBe(3)
    expect(evalRPN(['-10', '3', '/'])).toBe(-3)
  })

  // 测试无效表达式：操作数不足
  it('should throw error for not enough operands', () => {
    expect(() => evalRPN(['2', '+'])).toThrow('Invalid expression: not enough operands')
  })

  // 测试无效表达式：操作数过多
  it('should throw error for too many operands', () => {
    expect(() => evalRPN(['2', '3', '4'])).toThrow(
      'Invalid expression: too many operands'
    )
  })

  // 测试无效标记
  it('should throw error for invalid token', () => {
    expect(() => evalRPN(['2', 'abc', '+'])).toThrow('Invalid token: abc')
  })

  // 测试无效运算符
  it('should throw error for invalid operator', () => {
    expect(() => evalRPN(['2', '3', '%'])).toThrow('Invalid token: %')
  })
})
