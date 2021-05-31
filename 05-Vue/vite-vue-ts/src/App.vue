<template>
  <img alt="Vue logo" src="./assets/logo.png" />

  <ul>
    <li>
      <router-link to="/">index</router-link>
    </li>
    <li>
      <router-link to="/chart">ChartDemo</router-link>
    </li>
  </ul>

  <router-view></router-view>
</template>

<script setup lang="ts"></script>

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
