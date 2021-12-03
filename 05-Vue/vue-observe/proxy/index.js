// 创建响应式
function reactive(target = {}) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或者数组，则返回
    return target
  }

  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本身（非原型的）属性
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get', key) // 监听
      }
      const result = Reflect.get(target, key, receiver)
      // 深度监听
      return reactive(result)
    },
    set(target, key, val, receiver) {
      // 重复数据，不处理
      if (val === target[key]) {
        return true
      }
      const result = Reflect.set(target, key, val, receiver)
      console.log('set', key, val)
      // 是否设置成功
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      console.log('delete property', key)
      // 是否删除成功
      return result
    }
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConf)
  return observed
}

// 测试
const data = {
  name: 'dd',
  age: 25,
  info: {
    address: 'guanghzou'
  },
  nums: [1, 2, 3, 4, 5]
}

const proxyData = reactive(data)

proxyData.name = 'cc'
proxyData.age = 26
proxyData.info.address = 'shenzhen' // 深度监听
proxyData.nums.push(6) // 监听数组

proxyData.xx = 100 // 新增属性
delete proxyData.nums // 删除属性

// console.log(proxyData)
