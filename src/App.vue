<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue';
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style>
@font-face {
  font-family: 'fa';
  src: url('./assets/font/RuiZiBiGe.ttf')
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans SC', sans-serif, fa;
  background-color: #fff;
}
</style>