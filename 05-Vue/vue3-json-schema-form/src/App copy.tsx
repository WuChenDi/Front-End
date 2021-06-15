// import { defineComponent, h, reactive, ref } from 'vue'
// // import HelloWorld from './components/HelloWorld.vue'
// import HelloWorld from './components/HelloWorld'

// const img = require('./assets/logo.png') // eslint-disable-line

// function renderHelloWorld(num: number) {
//   return (
//     <HelloWorld msg={'Welcome to Your Vue.js + TypeScript App'} age={num} />
//   )
// }

// export default defineComponent({
//   setup() {
//     const state = reactive({
//       name: 'wcd'
//     })
//     const numberRef = ref(1)

//     setInterval(() => {
//       // state.name += '1'
//       numberRef.value += 1
//     }, 1000)

//     return () => {
//       const number = numberRef.value
//       console.log(state.name)

//       return (
//         <div id='app'>
//           <img src={img} alt='Vue logo' />
//           {renderHelloWorld(123)}
//           <p>{state.name + number}</p>
//           <input type='text' v-model={state.name} />
//         </div>
//       )
//       // return h('div', { id: 'app' }, [
//       //   h('img', {
//       //     alt: 'Vue logo',
//       //     src: img
//       //   }),
//       //   h(HelloWorld, {
//       //     msg: 'Welcome to Your Vue.js + TypeScript App',
//       //     age: 12
//       //   }),
//       //   h('p', state.name + number)
//       // ])
//     }
//   }
// })
