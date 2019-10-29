# JavaScrip 常见面试题汇总

1.  请解释 JavaScript 中 this 是如何工作的

    this 永远指向函数运行时所在的对象，而不是函数被创建时所在的对象

    匿名函数或不处于任何对象中的函数指向 window

    - 方法调用模式

        当函数被保存为对象的一个属性时，成该函数为该对象的方法。函数中 this 的值为该对象

        ```js
        var foo = {
            name: "fooname",
            getName: function() {
                return this.name;
            }
        };
        foo.getName(); // this => foo
        ```

    - 函数调用模式

        当函数并不是对象的属性。函数中 this 的值为全局对象

        note：某个方法中的内部函数中的 this 的值也是全局对象，而非外部函数的 this

        ```js
        function foo() {
            this.name = "fooname";
        }
        foo(); // this => window
        ```

    - 构造器调用模式

        即使用 new 调用的函数，则其中 this 将会被绑定到那个新构造的对象。

        ```js
        function Foo() {
            this.name = "fooname";
        }
        var foo = new Foo(); // this => foo
        ```

    - 使用 apply 或 call 调用模式

        该模式调用时，函数中 this 被绑定到 apply 或 call 方法调用时接受的第一个参数。

        ```js
        function getName(name) {
            this.name = name;
        }
        var foo = {};
        getName.call(foo, name); // this =>foo
        ```

        改变 this 的值主要方法

    - apply 或 call 方法调用时强制修改，使 this 指向第一个参数。

    - 使用 Function.bind 方法创造新的函数，该新函数的中 this 指向所提供的第一个参数。

2.  请解释原型继承 (prototypal inheritance) 的原理

    JavaScript 没有“子类”和“父类”的概念，也没有“类”（class）和“实例”（instance）的区分，全靠“原型链”（prototype chain）模式，来实现继承。

    每个函数 Sub 都有一个属性 prototype，prototype 指向一个原型对象，原型对象中也有一个指向函数的属性 constructor，通过 new 一个函数 Sub 可以产生实例 instance，调用这个 instance 的某个属性或方法时，instance 会先查找自身是否有这个方法或者属性，没有的话就会去实例的构造函数 Sub 的原型 prototype 中查找，即 Sub.prototype，如果给原型对象 Sub.prototype 赋予另一个类型的实例 superInstance，则是在 superInstance 中查找的，这个 superInstance 中也有属性 prototype 指向某个原型对象，以此一级级往上最终到 Object.prototype，这样就形成了原型继承。

    利用此原理可以自己实现一个 inherits 函数：

    ```js
    function inherits(subType, superType) {
        var _prototype = Object.create(superType.prototype);
        _prototype.constructor = subType;
        subType.prototype = _prototype;
    }
    ```

3.  解释为什么接下来这段代码不是 IIFE (立即调用的函数表达式)：function foo(){ }(); 要做哪些改动使它变成 IIFE?

    (function fn(){..})()，函数被包含在一个括号内，变成为一个表达式，随后跟着一个()，就立即执行这个函数。

    IIFE 的一些作用:

    - 创建作用域，内部保存一些大量临时变量的代码防止命名冲突。
    - 一些库的外层用这种形式包起来防止作用域污染。
    - 运行一些只执行一次的代码。

4.  (function fn(){..})()，函数被包含在一个括号内，变成为一个表达式，随后跟着一个()，就立即执行这个函数。

    ```
      IIFE的一些作用:
      1. 创建作用域，内部保存一些大量临时变量的代码防止命名冲突。
      2. 一些库的外层用这种形式包起来防止作用域污染。
      3. 运行一些只执行一次的代码。
    ```

    当某个函数调用时会创建一个执行环境以及作用域链，然后根据 arguments 和其它命名参数初始化形成活动对象。在外部函数调用结束后，其执行环境与作用域链被销毁，但是其活动对象保存在了闭包之中，最后在闭包函数调用结束后才销毁。简单的说，闭包就是能够读取其他函数内部变量的函数。在 js 中，闭包是指有权访问另一个函数作用域中的变量的函数。

    如何使用：将 A 函数内部的 B 函数作为 A 函数的返回值返回。

    - 匿名自执行函数

        有的场景下函数只需要执行一次，例如 init()之类的函数，其内部变量无需维护，我们可以使用闭包。 我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，因此在函数执行完后会立刻释放资源，而且不污染全局对象。

    - 封装

        模拟面向对象的代码风格进行封装，使私有属性存在成为可能。

5.  .call 和 .apply 的区别是什么？

    .call 和.apply 的共同点是都是用来改变函数体内 this 对象的值。

    区别是第二个参数不一样。apply()的第二个参数是一个类数组对象 arguments，参数都是以数组的形式传入，而 call()，传递给他的是一系列参数。code：

    ```js
    Math.max.call(null, 1, 2, 3, 4);
    //4

    Math.max.apply(null, [1, 2, 3, 4]);
    //4
    ```

6.  请解释 Function.prototype.bind？

    ```js
    Function.prototype.bind方法会创建一个新函数，当这个新函数被调用时，它的this值是传递给bind()的第一个参数, 它的参数是bind()的其他参数和其原本的参数.
    ```

7.  请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？

    宿主对象是指 DOM 和 BOM。

    原生对象是 Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、Math 等对象。

8.  请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？

    ```js
    function Person() {} // 声明函数Person()
    var person = Person(); // 将函数Person()的结果返回给变量person，如果没有返回值则person为undefined。
    var person = new Person(); // new一个Person的实例对象。
    ```

9.  请尽可能详尽的解释 Ajax 的工作原理。以及使用 Ajax 都有哪些优劣？

    Ajax 是无需刷新页面就能从服务器取得数据的一种方法。

    Ajax 通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 javascript 来操作 DOM 更新页面。

    过程：

    ```
    1. 创建XMLHttpRequest对象。
    2. 设置响应HTTP请求的回调函数。
    3. 创建一个HTTP请求，指定相应的请求方法、url等。
    4. 发送HTTP请求。
    5. 获取服务器端返回的数据。
    6. 使用JavaScript操作DOM更新页面。
    ```

    缺点：

    ```
    1. 对搜索引擎不友好
    2. 要实现Ajax下的前后退功能成本较大
    3. 跨域问题限制
    ```

10. 请解释变量声明提升 (hoisting)。

    变量的声明前置就是把变量的声明提升到当前作用域的最前面。

    函数的声明前置就是把整个函数提升到当前作用域的最前面(位于前置的变量声明后面)。

    ```js
    //变量的声明前置
    console.log(num); //undefined
    var num = 1;

    等价于;

    //变量的声明前置
    var num;
    console.log(num); //undefined
    num = 1;
    ```

11. 请描述事件冒泡机制 (event bubbling)。

    事件冒泡(event bubbling)，事件最开始时由触发的那个元素身上发生，然后沿着 DOM 树向上传播，直到 document 对象。如果想阻止事件起泡，可以使用 e.stopPropagation()。

12. 什么是 “use strict”; ? 使用它的好处和坏处分别是什么？

    优点：

    ```
    1. 消除Javascript语法的一些不严谨之处，减少一些怪异行为;
    2. 消除代码运行的一些不安全之处，保证代码运行的安全；
    3. 提高编译器效率，增加运行速度；
    4. 为未来新版本的Javascript做好铺垫
    ```

    缺点：

    ```
    严格模式改变了语义。依赖这些改变可能会导致没有实现严格模式的浏览器中出现问题或者错误
    ```

13. 请解释 JavaScript 的同源策略 (same-origin policy)。

    同源策略限制了一个源(origin)中加载文本或脚本与来自其它源(origin)中资源的交互方式。同源指的是协议、域名、端口相同，同源策略是一种安全协议。

14. 请解释 JSONP 的工作原理，以及它为什么不是真正的 Ajax。

    JSONP（JSON with Padding）是一种非官方跨域数据交互协议，它允许在服务器端集成< script >标签返回至客户端，通过 javascript 回调的形式实现跨域访问。

    因为同源策略的原因，我们不能使用 XMLHttpRequest 与外部服务器进行通信，但是< script >可以访问外部资源，所以通过 JSON 与< script >相结合的办法，可以绕过同源策略从外部服务器直接取得可执行的 JavaScript 函数。

    原理

    客户端定义一个函数，比如 jsonpCallback，然后创建< script >，src 为 url + ?jsonp=jsonpCallback 这样的形式，之后服务器会生成一个和传递过来 jsonpCallback 一样名字的参数，并把需要传递的数据当做参数传入，比如 jsonpCallback(json)，然后返回给客户端，此时客户端就执行了这个服务器端返回的 jsonpCallback(json)回调。

    通俗的说，就是客户端定义一个函数然后请求，服务器端返回的 javascript 内容就是调用这个函数，需要的数据都当做参数传入这个函数了。

    优点 - 兼容性好，简单易用，支持浏览器与服务器双向通信
    缺点 - 只支持 GET 请求；存在脚本注入以及跨站请求伪造等安全问题

    补充一点，JSONP 不使用 XMLHttpRequest 对象加载资源，不属于真正意义上的 AJAX。

15. == 和 === 有什么不同？

    通俗的说就是===比==要更为严格，===比较过程中没有任何的类型转换。

16. 什么是三元表达式 (Ternary expression)？“三元 (Ternary)” 表示什么意思？

    如名字表示的三元运算符需要三个操作数。

    语法是

    条件 ? 结果 1 : 结果 2;

    这里你把条件写在问号(?)的前面后面跟着用冒号(:)分隔的结果 1 和结果 2。满足条件时结果 1 否则结果 2。

17. 你怎么看 AMD vs. CommonJS？

    浏览器端异步和服务器端同步的模块化编程规范

18. 请举出一个匿名函数的典型用例？

    定义回调函数，立即执行函数，作为返回值的函数，使用方法 var foo = function() {}定义的函数。

19. 描述以下变量的区别：null，undefined 或 undeclared？该如何检测它们？

    未定义的属性、定义未赋值的为 undefined，JavaScript 访问不会报错；null 是一种特殊的 object；NaN 是一种特殊的 number；undeclared 是未声明也未赋值的变量，JavaScript 访问会报错。

20. 在什么时候你会使用 document.write()？

    DOM 方法，可向文档写入 HTML 表达式或 JavaScript 代码。

21. 如何实现下列代码：[1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]

    ```js
    var arr = [1, 2, 3, 4, 5];
    Array.prototype.duplicator = function() {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this.push(this[i]);
        }
    };
    arr.duplicator();
    ```

22. 解释 function foo() {} 与 var foo = function() {} 用法的区别

        函数声明的两种方法：

        var foo = function () {}

        这种方式是声明了个变量，而这个变量是个方法，变量在js中是可以改变的。

    也：将一个匿名函数赋值给了变量。

        function foo() {}

        这种方式是声明了个方法，foo这个名字无法改变

23. 请解释可变 (mutable) 和不变 (immutable) 对象的区别。

    在 JavaScript 中，对象是引用类型的数据，其优点在于频繁的修改对象时都是在原对象的基础上修改，并不需要重新创建，这样可以有效的利用内存，不会造成内存空间的浪费，对象的这种特性可以称之为 Mutable，中文的字面意思是「可变」。

    Immutable 从字面上翻译成中文是「不可变」。每次修改一个 Immutable 对象时都会创建一个新的不可变的对象，在新对象上操作并不会影响到原对象的数据。

24. 使用 Promises 而非回调 (callbacks) 优缺点是什么？

    Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

    所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

    有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

    Promise 也有一些缺点。

    ```
    1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
    2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
    3. 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
    ```

25. 请解释同步 (synchronous) 和异步 (asynchronous) 函数的区别。

    同步调用，在发起一个函数或方法调用时，没有得到结果之前，该调用就不返回，直到返回结果；

    异步调用的概念和同步相对，在一个异步调用发起后，被调用者立即返回给调用者，但调用者不能立刻得到结果，被调用者在实际处理这个调用的请求完成后，通过状态、通知或回调等方式来通知调用者请求处理的结果。

    简单地说，同步就是发出一个请求后什么事都不做，一直等待请求返回后才会继续做事；异步就是发出请求后继续去做其他事，这个请求处理完成后会通知你，这时候就可以处理这个回应了。

26. URL 到界面显示发生了什么

    - DNS 解析 先本地缓存找，在一层层找 将常见的地址解析成唯一对应的 ip 地址基本顺序为：本地域名服务器->根域名服务器->com 顶级域名服务器依次类推下去,找到后记录并缓存下来如 www.google.com 为:

        . -> .com -> google.com. -> www.google.com

    - TCP 连接 三次握手，只要没收到确认消息就要重新发
        1. 主机向服务器发送一个建立连接的请求（您好，我想认识您）
        2. 服务器接到请求后发送同意连接的信号（好的，很高兴认识您）
        3. 主机接到同意连接的信号后，再次向服务器发送了确认信号（我也很高兴认识您），自此，主机与服务器两者建立了连接
    - 发送 HTTP 请求 浏览器会分析这个 url，并设置好请求报文发出。请求报文中包括请求行、请求头、空行、请求主体

    - 服务器处理请求并返回 HTTP 报文

    - 浏览器解析渲染页面
        - 通过 HTML 解析器解析 HTML 文档，构建一个 DOM Tree，同时通过 CSS 解析器解析 HTML 中存在的 CSS，构建 Style Rules，两者结合形成一个 Attachment
        - 通过 Attachment 构造出一个呈现树（Render Tree）
        - Render Tree 构建完毕，进入到布局阶段（layout/reflow），将会为每个阶段分配一个应出现在屏幕上的确切坐标
        - 最后将全部的节点遍历绘制出来后，一个页面就展现出来了。 遇到 script 会停下来执行，所以通常把 script 放在底部
    - 连接结束

27. babel 原理

    ES6、7 代码输入 -> babylon 进行解析 -> 得到 AST（抽象语法树）-> plugin 用 babel-traverse 对 AST 树进行遍历转译 ->得到新的 AST 树->用 babel-generator 通过 AST 树生成 ES5 代码
