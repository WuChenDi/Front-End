import { describe, it, expect } from 'vitest'
import { letterCombinations } from '../lesson17'

describe('letterCombinations', () => {
  // 1. 测试空字符串输入
  it('1. should return an empty array for an empty string', () => {
    expect(letterCombinations('')).toEqual([])
  })

  // 2. 测试单个数字输入
  it('2. should return the correct combinations for a single digit', () => {
    expect(letterCombinations('2')).toEqual(['a', 'b', 'c'])
  })

  // 3. 测试两个数字输入
  it('3. should return the correct combinations for two digits', () => {
    expect(letterCombinations('23')).toEqual([
      'ad',
      'ae',
      'af',
      'bd',
      'be',
      'bf',
      'cd',
      'ce',
      'cf',
    ])
  })

  // 4. 测试三个数字输入
  it('4. should return the correct combinations for three digits', () => {
    expect(letterCombinations('234')).toEqual([
      'adg',
      'adh',
      'adi',
      'aeg',
      'aeh',
      'aei',
      'afg',
      'afh',
      'afi',
      'bdg',
      'bdh',
      'bdi',
      'beg',
      'beh',
      'bei',
      'bfg',
      'bfh',
      'bfi',
      'cdg',
      'cdh',
      'cdi',
      'ceg',
      'ceh',
      'cei',
      'cfg',
      'cfh',
      'cfi',
    ])
  })

  // 5. 测试包含无效数字的输入
  it('5. should return an empty array for invalid digits like 0 or 1', () => {
    expect(letterCombinations('10')).toEqual([])
    expect(letterCombinations('01')).toEqual([])
  })

  // 6. 测试包含多个相同数字的输入
  it('6. should return the correct combinations for repeated digits', () => {
    expect(letterCombinations('22')).toEqual([
      'aa',
      'ab',
      'ac',
      'ba',
      'bb',
      'bc',
      'ca',
      'cb',
      'cc',
    ])
  })

  // 7. 测试所有有效数字的组合，但限制长度为0到4
  it('7. should return correct combinations for valid digits with length between 0 and 4', () => {
    // 测试长度为4的输入
    expect(letterCombinations('2345')).toEqual([
      'adgj',
      'adgk',
      'adgl',
      'adhj',
      'adhk',
      'adhl',
      'adij',
      'adik',
      'adil',
      'aegj',
      'aegk',
      'aegl',
      'aehj',
      'aehk',
      'aehl',
      'aeij',
      'aeik',
      'aeil',
      'afgj',
      'afgk',
      'afgl',
      'afhj',
      'afhk',
      'afhl',
      'afij',
      'afik',
      'afil',
      'bdgj',
      'bdgk',
      'bdgl',
      'bdhj',
      'bdhk',
      'bdhl',
      'bdij',
      'bdik',
      'bdil',
      'begj',
      'begk',
      'begl',
      'behj',
      'behk',
      'behl',
      'beij',
      'beik',
      'beil',
      'bfgj',
      'bfgk',
      'bfgl',
      'bfhj',
      'bfhk',
      'bfhl',
      'bfij',
      'bfik',
      'bfil',
      'cdgj',
      'cdgk',
      'cdgl',
      'cdhj',
      'cdhk',
      'cdhl',
      'cdij',
      'cdik',
      'cdil',
      'cegj',
      'cegk',
      'cegl',
      'cehj',
      'cehk',
      'cehl',
      'ceij',
      'ceik',
      'ceil',
      'cfgj',
      'cfgk',
      'cfgl',
      'cfhj',
      'cfhk',
      'cfhl',
      'cfij',
      'cfik',
      'cfil',
    ])
  })
})
