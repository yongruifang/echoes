<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue';
</script>

<template>
  <main>
    <TopBar />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
