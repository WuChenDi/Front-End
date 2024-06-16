import { describe, it, expect } from 'vitest'
import { findBinarySubstrings } from '../index'

describe('findBinarySubstrings', () => {
  // 1. 基本测试
  it('1. should find all binary substrings in "00110011"', () => {
    expect(findBinarySubstrings('00110011')).toEqual([
      '0011',
      '01',
      '1100',
      '10',
      '0011',
      '01',
    ])
  })

  // 2. 测试没有符合条件的子串
  it('2. should return an empty array for "0000"', () => {
    expect(findBinarySubstrings('0000')).toEqual([])
  })

  // 3. 测试只有一个符合条件的子串
  it('3. should find one binary substring in "101"', () => {
    expect(findBinarySubstrings('101')).toEqual(['10', '01'])
  })

  // 4. 测试包含多个符合条件的子串
  // it('4. should find multiple binary substrings in "00110"', () => {
  //   expect(findBinarySubstrings('00110')).toEqual(['0011', '01'])
  // })

  // 5. 测试包含标点符号
  // it('5. should find binary substrings in "110011000011"', () => {
  //   expect(findBinarySubstrings('110011000011')).toEqual([
  //     '1100',
  //     '10',
  //     '0011',
  //     '01',
  //     '1100',
  //     '10',
  //   ])
  // })

  // 6. 测试空字符串
  it('6. should return empty array when input is empty', () => {
    expect(findBinarySubstrings('')).toEqual([])
  })

  // 7. 测试单个字符
  it('7. should return empty array when input is a single character', () => {
    expect(findBinarySubstrings('0')).toEqual([])
    expect(findBinarySubstrings('1')).toEqual([])
  })

  // 8. 测试不同长度的符合条件子串
  // it('8. should find binary substrings in "001100110011"', () => {
  //   expect(findBinarySubstrings('001100110011')).toEqual([
  //     '0011',
  //     '01',
  //     '1100',
  //     '10',
  //     '0011',
  //     '01',
  //     '1100',
  //     '10',
  //   ])
  // })
})
