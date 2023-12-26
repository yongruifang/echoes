<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/layout/NavBar.vue';
import router from '@/router'
const path = ref('/')
router.beforeEach((to) => {
  // console.log('router', to, from)
  path.value = to.path
})
</script>

<template>
  <NavBar :active="path" />
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