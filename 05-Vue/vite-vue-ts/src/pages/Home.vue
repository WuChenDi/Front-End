<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  Home组件
  <Suspense>
    <template #default>
      <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
