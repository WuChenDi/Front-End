// let digot = {
//   _name: 'Di-got',
//   get name() {
//     // console.log('value')
//     // return '你好'
//     return this._name
//   },
//   set name(val) {
//     console.log('new name is ' + val);
//     this._name = val
//   }
// }

// console.log(digot.name)
// digot.name = 'wuchendi'
// console.log(digot.name)

// function add(x, y) {
//   return x + y
// }

// function double(z) {
//   return z * 2
// }
// const res1 = add(1, 2)
// const res2 = double(res1);
// console.log(res2)

// const res3 = double(add(1, 2))
// console.log(res3)

// function add(x, y) {
//   return x + y
// }

// function double(z) {
//   return z * 2
// }
// const middlewares = [add, double]
// let len = middlewares.length;

// function compose(midds) {
//   return (...args) => {
//     // 初始值
//     let res = midds[0](...args);
//     for (let i = 1; i < len; i++) {
//       res = midds[i](res)
//     }
//     return res
//   }
// }
// const fn = compose(middlewares);
// const res = fn(1, 2);
// console.log(res);

async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('end fn1');
}

async function fn2(next) {
  console.log('fn2');
  await delay();
  await next();
  console.log('end fn2');
}

async function fn3(next) {
  console.log('fn3');
}

function delay() {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove()
    }, 2000);
  })
}

function compose(middlewares) {
  return function () {
    return dispatch(0)

    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(function next() {
        return dispatch(i + 1)
      }))
    }
  }
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares)
finalFn()