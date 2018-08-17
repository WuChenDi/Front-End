/**
 *  防抖
 *  浏览器的 resize、scroll、keypress、mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能。为了优化体验，需要对这类事件进行调用次数的限制
 *  作用是在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行
 *  以用户拖拽改变窗口大小，触发 resize 事件为例，在这过程中窗口的大小一直在改变，所以如果我们在 resize 事件中绑定函数，这个函数将会一直触发，而这种情况大多数情况下是无意义的，还会造成资源的大量浪费。
 */
function debounce(func, delay, immediate) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var doNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, delay);
      if (doNow) {
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      }
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    }
  }
}
var run = function () {
  console.log("i'm run");
}
window.addEventListener('resize', debounce(run, 2000))

/**
 *  节流
 *  节流是指在一段时间内只允许函数执行一次
 *  应用场景如： 输入框的联想、可以限定用户在输入时，只在每两秒钟响应一次联想(或是两秒钟发送一次搜索请求)
 */
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

// 柯里化
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

// 数组扁平化 - 普通递归(es6)
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

// 数组扁平化 - 普通递归(es5)
function flattenES5(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}
console.log(flattenES5([1, [2, [3, [4]], 5]]))

/**
 *  数组扁平化 - toString()
 *  该方法是利用 toString 把数组变成以逗号分隔的字符串，然后遍历数组把每一项再变回原来的类型。
 *  [1, [2, [3, [4]], 5]] // 1,2,3,4,5
 */

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