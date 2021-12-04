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
      // 性能提升：
      // Object.defineProperty 是一次性监听完
      // Proxy 是 get 时候去监听的,仅仅监听当前获取的值的层级,什么时候监听到,什么时候去监听
      return reactive(result)
    },
    set(target, key, val, receiver) {
      // 重复数据，不处理
      if (val === target[key]) {
        return true
      }

      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('set 已有 key: ', key)
      } else {
        console.log('set 新增 key: ', key)
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

// proxyData.a = {}
// proxyData.a = { b: 200 }

// TODO: 为什么输出没有 a 对象
// proxyData.a.b = 200
// reactive 方法默认空对象影响，按道理应该要报错的，去掉默认值就可以了

console.log(proxyData)
