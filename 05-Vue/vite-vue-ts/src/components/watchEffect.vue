<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'

const num = ref(0)

const state = reactive({
  name: 'dd',
  age: 20,
})

watchEffect(
  () => {
    // 初始化时，一定会执行一次（收集需要监听数据）
    console.log('watchEffect', num.value)

    console.log('state.name', state.name)
    console.log('state.age', state.age)
  },
  {
    onTrigger(e) {
      console.log('onTrigger', e)
    },
  }
)

setInterval(() => {
  num.value++
}, 1000)

setInterval(() => {
  state.name += 'd'
}, 2000)

setInterval(() => {
  state.age++
}, 3000)
</script>

<template>
  <h1>watchEffect</h1>

  <h2>num: {{ num }}</h2>

  <h3>name: {{ state.name }} age: {{ state.age }}</h3>
</template>
