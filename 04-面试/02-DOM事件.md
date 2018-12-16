# DOM事件类
1. 基本概念：DOM事件的级别
2. DOM事件模型
3. DOM事件流
4. 描述DOM事件捕获的具体流
5. Event对象的常见应用
6. 自定义事件

## 事件级别
```js
  DOM0 element.=function(){}

  DOM2 element.addEventListener('click', function(){}, false)    //冒泡false和捕获true

  DOM3 element.addEventListener('keyup', function(){}, false)
```

## 事件流

<img src="../screenshots/面试-DOM事件-事件流.png"/>

## 描述DOM事件捕获的具体流程

<img src="../screenshots/面试-DOM事件-事件捕获流程.png"/>

## Event对象的常见应用

```js
  event. preventDefault()             // 阻止默认事件(a标签)
  event. stopPropagation()            // 阻止冒泡
  event. stoplmmediatePropagation()   //绑定两个事件触发A事件阻止B事件发生
  event. currentTarget                //返回绑定事件的元素
  event. target                       //返回触发事件的元素
```
## 自定义事件（[code](https://github.com/WuChenDi/Front-End/blob/master/04-%E9%9D%A2%E8%AF%95/2018%E5%B9%B4%E5%BA%95Coding/event.html)）

```js
  var eve = new Event('custome')
  ev.addEventListener('custome', function () {
    console.log('custome')
  })
  events.addEventListener('click', function () {
    window.dispatchEvent(eve)
  }, true)
```
