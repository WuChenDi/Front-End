<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
  <HelloWorld msg="vue,typescript" />
  <p>{{ state.name }}</p>
  <p>{{ nameRef }}</p>
  <p>{{ computedNameRef }}</p>
  <p>{{ nameRef2 }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, computed, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

// interface Config {
//   name: string
// }

export default defineComponent({
  name: 'App',
  // props: {
  //   age: {
  //     type: Number as PropType<number>
  //   },
  //   config: {
  //     type: Object as PropType<Config>,
  //     required: true
  //   }
  // },
  // components: {
  //   HelloWorld
  // },
  // data() {
  //   return {
  //     name: 'wcd'
  //   }
  // },
  // mounted() {
  //   console.log(this.config?.name ?? 'wcd')
  //   console.log(this.state.name)
  // },
  components: {
    HelloWorld
  },
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      name: 'log'
    })
    const nameRef = ref('log')
    const nameRef2 = ref('log')

    setInterval(() => {
      state.name += '1'
      nameRef.value += '1'
    }, 5000)

    setInterval(() => {
      nameRef2.value += '1'
    }, 1000)

    const computedNameRef = computed(() => {
      return nameRef.value + '2'
    })

    watchEffect(() => {
      console.log(nameRef.value)
    })

    return {
      state,
      nameRef,
      nameRef2,
      computedNameRef
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
