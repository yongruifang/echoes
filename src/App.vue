<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <div class="logo-block">
        <img alt="Vue logo" class="logo" src="@/assets/moment-echoes.svg" width="50" height="50" />
        <p>Echoes</p>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">留言墙</RouterLink>
          <RouterLink to="/photo">照片墙</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
}

header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header .logo-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;

  p {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
  }
}

header .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
}

nav a {
  /* background-color: #3B73F0; */
  color: #3b73f0;
  padding: 10px 20px;
  border-radius: 50px;
  margin: 0 10px;
}

nav a.router-link-active {
  background-color: #3b73f0;
  color: #fff;
}


@media (min-width: 1024px) {}
</style>
