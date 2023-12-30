<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UserModal from '@/components/UserModal.vue'
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue'
const props = defineProps({
    active: {
        type: String,
        default: '/'
    },
    logged: {
        type: Boolean,
        default: false
    }
})
const openUserModal = ref(props.logged)
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
onMounted(() => {
    if (props.logged === false) {
        openUserModal.value = true
    }
})
</script>
<template>
    <header>
        <nav class="nav-bar">
            <div class="nav-header">
                <div class="logo"><img alt="Echo logo" src="@/assets/echo.svg" width="100" height="50" /></div>
                <Icon icon="carbon:menu" class="toggle-expand" @click="expandMenu = !expandMenu"></Icon>
            </div>
            <ul class="nav-element">
                <li :class="active === '/' ? 'active' : ''">
                    <RouterLink to="/">
                        留言墙
                    </RouterLink>
                </li>
                <li :class="active === '/photo' ? 'active' : ''">
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
header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 799;
}

.nav-bar {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(rgba(76, 163, 178, 0.089), #fff);
    /* 毛玻璃效果 */
    backdrop-filter: blur(8px);
}

.nav-header .logo {
    margin-left: 20px;
}

ul {
    display: flex;
    gap: 30px;
    padding-right: 100px;
    font-size: 15px;
    font-weight: 800;
}

li {
    list-style: none;
    min-width: 50px;
    padding: 20px;
    text-align: center;
    position: relative;
    transition: all ease-in-out .2s;
}

li:hover {
    transform: translate(0, -5px);
}

.nav-element a {
    text-decoration: none;
    color: rgba(76, 162, 178, 0.575);
}

.nav-element a:hover {
    color: rgba(76, 162, 178, 1);
}

.nav-element li.active a {
    font-weight: 900;
    color: rgba(76, 163, 178, 0.935);
}

/* .nav-element li.active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    left: 0;
    bottom: 0;
    background-color: rgba(76, 162, 178, 0.575);
    transition: all ease-in-out .2s;
} */
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
    margin-right: 10px;
    transition: all ease-in-out .2s;
}

.avatar:hover {
    transform: scale(1.1);
}


.user-status {
    cursor: pointer;
}

.toggle-expand {
    width: 30px;
    height: 30px;
    display: none;
    cursor: pointer;
    margin-right: 10px;
}

.dropdown {
    position: absolute;
    top: 71px;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
        overflow: hidden;
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

        .logo {
            flex-grow: 2;
            display: flex;
            justify-content: center;
        }
    }

    .nav-element {
        display: none;
    }

    .nav-bar>.avatar {
        display: none;
    }
}
</style>
