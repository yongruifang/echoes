<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from './components/layout/NavBar.vue';
import router from '@/router'
import { useUserStore } from './stores/user';
const userStore = useUserStore()
const path = ref('/')
router.beforeEach((to) => {
  // console.log('router', to, from)
  path.value = to.path
})
const isLogin = ref(false)
onMounted(() => {
  if (userStore.token) {
    isLogin.value = true
  }
})
</script>

<template>
  <NavBar :active="path" :logged="isLogin" />
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