<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue';
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #fff;
}
</style>