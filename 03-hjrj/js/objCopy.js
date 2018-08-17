// 对象拷贝
function clone(value, isDeep) {
  if (value === null) return null;
  if (typeof value !== 'object') return value
  if (Array.isArray(value)) {
    if (isDeep) {
      return value.map(item => clone(item, true))
    }
    return [].concat(value)
  } else {
    if (isDeep) {
      var obj = {};
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true)
      })
      return obj;
    }
    return { ...value
    }
  }
}