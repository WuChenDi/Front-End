# ES8 新特性

1. Object.values/Object.entries

   Object.values 和 Object.entries 是在 ES2017 规格中，它和 Object.keys 类似，返回数组类型，其序号和 Object.keys 序号对应。

   Object.values,Object.entries 和 Object.keys 各自项返回是数组，相对应包括 key,value 或者可枚举特定对象 property/attribute

   在 ES8 /ES2017 之前，Javascript 开发者需要迭代一个对象的自身属性时候不得不用 Object.keys，通过迭代且使用 obj[key]获取 value 值返回一个数组：

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   Object.keys(obj).forEach((key, index) => {
     console.log(key, obj[key]);
   });
   ```

   而使用 ES6/ES2015 中 for/of 稍微好点：

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   for (let key of Object.keys(obj)) {
     console.log(key, obj[key]);
   }
   ```

   你使用老方式 for/in(ES5)也许用的非常好。但是他会迭代所有可以枚举属性（像原型中的带名字的-see MDN）,不仅仅自己的属性，会意外的破坏那些 像 prototype 和 tostring 得到意想不到的值。

   Object.values 返回对象自身可以迭代属性值（values）为数组类型。我们最好使用 Array.prototype.forEach 迭代它，结合 ES6 的箭头函数隐形返回值：

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   Object.values(obj).forEach(value => console.log(value)); // 1, 2, 3
   ```

   或者使用 for/of:

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   for (let value of Object.values(obj)) {
     console.log(value);
   }
   // 1, 2, 3
   ```

   Object.entries·，在另一方面，将会返回对象自身可迭代属性 key-value 对数组（作为一个数组），他们（key-value）分别以数组存放数组中。

   ```js
   let obj = {a: 1, b: 2, c: 3}
   JSON.stringify(Object.entries(obj))
   "[["a",1],["b",2],["c",3]]"
   ```

   我们可以使用 ES6/ES2015 解构（需要深入了解解构请点击这篇文章和课程）,从这嵌套数组中分别声明 key 和 value

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   Object.entries(obj).forEach(([key, value]) => {
     console.log(`${key} is ${value}`);
   });
   // a is 1, b is 2, c is 3
   ```

   你可以猜一猜，我们同样使用 ES6for/of（毕竟全部都是数组）遍历 Object.entries 返回来的结果值。

   ```js
   let obj = { a: 1, b: 2, c: 3 };
   for (let [key, value] of Object.entries(obj)) {
     console.log(`${key} is ${value}`);
   }
   // a is 1, b is 2, c is 3
   ```

   现在从对象中提取 values 和 key-value pairs 变得非常容易了。Object.values 和 Object.entries 这种方式不想之前 Object.keys(自身属性 key+顺序相同)结合 for/of(ES6)一起，我们不仅仅可以提取他们还可以迭代他们。

2. 字符填充函数 padStart 和 padEnd
   String.prototype.padStart 和 String.prototype.padEnd 在 javascript 字符操作是一个不错的体验，帮助避免依赖而外的库。

   padStart()在开始部位填充，返回一个给出长度的字符串，填充物给定字符串，把字符串填充到期望的长度。从字符串的左边开始（至少大部分西方语言），一个经典例子是使用空格创建列：

   ```js
   console.log("react".padStart(10).length); // "       react" is 10
   console.log("backbone".padStart(10).length); // "  backbone" is 10
   ```

   它对于财务方面非常有用：

   ```js
   console.log("0.00".padStart(20));
   console.log("10,000.00".padStart(20));
   console.log("250,000.00".padStart(20));
   ```

   这结果作为一个会计总账格式非常漂亮：

   ```js
               0.00
          10,000.00
         250,000.00
   ```

   第二个参数，让我们放一些其他的填充字符替代空字符串，一个字符串填充：

   ```js
   console.log("react".padStart(10, "_")); // "_____react"
   console.log("backbone".padStart(10, "*")); // "**backbone"
   ```

   padEnd 顾名思义就是从字符串的尾端右边开始填充。第二个参数，你能实际上用一个任何长度的字符串。例如：

   ```js
   console.log("react".padEnd(10, ":-)")); // "react:-):-" is 10
   console.log("backbone".padEnd(10, "*")); // "backbone**" is 10
   ```

3. Object.getOwnPropertyDescriptors

   这新的 Object.getOwnPropertyDescriptors 返回对象 obj 所有自身属性描述。这是一个多参数版本的 Object.getOwnPropertyDescriptors(obj,propName)将会返回 obj 中 propName 属性的一个单独描述。

   在我们日常不可变编程（immutable programming）时代中，有了这个方法很方便（记住,Javascript 中对象是引用传递）在 ES5 中，开发者要使用 Object.assign()来拷贝对象, Object.assign()分配属性只有 copy 和定义新的属性。当我们使用更加复杂对象和类原型，这可能会出问题。

   Object.getOwnPropertyDescriptors 允许创建真实的对象浅副本并创建子类,它通过给开发者描述符来做到这一点.在 Object.create(prototype, object)放入描述符后，返回一个真正的浅拷贝

   ```js
   Object.create(
     Object.getPrototypeOf(obj),
     Object.getOwnPropertyDescriptors(obj)
   );
   ```

   或者你可以合并两个对象 target 和 source 如下：

   ```js
   Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
   ```

   两种描述符号类型：

   1. 数据描述符（Data descriptor）
   2. 存取器描述符（Accessor descriptor）

   存取描述符有必须属性：get 或者 set 或者 get 和 set 两个就是如你所想的 getter 和 setter 函数，然后存取描述符还有可选属性 configurable 和 enumerable

   ```js
   let azatsBooks = {
     books: ["React Quickly"],
     get latest() {
       let numberOfBooks = this.books.length;
       if (numberOfBooks == 0) return undefined;
       return this.books[numberOfBooks - 1];
     }
   };
   ```

   <img src="../../screenshots/es8-Object.getOwnPropertyDescriptors.png"/>

4. 函数参数列表和调用中的尾逗号（Trailing commas）
   尾逗号在函数定义中只是一个纯粹语法变化，在 ES5 中，将会非法语法，在函数参数后面应该是没有逗号的：

   ```js
   var f = function(a, b, c, d) {
     // NO COMMA!
     // ...
     console.log(d);
   };
   f(1, 2, 3, "this");
   ```

   在 ES8 中，这种尾逗号是没有问题的：

   ```js
   var f = function(a, b, c, d) {
     // COMMA? OK!
     // ...
     console.log(d);
   };
   f(1, 2, 3, "this");
   ```

   现在，函数中尾逗号是向数组（ES3）中和字面量对象（ES5）中尾逗号看齐。

   ```js
   var arr = [
     1, // Length == 3
     2,
     3
   ]; // <--- ok
   let obj = {
     a: 1, // Only 3 properties
     b: 2,
     c: 3
   }; // <--- ok
   ```

   更不用说他是无用友好的。

   尾逗号主要有用在使用多行参数风格（典型的是那些很长的参数名），开发者终于可以忘记逗号放在第一位这种奇怪的写法。自从逗号 bugs 主要原因就是使用他们。而现在你可以到处使用逗号，甚至最后参数都可以。

5. 异步函数（Async Functions）

   异步函数（或者 async/await）特性操作是 Promise 最重要的功能，开发者定义一个 asyc 函数里面不包含或者包含 await 基于 Promise 异步操作

   在 ES6 中我们可以使用 Promise，Axios 库向 GraphQL 服务器发送一个请求：

   ```js
   axios
     .get(`/q?query=${query}`)
     .then(response => response.data)
     .then(data => {
       this.props.processfetchedData(data); // Defined somewhere else
     })
     .catch(error => console.log(error));
   ```

   任何一个 Promise 库都能兼容新的异步函数，我们可以使用同步 try/catch 做错误处理。

   ```js
   async fetchData(url) => {
     try {
       const response = await axios.get(`/q?query=${query}`)
       const data = response.data
       this.props.processfetchedData(data)
     } catch (error) {
       console.log(error)
     }
   }
   ```

   异步函数返回一个 Promise，所以我们像下面可以继续执行流程:

   ```js
   async fetchData(query) => {
     try {
       const response = await axios.get(`/q?query=${query}`)
       const data = response.data
       return data
     } catch (error) {
       console.log(error)
     }
   }
   fetchData(query).then(data => {
     this.props.processfetchedData(data)
   })
   ```

   你可以看到这段代码在(Babel REPL)生效。请注意，这个例子中，Axios 库被代替的，是通过模拟来做相同功能，而 HTTP 请求通过 setTimout 代替：

   ```js
   let axios = {
     // mocks
     get: function(x) {
       return new Promise(resolve => {
         setTimeout(() => {
           resolve({ data: x });
         }, 2000);
       });
     }
   };
   let query = "mangos";
   async function fetchData(query) {
     try {
       const response = await axios.get(`/q?query=${query}`);
       const data = response.data;
       return data;
     } catch (error) {
       console.log(error);
     }
   }
   fetchData(query).then(data => {
     console.log(data); // Got data 2s later... Can use data!
   });
   ```

   有了 async/await,我们的代码执行异步看起来像执行同步一样。可以从头到尾读起来非常简单和易懂，因为出现结果顺序和函数题中从头到尾顺序一样啊！

原文链接：https://www.jianshu.com/p/a138a525c287
