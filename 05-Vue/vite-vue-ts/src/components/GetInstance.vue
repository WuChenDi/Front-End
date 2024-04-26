<!-- eslint-disable no-console -->
<script>
import { onMounted, getCurrentInstance } from 'vue'

export default {
  name: 'GetInstance',
  // created beforeCreate 合集，所以
  setup() {
    console.log('this1', this)

    const instance = getCurrentInstance()

    onMounted(() => {
      console.log('this in onMounted', this)
      console.log('x', instance.data.x)
    })

    console.log('instance', instance)
    return {
      instance,
    }
  },
  data() {
    return {
      x: 1,
      y: 2,
    }
  },
  mounted() {
    console.log('this2', this)
    console.log('y', this.y)
  },
}
</script>

<template>
  <p>get instance</p>
  <ul>
    <li>在 setup 和其他 Composition API 中不存在 this</li>
    <li>可通过 getCurrentInstance 获取当前实例</li>
    <li>使用 Options API 不影响，this 照常使用</li>
  </ul>
</template>
