<template>
  <h1>{{ msg }}</h1>
  <ul>
    <li v-for="product in products" :key="product.id">{{ product.title }}</li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
// import { useStore } from "vuex";
// import type { State } from "../store";

import { useDDStore } from "../hooks/use-store";
const { state, getters } = useDDStore();

defineProps({
  msg: String,
});

// const { state, getters } = useStore<State>();
console.log("vuex: ", state.user);
console.log("getters", getters.user);
console.log("getters", getters.user?.isLogin);
// console.log("getters", getters["user/isLogin"]);
console.log("getters", getters["user/isLogin"]);

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
