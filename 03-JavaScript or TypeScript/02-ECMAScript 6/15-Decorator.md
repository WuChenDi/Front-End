# Decorator

## 修饰器是一个函数，用来修改类的行为(扩展类的功能)

```js
{
  let readonly = function (target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
  };

  class Test {
    @readonly
    time() {
      return "2020-04-06";
    }
  }

  let test = new Test();

  // test.time = function () {
  //   console.log("reset time");
  // };

  console.log(test.time()); // 2020-04-06
}

{
  let typename = function (target, name, descriptor) {
    target.myname = "hello";
  };

  @typename
  class Test {}

  console.log("类修饰符", Test.myname); // 类修饰符 hello
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}

{
  // 实现埋点业务逻辑拆分
  // 埋点接口 逻辑
  let log = (type) => {
    return function (target, name, descriptor) {
      let src_method = descriptor.value;
      descriptor.value = (...arg) => {
        src_method.apply(target, arg);
        console.info(`log ${type}`);
      };
    };
  };

  // 广告方法逻辑
  class AD {
    @log("show")
    show() {
      console.info("ad is show");
    }
    @log("click")
    click() {
      console.info("ad is click");
    }
  }

  let ad = new AD();
  ad.show();
  // ad is show
  // log show
  ad.click();
  // ad is click
  // log cick
}
```
