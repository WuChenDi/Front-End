// 手写继承
{
  {
    // js 实现继承
    function Animal() {
      this.eat = function() {
        console.log("animal can eat ...");
      };
    }
    function Dog() {
      this.break = function() {
        console.log("dog can break");
      };
    }
    Dog.prototype = new Animal();
    let es5 = new Dog();
    es5.eat(); // animal can eat ...
    es5.break(); // dog can break
  }
  {
    // class 实现 继承
    class Animal {
      constructor(name) {
        this.name = name;
      }
      eat() {
        console.log("animal can wat");
      }
    }
    class Dog extends Animal {
      constructor(name) {
        super(name);
      }
      break() {
        console.log("dog can break");
      }
    }
    let es6 = new Dog("Zekee");
    es6.eat(); // animal can wat
    es6.break(); // dog can break
  }
}

// instanceof 实现原理
{
  // instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。
  function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype;
    leftVaule = leftVaule.__proto__;
    while (true) {
      if (leftVaule === null) {
        return false;
      }
      if (leftVaule === rightProto) {
        return true;
      }
      leftVaule = leftVaule.__proto__;
    }
  }
  // 总结：使用 typeof 来判断基本数据类型是 ok 的，不过需要注意当用 typeof 来判断 null 类型时的问题，如果想要判断一个对象的具体类型可以考虑用 instanceof，但是 instanceof 也可能判断不准确，比如一个数组，他可以被 instanceof 判断为 Object。所以我们要想比较准确的判断对象实例的类型时，可以采取 Object.prototype.toString.call() 方法
}
// promise 限制并发数
{
  class LimitPromise {
    constructor(max) {
      // 异步任务“并发”上限
      this._max = max;
      // 当前正在执行的任务数量
      this._count = 0;
      // 等待执行的任务队列
      this._taskQueue = [];
    }

    /**
     * 调用器，将异步任务函数和它的参数传入
     * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
     * @param args 异步任务函数的参数列表
     * @returns {Promise<unknown>} 返回一个新的Promise
     */
    call(caller, ...args) {
      return new Promise((resolve, reject) => {
        const task = this._createTask(caller, args, resolve, reject);
        if (this._count >= this._max) {
          // console.log('count >= max, push a task to queue')
          this._taskQueue.push(task);
        } else {
          task();
        }
      });
    }

    /**
     * 创建一个任务
     * @param caller 实际执行的函数
     * @param args 执行函数的参数
     * @param resolve
     * @param reject
     * @returns {Function} 返回一个任务函数
     * @private
     */
    _createTask(caller, args, resolve, reject) {
      return () => {
        // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
        caller(...args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
            this._count--;
            if (this._taskQueue.length) {
              // console.log('a task run over, pop a task to run')
              let task = this._taskQueue.shift();
              task();
            } else {
              // console.log('task count = ', count)
            }
          });
        this._count++;
        // console.log('task run , task count = ', count)
      };
    }
  }
  // 调用器：就是把真正的执行函数和参数传入，创建返回一个新的Promise，而这个新Promise的什么时候返回，取决于这个异步任务何时被调度。Promise内部主要就是创建一个任务，判断任务是执行还是入队。
  // 创建任务：实际上就是返回了一个函数，将真正的执行函数放在里面执行。这里利用了Promise的finally方法，在finally中判断是否执行下一个任务，实现任务队列连续消费的地方就是这里。
}
// 箭头函数跟普通函数的区别
{
  // 1.箭头函数没有prototype(原型)，所以箭头函数本身没有this
  // 2.箭头函数的this在定义的时候继承自外层第一个普通函数的this
  // 3.如果箭头函数外层没有普通函数，严格模式和非严格模式下它的this都会指向window(全局对象)
  // 4.箭头函数本身的this指向不能改变，但可以修改它要继承的对象的this
  // 5.箭头函数的this指向全局，使用arguments会报未声明的错误
  // 6.箭头函数的this指向普通函数时,它的argumens继承于该普通函数
  // 7.使用new调用箭头函数会报错，因为箭头函数没有constructor
  // 8.箭头函数不支持new.target
  // 9.箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名
  // 10.箭头函数相对于普通函数语法更简洁优雅
}
// flex 1 全写
{
  // 等价于flex-grow: 1; flex-shrink: 1; flex-basis: 0%; 它们分别代表了所定义flex盒子的拉伸因子、收缩规则、基础宽度。
}
// vue 双向绑定原理
{
  
}
// https 实现原理（越详细越好）
// node 进程之间如何通讯
// graghgl 如何优化请求速度
// node 跟浏览器的 event loop 区别
// 浏览器渲染页面过程
// 如何性能优化
// CDN 优化有哪些
// webpack 插件原理，如何写一个插件
// 缓存有哪些，区别是什么
// 手写 bind、reduce
// 防抖截流
// 遍历树，求树的最大层数。求某层最多的节点数
// node 开启进程的方法有哪些，区别是什么
// node 如何部署的
// node check 阶段做了什么，触发了什么事件
// 前端模块化的理解
// node 如何处理错误的
// 隐式转换
// 数字在计算机怎么储存的
// webpack 优化
// webpack 的 require 是如何查找依赖的
// webpack 如何实现动态加载
// 给你一个项目，从头开始你怎么考虑
// 工作流做了哪些事情
// 如何提升效率与性能
// 未来的规划是什么
// 跨域有哪些
// 网络安全
// 链表与数组的区别
// 变量提升 let const var 区别
// 链表如何遍历
// script 标签中 async 跟 defer 的区别
