// 触发更新视图
function updateView() {
  console.log('updateView')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty, 在扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty)

;['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
  arrProto[methodName] = function () {
    // 触发视图更新
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments)
    // Array.prototype.push.call(this, ...arguments)
  }
})

// 重新定义属性，监听起来
function defineReative(target, key, value) {
  // 深度监听
  observer()

  // 核心 API
  Object.defineProperties(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observer(newValue)

        // 设置新值
        // TODO: 注意点，value 一只在闭包中，此处设置完之后，在 get 时也是会获取最新的值
        value = newValue

        // 触发更新试图
        updateView()
      }
    }
  })
}

// 监听对象属性
function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象或者数组
    return target
  }

  if (Array.isArray(target)) {
    target.__proto__ == arrProto
  }

  // 重新定义各个属性( for in 也可以遍历数组 )
  for (let key in target) {
    defineReative(target, key, target[key])
  }
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

observer(data)

data.name = 'cc'
data.age = 26
data.info.address = 'shenzhen' // 深度监听
data.nums.push(6) // 监听数组

data.xx = 100 // 新增属性，监听不到( Vue.set )
delete data.nums // 删除属性，监听不到( Vue.delete )
