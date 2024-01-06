<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/layout/NavBar.vue';
import router from '@/router'
import { useUserStore } from './stores/user';
const userStore = useUserStore()
const path = ref('/')
router.beforeEach((to) => {
  path.value = to.path
})
const checkLogin = () => {
  if (userStore.token) {
    return true
  }
  return false
}
const isLogin = checkLogin()
</script>

<template>
  <NavBar :active="path" :logged=isLogin />
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