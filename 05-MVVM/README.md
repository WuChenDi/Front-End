# MVVM的介绍

## MVC
- M: Model 数据模型（专门用来操作数据，数据的CRUD）
- V：View 视图（对于前端来说，就是页面）
- C：Controller 控制器（是视图和数据模型沟通的桥梁，用于处理业务逻辑）

## MVVM组成

- MVVM分为三个部分：分别是M(Model，模型层)，V(View，视图层)，VM(ViewModel，V与M连接的桥梁，也可以看作为控制器)
- M：模型层，主要负责业务数据相关;
- V：视图层，顾名思义，负责视图相关，细分下来就是html+css层;
- VM：V与M沟通的桥梁，负责监听M或者V的修改，是实现MVVM双向绑定的要点;

## 优势
- MVC模式，将应用程序划分为三大部分，实现了职责分离
- 在前端中经常要通过 JS代码 来进行一些逻辑操作，最终还要把这些逻辑操作的结果现在页面中。也就是需要频繁的操作DOM
- MVVM通过数据双向绑定让数据自动地双向同步
    - V（修改数据） -> M
    - M（修改数据） -> V
    - 数据是核心
- MVVM支持双向绑定，意思就是当M层数据进行修改时，VM层会监测到变化，并且通知V层进行相应的修改，反之修改V层则会通知M层数据进行修改，以此也实现了视图与模型层的相互解耦,简单来说，数据MVVM的核心

## 原理图
<img src="../screenshots/new MVVM.png"/>


## Vue.js双向数据绑定

- 双向数据绑定：将DOM与Vue实例的data数据绑定到一起，彼此之间相互影响
    - 数据的改变会引起DOM的改变
    - DOM的改变也会引起数据的变化
- 原理：Object.defineProperty中的get和set方法
    - getter和setter：访问器
    - 作用：指定读取或设置对象属性值的时候，执行的操作

- [Vue - 深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)