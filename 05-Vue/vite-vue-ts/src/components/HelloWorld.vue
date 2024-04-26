<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useStoreHooks } from '../hooks/useStore'

import useProducts from '../models/products'
defineProps({
  msg: String,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line unused-imports/no-unused-vars
const { state, getters, commit, dispatch } = useStoreHooks()

console.log('vuex: ', state.user)
// console.log("getters", getters.user);
// console.log("getters", getters.user?.isLogin);
console.log('getters', getters['user/isLogin'])

const handleVuex = () => {
  console.log('handleVuex', state.user.loading)
  commit('user/GET_DATA', !state.user.loading)
  // dispatch("user/GET_DATA");
}
const { products } = await useProducts()
console.log(products)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleVuex">change vuex</button>
  <h2 v-if="state.user.loading">我是 vuex 控制值</h2>
  <ul>
    <li v-for="product in products" :key="product.id">{{ product.title }}</li>
  </ul>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
