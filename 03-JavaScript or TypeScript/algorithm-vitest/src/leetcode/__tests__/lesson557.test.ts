/* eslint-disable @typescript-eslint/quotes */
import { describe, it, expect } from 'vitest'
import { reverseWords } from '../index'

describe('reverseWords', () => {
  // 1. 测试基本案例
  it("1. should reverse words in the string 'Let's take LeetCode contest'", () => {
    expect(reverseWords("Let's take LeetCode contest")).toBe(
      "s'teL ekat edoCteeL tsetnoc"
    )
  })

  // 2. 测试只有一个单词
  it("2. should reverse a single word 'hello'", () => {
    expect(reverseWords('hello')).toBe('olleh')
  })

  // 3. 测试多个空格
  it("3. should handle multiple spaces 'a  bc   d'", () => {
    expect(reverseWords('a  bc   d')).toBe('a  cb   d')
  })

  // 4. 测试包含标点符号
  it("4. should handle punctuation 'hello, world!'", () => {
    expect(reverseWords('hello, world!')).toBe(',olleh !dlrow')
  })

  // 5. 测试空字符串
  it('5. should return empty string when input is empty', () => {
    expect(reverseWords('')).toBe('')
  })
})
