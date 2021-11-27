<template>
  <p>生命周期-兼容 2 的写法 ------ {{msg}}</p>
</template>

<script>
export default {
  name: 'LifeCycles2',
  props: {
    msg: String
  },

  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  // beforeDestroy 改名
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  // destroyed 改名
  unmounted() {
    console.log('unmounted')
  }
}
</script>
