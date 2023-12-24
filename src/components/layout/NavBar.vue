<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
        <nav class="nav-bar">
            <div class="logo"><img alt="Echo logo" src="@/assets/echo.svg" width="100" height="50" /></div>
            <ul class="nav-element">
                <li>
                    <RouterLink to="/">
                        留言墙
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/photo">
                        照片墙
                    </RouterLink>
                </li>
            </ul>
            <div class="avatar"></div>
        </nav>
    </header>
</template>
<style scoped>
.nav-bar {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(rgba(76, 163, 178, 0.089), #fff);
    padding: 0 20px;
    margin: 0 0 10px 0;
}

ul {
    display: flex;
    gap: 30px;
    padding-right: 100px;
}

li {
    list-style: none;
    min-width: 50px;
    padding: 20px;
    text-align: center;
    position: relative;
}

.nav-element a {
    text-decoration: none;
    color: rgba(76, 162, 178, 0.575);
}

.nav-element a:hover {
    color: rgba(76, 162, 178, 1);
}

.nav-element li::after {
    content: '';
    position: absolute;
    width: 0;
    height: 5px;
    left: 50%;
    bottom: 0;
    background-color: rgba(76, 162, 178, 0.575);
    transition: all ease-in-out .2s;
}

.nav-element li:hover::after {
    width: 100%;
    left: 0;
}

.avatar {
    width: 50px;
    height: 50px;
    background-color: rgb(255, 0, 0);
    border-radius: 50%;
}
</style>
