import { createApp, defineComponent, h, createVNode, reactive, ref } from 'vue'
// import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'

// import img from './assets/logo.png'
const img = require('./assets/logo.png') // eslint-disable-line

// createElement
// h => createVNode
// const App = defineComponent({
//   render() {
//     return h('div', { id: 'app' }, [
//       h('img', {
//         alt: 'Vue logo',
//         src: img
//       }),
//       h(HelloWorld, {
//         msg: 'Welcome to Your Vue.js + TypeScript App',
//         age: 12
//       })
//     ])
//     // return createVNode('div', { id: 'app' }, [
//     //   createVNode('img', {
//     //     alt: 'Vue logo',
//     //     src: img
//     //   }),
//     //   createVNode(HelloWorld, {
//     //     msg: 'Welcome to Your Vue.js + TypeScript App',
//     //     age: 12
//     //   })
//     // ])
//   }
// })

const App = defineComponent({
  setup() {
    const state = reactive({
      name: 'wcd'
    })
    const numberRef = ref(1)

    setInterval(() => {
      state.name += '1'
      numberRef.value += 1
    }, 1000)

    // 1. setup只会在组件创建的时候执行一次
    // 2. 对于reactive与ref.value的变化，会引起 return 函数的重新执行来生成新的 dom 树，而不会触发setup的重新执行，因此一些赋值应该放在render函数中，而不是在setup中
    // const number = numberRef.value

    return () => {
      const number = numberRef.value

      return h('div', { id: 'app' }, [
        h('img', {
          alt: 'Vue logo',
          src: img
        }),
        h(HelloWorld, {
          msg: 'Welcome to Your Vue.js + TypeScript App',
          age: 12
        }),
        h('p', state.name + number)
      ])
    }
  }
})

createApp(App).mount('#app')
