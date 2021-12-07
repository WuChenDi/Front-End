<template>
  <h1>watch</h1>

  <h2>{{ state.obj }}</h2>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

const state = reactive({ obj: { count: 0 } })

watch(
  // 确定要监听属性值
  () => state.obj,
  // 回调函数
  (count, prevCount) => {
    console.log('第一个监听的值', count, prevCount)
  },
  // 配置项
  {
    deep: true,
    immediate: true
  }
)

// setTimeout(() => {
//   state.count++
// }, 1000)

setInterval(() => {
  state.obj.count++
}, 1000)
</script>
