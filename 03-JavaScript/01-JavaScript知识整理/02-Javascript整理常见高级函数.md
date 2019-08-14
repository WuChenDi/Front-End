 
 # 防抖
 *  浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能。为了优化体验，需要对这类事件进行调用次数的限制
 *  作用是在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行
 *  以用户拖拽改变窗口大小，触发 resize 事件为例，在这过程中窗口的大小一直在改变，所以如果我们在 resize 事件中绑定函数，这个函数将会一直触发，而这种情况大多数情况下是无意义的，还会造成资源的大量浪费。
    ```js
    function debounce(method, wait, immediate) {
        if (typeof method != 'function') {
            throw new TypeError('Expected a function');
        }
        let timeout
        // debounced函数为返回值
        // 使用Async/Await处理异步，如果函数异步执行，等待setTimeout执行完，拿到原函数返回值后将其返回
        // args为返回函数调用时传入的参数，传给method
        let debounced = function (...args) {
            return new Promise(resolve => {
                // 用于记录原函数执行结果
                let result
                // 将method执行时this的指向设为debounce返回的函数被调用时的this指向
                let context = this
                // 如果存在定时器则将其清除
                if (timeout) {
                    clearTimeout(timeout)
                }
                // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
                if (immediate) {
                    // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
                    // 这样确保立即执行后wait毫秒内不会被再次触发
                    let callNow = !timeout
                    timeout = setTimeout(() => {
                        timeout = null
                    }, wait)
                    // 如果满足上述两个条件，则立即执行并记录其执行结果
                    if (callNow) {
                        result = method.apply(context, args)
                        resolve(result)
                    }
                } else {
                    // 如果immediate为false，则等待函数执行并记录其执行结果
                    // 并将Promise状态置为fullfilled，以使函数继续执行
                    timeout = setTimeout(() => {
                        // args是一个数组，所以使用fn.apply
                        // 也可写作method.call(context, ...args)
                        result = method.apply(context, args)
                        resolve(result)
                    }, wait)
                }
            })
        }

        // 在返回的debounced函数上添加取消方法
        debounced.cancel = function () {
            clearTimeout(timeout)
            timeout = null
        }

        return debounced
    }
    var run = function () {
        console.log("i'm run");
    }
    window.addEventListener('resize', Ddebounce(run, 2000, false))
    ```

 # 节流
 *  节流是指在一段时间内只允许函数执行一次
 *  应用场景如： 输入框的联想、可以限定用户在输入时，只在每两秒钟响应一次联想(或是两秒钟发送一次搜索请求)
    ```js
    var throttle = function (func, delay) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
                    func.apply(context, args);
                    timer = null;
                }, delay);
            }
        }
    }
    ```

 # 柯里化
 * 函数柯里化的主要目的就是为了减少函数传参，同时将一些固定参数私有化
    ```js
    function curry(func) {
        var l = func.length;
        return function curried() {
            var args = [].slice.call(arguments);
            if (args.length < 1) {
                return function () {
                    var argtsInner = [].slice.call(arguments);
                    return curried.apply(this, arrs.concat(argtsInner))
                }
            } else {
                return func.apply(this, args)
            }
        }
    }
    var f = function (a, b, c) {
        return console.log([a, b, c])
    }
    var curried = curry(f);
    curried(1)(2)(3)
    ```

 #  数组扁平化
 * 将数组进行扁平化处理，即将多维数组展开为一维数组
    ```js
    //  es6
    const flattenES6 = (arr) => {
        let result = [];
        arr.forEach((item, i, arr) => {
            if (Array.isArray(item)) {
                result = result.concat(flatten(item));
            } else {
                result.push(arr[i])
            }
        })
        return result;
    };
    console.log(flattenES6([1, [2, [3, [4]], 5]]))

    // es5
    function flattenES5(arr) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                result = result.concat(flatten(arr[i]))
            } else {
                result.push(arr[i])
            }
        }
        return result;
    }
    console.log(flattenES5([1, [2, [3, [4]], 5]]))
    ```

 *  数组扁平化 - toString()
 *  该方法是利用 toString 把数组变成以逗号分隔的字符串，然后遍历数组把每一项再变回原来的类型。
    ```js
    [1, [2, [3, [4]], 5]] // 1,2,3,4,5
    // es6
    const flattenES6 = (arr) => arr.toString().split(',').map((item) => +item);
    console.log(flattenES6([1, [2, [3, [4]], 5]]))

    // es5
    function flattenES5(arr) {
        return arr.toString().split(',').map(function (item) {
            return +item;
        });
    }
    console.log(flattenES5([1, [2, [3, [4]], 5]]))
    ```

# 对象拷贝
  * 
    ```js
    function copy(obj) {
        if (!obj || typeof obj !== 'object') {
            return
        }
        var newObj = obj.constructor === Array ? [] : {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key]) {
                    newObj[key] = copy(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }
        return newObj
    }

    var old = {
        a: 'old',
        b: {
            c: 'old'
        }
    }
    var newObj = copy(old)
    newObj.b.c = 'new'
    console.log(old) // { a: 'old', b: { c: 'old' } }
    console.log(newObj) // { a: 'old', b: { c: 'new' } }
    ```

# call的模拟实现
  * 介绍：call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
  ```js
    Function.prototype.Dcall = function (context) {
        var context = context || window;
        context.fn = this;
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push('arguments[' + i + ']');
        }
        var result = eval('context.fn(' + args + ')');
        delete context.fn
        return result;
    }
    // 测试一下
    var value = 2;
    var obj = {
        value: 1
    }
    function bar(name, age) {
        console.log(this.value);
        return {
            value: this.value,
            name: name,
            age: age
        }
    }
    bar.Dcall(null); // 2

    console.log(bar.Dcall(obj, 'wcd', 23));
    // 1
    // Object {
    //    value: 1,
    //    name: 'wcd',
    //    age: 23
    // }
  ```

# apply的模拟实现
  * 
  ```js
    Function.prototype.Dapply = function (context, arr) {
        var context = Object(context) || window;
        context.fn = this;
        var result;
        if (!arr) {
            result = context.fn();
        } else {
            var args = [];
            for (var i = 0; i < arr.length; i++) {
                args.push('arr[' + i + ']');
            }
            result = eval('context.fn(' + args + ')')
        }
        delete context.fn
        return result;
    }
  ```

# bind的模拟实现
  * 介绍：bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
  * 特点：返回一个函数 or 可以传入参数
    ```js
    Function.prototype.Dbind = function (context) {
        if (typeof this !== "function") {
            throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var that = this;
        var args = Array.prototype.slice.call(arguments, 1);

        var fNOP = function () {};
        var fBound = function () {
            var bindArgs = Array.prototype.slice.call(arguments);
            return that.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
        }

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    }
    ```
