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
  {
    function new_instance_of(leftVaule, rightVaule) {
      let rightProto = rightVaule.prototype;
      leftVaule = leftVaule.__proto__;
      while (true) {
        if (leftVaule === null) return false;
        if (leftVaule === rightProto) return true;
        leftVaule = leftVaule.__proto__;
      }
    }
  }
  // {
  //   const new_instance_of = function(leftVaule, rightVaule) {
  //     let proto = Object.getPrototypeOf(leftVaule);
  //     while (true) {
  //       if (proto == null) return false;
  //       if (proto === rightVaule.prototype) return true;
  //       proto = Object.getPrototypeOf(proto);
  //     }
  //   };
  // }
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
  // 等价于flex-grow: 1; flex-shrink: 1; flex-basis: 0%;
  // 分别代表了所定义flex盒子的拉伸因子、收缩规则、基础宽度。
}

// vue 双向绑定原理
{
  {
    // 2.0(Object.defineProperty)
    let definedObj = {};
    let age;
    Object.defineProperty(definedObj, "age", {
      get: function() {
        console.log("For age");
        return age;
      },
      set: function(newVal) {
        console.log("Set the age");
        age = newVal;
      }
    });
    definedObj.age = 24;
    console.log(definedObj.age);
  }
  {
    // 3.0(Proxy)
    let obj = { a: 1 };
    let proxyObj = new Proxy(obj, {
      get: function(target, prop) {
        return prop in target ? target[prop] : 0;
      },
      set: function(target, prop, value) {
        target[prop] = 0530;
      }
    });
    console.log(proxyObj.a); // 1
    console.log(proxyObj.b); // 0

    proxyObj.a = 0353;
    console.log(proxyObj.a); // 0530
  }
}
// https 实现原理（越详细越好）
{
}
// node 进程之间如何通讯
// graghgl 如何优化请求速度
// node 跟浏览器的 event loop 区别

// 浏览器渲染页面过程
{
  // 从耗时的角度，浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：
  // DNS 查询
  // TCP 连接
  // HTTP 请求即响应
  // 服务器响应
  // 客户端渲染
}

// 如何性能优化
{
  // DNS解析时间： domainLookupEnd - domainLookupStart
  // TCP建立连接时间： connectEnd - connectStart
  // 白屏时间： responseStart - navigationStart
  // dom渲染完成时间： domContentLoadedEventEnd - navigationStart
  // 页面onload时间： loadEventEnd - navigationStart
  // 缓存方面具体参考(https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/11-%E9%A1%B5%E9%9D%A2%E6%80%A7%E8%83%BD%E7%B1%BB.md)
}

// CDN 优化有哪些

// 缓存有哪些，区别是什么
{
  // http 缓存 (强缓存和协商缓存)
  // 浏览器缓存 (Cookie,LocalStorage,SessionStorage)
  // 具体参考(https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/11-%E9%A1%B5%E9%9D%A2%E6%80%A7%E8%83%BD%E7%B1%BB.md)
}

// webpack 插件原理，如何写一个插件

// 手写 bind、reduce
{
  {
    // bind
    // 箭头函数的 this 永远指向它所在的作用域
    // 函数作为构造函数用 new 关键字调用时，不应该改变其 this 指向，因为 new绑定 的优先级高于 显示绑定 和 硬绑定
    // {
    //   var mybind = function(thisArg) {
    //     if (typeof this !== "function") {
    //       throw TypeError("绑定必须在函数上调用");
    //     }
    //     // 拿到参数，为了传给调用者
    //     const args = Array.prototype.slice.call(arguments, 1),
    //       // 保存 this
    //       var that = this;
    //       // 构建一个干净的函数，用于保存原函数的原型
    //       var nop = function() {};
    //       // 绑定的函数
    //       var bound = function() {
    //         // this instanceof nop, 判断是否使用 new 来调用 bound
    //         // 如果是 new 来调用的话，this的指向就是其实例，
    //         // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
    //         return that.apply(
    //           this instanceof nop ? this : thisArg,
    //           args.concat(Array.prototype.slice.call(arguments))
    //         );
    //       };

    //     // 箭头函数处理：由于箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
    //     if (this.prototype) {
    //       nop.prototype = this.prototype;
    //     }
    //     // 修改绑定函数的原型指向
    //     bound.prototype = new nop();

    //     return bound;
    //   };
    // }
    // 测试
    const bar = function() {
      console.log(this.name, arguments);
    };
    bar.prototype.name = "bar";
    const foo = { name: "foo" };
    const bound = bar.mybind(foo, 22, 33, 44);
    new bound(); // bar, [22, 33, 44]
    bound(); // foo, [22, 33, 44]
  }
}

// 防抖截流
{
  // 具体参考(https://github.com/WuChenDi/Front-End/blob/master/03-JavaScript/01-JavaScript%E7%9F%A5%E8%AF%86%E6%95%B4%E7%90%86/utils.js)
  // Ddebounce 与 Dthrottle
}

// 遍历树，求树的最大层数。求某层最多的节点数
// node 开启进程的方法有哪些，区别是什么
// node 如何部署的
// node check 阶段做了什么，触发了什么事件
// 前端模块化的理解
{
  // 功能分治，利维护
  // 复用，利开发
}
// node 如何处理错误的

// 隐式转换
{
  {
    // ToString (注：ToString不是对象的toString方法，而是指其他类型的值转换为字符串类型的操作)
    // null：转为"null"
    // undefined：转为"undefined"
    // 布尔类型：true和false分别被转为"true"和"false"
    // 数字类型：转为数字的字符串形式，如10转为"10"， 1e21转为"1e+21"
    // 数组：转为字符串是将所有元素按照","连接起来，相当于调用数组的Array.prototype.join()方法，如[1, 2, 3]转为"1,2,3"，空数组[]转为空字符串，数组中的null或undefined，会被当做空字符串处理
    // 普通对象：转为字符串相当于直接使用Object.prototype.toString()，返回"[object Object]"
    String(null); // 'null'
    String(undefined); // 'undefined'
    String(true); // 'true'
    String(10); // '10'
    String(1e21); // '1e+21'
    String([1, 2, 3]); // '1,2,3'
    String([]); // ''
    String([null]); // ''
    String([1, undefined, 3]); // '1,,3'
    String({}); // '[object Objecr]'
  }
  {
    // ToNumber (指其他类型转换为数字类型的操作)
    // null： 转为0
    // undefined：转为NaN
    // 字符串：如果是纯数字形式，则转为对应的数字，空字符转为0, 否则一律按转换失败处理，转为NaN
    // 布尔型：true和false被转为1和0
    // 数组：数组首先会被转为原始类型，也就是ToPrimitive，然后在根据转换后的原始类型按照上面的规则处理，关于ToPrimitive，会在下文中讲到
    // 对象：同数组的处理
    Number(null); // 0
    Number(undefined); // NaN
    Number("10"); // 10
    Number("10a"); // NaN
    Number(""); // 0
    Number(true); // 1
    Number(false); // 0
    Number([]); // 0
    Number(["1"]); // 1
    Number({}); // NaN
  }
  {
    // ToBoolean (指其他类型转换为布尔类型的操作)
    // js中的假值只有false、null、undefined、空字符、0和NaN，其它值转为布尔型都为true
    Boolean(null); // false
    Boolean(undefined); // false
    Boolean(""); // flase
    Boolean(NaN); // flase
    Boolean(0); // flase
    Boolean([]); // true
    Boolean({}); // true
    Boolean(Infinity); // true
  }
  {
    // ToPrimitive (指对象类型类型（如：对象、数组）转换为原始类型的操作)
    // 注：对于不同类型的对象来说，ToPrimitive的规则有所不同，比如Date对象会先调用toString
    // 当对象类型需要被转为原始类型时，它会先查找对象的valueOf方法，如果valueOf方法返回原始类型的值，则ToPrimitive的结果就是这个值
    // 如果valueOf不存在或者valueOf方法返回的不是原始类型的值，就会尝试调用对象的toString方法，也就是会遵循对象的ToString规则，然后使用toString的返回值作为ToPrimitive的结果
    Number([]); // 0
    Number(["10"]); //10

    const obj1 = {
      valueOf() {
        return 100;
      },
      toString() {
        return 101;
      }
    };
    Number(obj1); // 100

    const obj2 = {
      toString() {
        return 102;
      }
    };
    Number(obj2); // 102

    const obj3 = {
      toString() {
        return {};
      }
    };
    Number(obj3); // TypeError

    // 对象类型在ToNumber时会先ToPrimitive，再根据转换后的原始类型ToNumber
    // Number([])， 空数组会先调用valueOf，但返回的是数组本身，不是原始类型，所以会继续调用toString，得到空字符串，相当于Number('')，所以转换后的结果为"0"
    // 同理，Number(['10'])相当于Number('10')，得到结果10
    // obj1的valueOf方法返回原始类型100，所以ToPrimitive的结果为100
    // obj2没有valueOf，但存在toString，并且返回一个原始类型，所以Number(obj2)结果为102
    // obj3的toString方法返回的不是一个原始类型，无法ToPrimitive，所以会抛出错误
  }
  {
    // ==
    // 只要布尔类型参与比较，该布尔类型的值首先会被转换为数字类型
    // 根据布尔类型的ToNumber规则，true转为1，false转为0
    {
      false == 0; // true
      true == 1; // true
      true == 2; // false
    }
    // 数字类型和字符串类型的相等比较
    // 当数字类型和字符串类型做相等比较时，字符串类型会被转换为数字类型
    // 根据字符串的ToNumber规则，如果是纯数字形式的字符串，则转为对应的数字，空字符转为0, 否则一律按转换失败处理，转为NaN(NaN和任何值都不相等，包括本身)
    {
      0 == ""; // true
      1 == "1"; // true
      1e21 == "1e21"; // true
      Infinity == "Infinity"; // true
      true == "1"; // true
      false == "0"; // true
      false == ""; // true
    }
    // 对象类型和原始类型的相等比较
    // 当对象类型和原始类型做相等比较时，对象类型会依照ToPrimitive规则转换为原始类型
    {
      "[object Object]" == {}; // true
      "1,2,3" == [1, 2, 3]; // true
    }
    // null、undefined和其他类型的比较
    // null和undefined宽松相等的结果为true,其次null和undefined都是假值
    // false转为0，然后呢？ 没有然后了，ECMAScript规范中规定null和undefined之间互相宽松相等（==），并且也与其自身相等，但和其他所有的值都不宽松相等（==）。
    {
      null == false; // false
      undefined == false; // false
      null == undefined; // true
    }
    // {
    //   [] == ![] // true
    //   [] == 0 // true
    //   [2] == 2 // true
    //   ['0'] == false // true
    //   '0' == false // true
    //   [] == false // true
    //   [null] == 0 // true
    //   null == 0 // false
    //   [null] == false // true
    //   null == false // false
    //   [undefined] == false // true
    //   undefined == false // false
    // }
    {
      // 定义一个变量a，使得下面的表达式结果为true; a == 1 && a == 2 && a == 3
      {
        const a = {
          // 定义一个属性来做累加
          inx: 1,
          valueOf() {
            return this.inx++;
          }
        };
        console.log(a == 1 && a == 2 && a == 3); // true
      }
      {
        const a = {
          // 定义一个属性来做累加
          inx: 1,
          toString() {
            return this.inx++;
          }
        };
        console.log(a == 1 && a == 2 && a == 3); // true
      }
    }
  }
}

// 数字在计算机怎么储存的
// webpack 优化
// webpack 的 require 是如何查找依赖的
// webpack 如何实现动态加载
// 给你一个项目，从头开始你怎么考虑
// 工作流做了哪些事情
// 如何提升效率与性能

// 未来的规划是什么
{
  // ...
}

// 跨域有哪些
{
  // 具体参考(https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/06-%E9%80%9A%E4%BF%A1%E7%B1%BB.md)
}

// 安全类
{
  // 具体参考(https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/07-%E5%AE%89%E5%85%A8%E7%B1%BB.md)
}

// 变量提升 let const var 区别
{
  // let不允许在相同作用域内重复声明同一个变量，即同一个作用域内不允许出现名称相同的变量。
  // const用于声明常量，一旦声明，必须立即赋值，且以后不可更改。
  // 使用const声明对象的时候，只能保证对象的引用地址不被更改，并非此对象不被修改。
}

// 链表与数组的区别

// 链表如何遍历
{
  {
    // 单向链表
  }
  {
    // 双向链表
  }
  {
    // 循环链表
  }
}

// script 标签中 async 跟 defer 的区别 具体参考(https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/11-%E9%A1%B5%E9%9D%A2%E6%80%A7%E8%83%BD%E7%B1%BB.md)
{
  // defer 是在 HTML 解析完之后才会执行，如果是多个，按照加载的顺序依次执行
  // async 是在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关
  // 注：js defer不会阻碍页面渲染，这一点还是要实际论证的。因为网上都说defer不会阻碍页面render，但实际上iOS safari会白屏，其效果跟script标签一样。
}
