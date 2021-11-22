const noop = () => {}

const isString = value => {
  return typeof value === 'string'
}

[Boolean, Number, String].forEach(item => {
  item.prototype.getKey = noop
  item.prototype.getValue = noop
})

class Constants {
  constructor(obj) {
    const map = {}
    Object.keys(obj).forEach(key => {
      const initValue = obj[key]
      if (!isString(initValue)) {
        console.warn(`Warnning: this util only support string value, current value is ${JSON.stringify(initValue)}`)
      }
      const newKey = `_${key}`
      map[newKey] = initValue
      Object.defineProperty(map, key, {
        configurable: true,
        enumerable: true,
        get: function () {
          const value = map[newKey]
          if (!isString(value)) return value
          String.prototype.getKey = () => {
            String.prototype.getKey = noop
            String.prototype.getValue = noop
            return key
          }
          String.prototype.getValue = () => {
            String.prototype.getKey = noop
            String.prototype.getValue = noop
            return value
          }
          return value
        },
        set: function (newValue) {
          map[newKey] = newValue
        }
      })
    })
    return map
  }
}

const testValues = {
  draft: '草稿',
  id: 1,
  money: 1.2,
  isTest: true
}

const constants = new Constants(testValues)

const test = (result, expect) => {
  const isExpected = result === expect
  isExpected
    ? console.log(`PASS: The result is ${result}`)
    : console.log(`FAIL: The result is ${result}, should be ${expect}`)
}

console.log(constants)

// test(constants.draft, '草稿')
// test(constants.draft.getKey(), 'draft')
// test(constants.draft.getValue(), '草稿')
// test(constants.id, 1)
// test(constants.id.getKey(), undefined)
// test(constants.id.getValue(), undefined)
// test(constants.money, 1.2)
// test(constants.money.getKey(), undefined)
// test(constants.money.getValue(), undefined)
// test(constants.isTest, true)
// test(constants.isTest.getKey(), undefined)
// test(constants.isTest.getValue(), undefined)
// const a = 'test'
// test(a.getKey(), undefined)
// test(a.getValue(), undefined)
