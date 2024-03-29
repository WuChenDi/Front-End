const compiler = require('vue-template-compiler')

// 插值
// const template = `<p>{{message}}</p>`
// with(this){return _c('p',[_v(_s(message))])}
// 相当于执行这个函数，例如下面：
// function(){with(this){return _c('p',[_v(_s(message))])}}
// with(this){return createElement('p',[createTextVNode(toString(message))])}
// h -> vnode
// createElement -> vnode
// const vm = new Vue({...})
// this -> vm

// 表达式
// const template = `<p>{{flag ? message : 'no message found'}}</p>`
// with(this){return _c('p',[_v(_s(flag ? message : 'no message found'))])}

// 属性和动态属性
// const template = `
//   <div id="div1" class="container">
//     <img :src="imgUrl"/>
//   </div>
// `
//with(this){return _c('div',{staticClass:"container",attrs:{"id":"div1"}},[_c('img',{attrs:{"src":imgUrl}})])}

// 条件
// const template = `
//   <div>
//     <p v-if="flag === 'a'">A</p>
//     <p v-else>B</p>
//   </div>
// `
// with(this){return _c('div',[(flag === 'a')?_c('p',[_v("A")]):_c('p',[_v("B")])])}

// 循环
// const template = `
//   <ul>
//     <li v-for="item in list" :key="item.id">{{item.title}}</li>
//   </ul>
// `
// with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}

// 事件
// const template = `
//   <button @click="clickHandler">submit</button>
// `
// with(this){return _c('button',{on:{"click":clickHandler}},[_v("submit")])}

// 指令 v-show
// const template = `
// <div v-show="stateShow">
//   <p>hello world</p>
// </div>
// `
// with(this){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(stateShow),expression:"stateShow"}]},[_c('p',[_v("hello world")])])}

// 指令 v-loading
const template = `
  <div v-loading="stateLoading">
    <p>hello world</p>
  </div>
`
// with(this){return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(stateLoading),expression:"stateLoading"}]},[_c('p',[_v("hello world")])])}

// 指令 v-model
// const template = `<input type="text" v-model="name">`
// 主要看 input 事件
// with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})}

// render 函数
// 返回 vnode
// patch

// 编译
const { render } = compiler.compile(template)
console.log(render)

// ---------------分割线--------------

// 从 vue 源码中找到缩写函数的含义
// function installRenderHelpers(target) {
//   target._o = markOnce;
//   target._n = toNumber;
//   target._s = toString;
//   target._l = renderList;
//   target._t = renderSlot;
//   target._q = looseEqual;
//   target._i = looseIndexOf;
//   target._m = renderStatic;
//   target._f = resolveFilter;
//   target._k = checkKeyCodes;
//   target._b = bindObjectProps;
//   target._v = createTextVNode;
//   target._e = createEmptyVNode;
//   target._u = resolveScopedSlots;
//   target._g = bindObjectListeners;
//   target._d = bindDynamicKeys;
//   target._p = prependModifier;
// }
