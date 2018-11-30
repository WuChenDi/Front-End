# Proxy和Reflect

## Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

## Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

## Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象的设计目的有这样几个。
  1. 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。
  2. 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
```js
{
  let obj = {
    time: '2017-03-11',
    name: 'wcd',
    _r: 123
  };
  let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get(target, key) {
      return target[key].replace('2017', '2018')
    },
    // 拦截对象设置属性
    set(target, key, value) {
      if (key === 'name') {
        return target[key] = value;
      } else {
        return target[key];
      }
    },
    // 拦截key in object操作
    has(target, key) {
      if (key === 'name') {
        return target[key];
      } else {
        return false;
      }
    },
    // 拦截delete
    deleteProperty(target, key) {
      if (key.indexOf('_') > -1) {
        delete target[key];
        return true;
      } else {
        return target[key];
      }
    },
    // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item != 'time')
    }
  });

  console.log('get', monitor.time);

  monitor.time = '2018';
  monitor.name = 'wuchendi';
  console.log('set', monitor.time, monitor);

  console.log('has', 'name' in monitor, 'time' in monitor);

  // delete monitor.time;
  // console.log('delete', monitor);

  // delete monitor._r;
  // console.log('delete', monitor);

  console.log('ownKeys', Object.keys(monitor));
}

{
  let obj = {
    time: '2017-03-11',
    name: 'wcd',
    _r: 123
  };

  console.log('Reflect get', Reflect.get(obj, 'time'));
  Reflect.set(obj, 'name', 'wuchendi');
  console.log(obj);
  console.log('has', Reflect.has(obj, 'name'));
}

{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator: validator,
      set(target, key, value, proxy) {
        if (target.hasOwnProperty(key)) {
          let va = this._validator[key];
          if (!!va(value)) {
            return Reflect.set(target, key, value, proxy)
          } else {
            throw Error(`不能设置${key}到${value}`)
          }
        } else {
          throw Error(`${key} 不存在`)
        }
      }
    })
  }

  const personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    },
    mobile(val){
      
    }
  }
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      this.mobile = '1111';
      return validator(this,personValidators)
    }
  }
  const person = new Person('wcd', 22);

  console.info(person);

  person.name = 'hht';
  console.info(person);

}
```