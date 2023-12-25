<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UserModal from '@/components/UserModal.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue'
const openUserModal = ref(false)
const userStore = useUserStore()
// 计算属性，根据userStore的token判断是否登录
const isLogin = computed(() => {
    const { token } = storeToRefs(userStore)
    return token.value !== ''
})
const clickAvatar = () => {
    if (isLogin.value) {
        // 浏览器原生的confirm弹窗
        if (window.confirm('确定要退出登录吗？')) {
            userStore.logout()
            console.log('已退出登录')
        }
    } else {
        openUserModal.value = true
    }
}
const expandMenu = ref(false)
</script>
<template>
    <header>
        <nav class="nav-bar">
            <div class="nav-header">
                <div class="logo"><img alt="Echo logo" src="@/assets/echo.svg" width="100" height="50" /></div>
                <Icon icon="carbon:menu" class="toggle-expand" @click="expandMenu = !expandMenu"></Icon>
            </div>
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
            <div class="avatar" @click="clickAvatar">
                {{ isLogin ? '退出' : '登录' }}
            </div>
            <!-- 下拉菜单 -->
            <div class="dropdown" v-show="expandMenu">
                <ul>
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
                    <li>
                        <div class="user-status" @click="clickAvatar">
                            {{ isLogin ? '退出' : '登录' }}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <UserModal :openUserModal="openUserModal" @close="openUserModal = false" />
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
    cursor: pointer;
    text-align: center;
    line-height: 50px;
}

.user-status {
    cursor: pointer;
}

.toggle-expand {
    width: 30px;
    height: 30px;
    display: none;
    cursor: pointer;
}

.dropdown {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: none;

    ul {
        display: flex;
        flex-direction: column;
    }
}

@media screen and (max-width: 768px) {
    .toggle-expand {
        display: block;
        cursor: pointer;
    }

    .dropdown {
        display: block;
    }

    .nav-bar {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .nav-header {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        align-items: center;
        width: 100%;
    }

    .nav-element {
        display: none;
    }

    .nav-bar>.avatar {
        display: none;
    }
}
</style>
