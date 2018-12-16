# JavaScrip常见面试题汇总

1. 请解释 JavaScript 中 this 是如何工作的
    
    this 永远指向函数运行时所在的对象，而不是函数被创建时所在的对象
    
    匿名函数或不处于任何对象中的函数指向 window

    - 方法调用模式

      当函数被保存为对象的一个属性时，成该函数为该对象的方法。函数中this的值为该对象
      ```js
        var foo = {
          name: 'fooname',
          getName: function () {
            return this.name
          }
        }
        foo.getName(); // this => foo
      ```
    - 函数调用模式

      当函数并不是对象的属性。函数中this的值为全局对象 

      note：某个方法中的内部函数中的this的值也是全局对象，而非外部函数的this
      ```js
      function foo() {
        this.name = 'fooname';
      }
      foo(); // this => window
      ```
    - 构造器调用模式

      即使用new调用的函数，则其中this将会被绑定到那个新构造的对象。
      ```js
      function Foo() {
        this.name = 'fooname';
      }
      var foo = new Foo(); // this => foo
      ```
    - 使用apply或call调用模式

      该模式调用时，函数中this被绑定到apply或call方法调用时接受的第一个参数。
      ```js
      function getName(name) {
        this.name = name;
      }
      var foo = {};
      getName.call(foo, name); // this =>foo
      ```
    改变this的值主要方法

    - apply或call方法调用时强制修改，使this指向第一个参数。 
    
    - 使用Function.bind方法创造新的函数，该新函数的中this指向所提供的第一个参数。

2. 请解释原型继承 (prototypal inheritance) 的原理

    JavaScript没有“子类”和“父类”的概念，也没有“类”（class）和“实例”（instance）的区分，全靠“原型链”（prototype chain）模式，来实现继承。

    每个函数Sub都有一个属性prototype，prototype指向一个原型对象，原型对象中也有一个指向函数的属性constructor，通过new一个函数Sub可以产生实例instance，调用这个instance的某个属性或方法时，instance会先查找自身是否有这个方法或者属性，没有的话就会去实例的构造函数Sub的原型prototype中查找，即Sub.prototype，如果给原型对象Sub.prototype赋予另一个类型的实例superInstance，则是在superInstance中查找的，这个superInstance中也有属性prototype指向某个原型对象，以此一级级往上最终到Object.prototype，这样就形成了原型继承。

    利用此原理可以自己实现一个inherits函数：
    ```js
    function inherits(subType, superType) {
      var _prototype = Object.create(superType.prototype);
      _prototype.constructor = subType;
      subType.prototype = _prototype;
    }
    ```

3. 解释为什么接下来这段代码不是 IIFE (立即调用的函数表达式)：function foo(){ }(); 要做哪些改动使它变成 IIFE?

    (function fn(){..})()，函数被包含在一个括号内，变成为一个表达式，随后跟着一个()，就立即执行这个函数。

    IIFE的一些作用:

    - 创建作用域，内部保存一些大量临时变量的代码防止命名冲突。
    - 一些库的外层用这种形式包起来防止作用域污染。
    - 运行一些只执行一次的代码。

4.(function fn(){..})()，函数被包含在一个括号内，变成为一个表达式，随后跟着一个()，就立即执行这个函数


