<template>
  <div>
    <el-menu :router="true" mode="horizontal">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/vue">vue</el-menu-item>
      <el-menu-item index="/react">react</el-menu-item>
      <el-menu-item index="/angular">angular</el-menu-item>
    </el-menu>
    <router-view />
    <div id="vue"></div>
    <div id="react"></div>
    <div id="angular"></div>
  </div>
</template>

