<template>
  <h1>watchEffect</h1>

  <h2>{{ num }}</h2>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";

const num = ref(0);
onMounted(() => {
  console.log("onMounted");
});
watchEffect(
  () => {
    console.log("watchEffect", num.value);
  },
  {
    onTrigger(e) {
      console.log("onTrigger", e);
    },
  }
);

setInterval(() => {
  num.value++;
}, 1000);
</script>
