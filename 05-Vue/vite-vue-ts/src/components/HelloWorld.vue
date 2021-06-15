<template>
  <h1>{{ msg }}</h1>
  <button @click="handleVuex">change vuex</button>
  <h2 v-if="state.user.loading">我是 vuex 控制值</h2>
  <ul>
    <li v-for="product in products" :key="product.id">{{ product.title }}</li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
// import { useStore } from "vuex";
// import type { State } from "../store";

// const { state, getters } = useStore<State>();

import { useDDStore } from "../hooks/use-store";
const { state, getters, commit, dispatch } = useDDStore();

defineProps({
  msg: String,
});

console.log("vuex: ", state.user);
// console.log("getters", getters.user);
// console.log("getters", getters.user?.isLogin);
console.log("getters", getters["user/isLogin"]);

const handleVuex = () => {
  console.log("handleVuex", state.user.loading);
  commit("user/GET_DATA", !state.user.loading);
  // dispatch("user/GET_DATA");
};

import useProducts from "../models/products";
const { products } = await useProducts();
console.log(products);
</script>

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
