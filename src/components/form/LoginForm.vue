<script setup lang="ts">
import { fetchLoginApi } from '@/api/user'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user';
const name = ref('')
const password = ref('')
const userStore = useUserStore()
const emits = defineEmits(['register', 'loginSuccess', 'failed'])
const memberLogin = async () => {
    const res = await fetchLoginApi(name.value, password.value);
    if (res.status !== 'success') {
        emits('failed', res)
        return
    }
    userStore.setId(res.user._id)
    userStore.setName(res.user.name)
    userStore.setToken(res.user.token)
    userStore.setLikeset(res.user.likeset)
    // 通知父组件登录成功
    emits('loginSuccess')
}
const passwordType = ref('password')
onMounted(() => {
    const passwordField = document.getElementById("password");
    const togglePassword = document.querySelector(".password-toggle-icon svg");
    togglePassword?.addEventListener("click", function (e) {
        const type = passwordField?.getAttribute("type") === "password" ? "text" : "password";
        passwordField?.setAttribute("type", type);
        passwordType.value = type;
        console.log(e)
    });
})
</script>
<template>
    <div class="form" @keyup.enter="memberLogin">
        <div class="logo">
            <img src="@/assets/echo.svg" alt="Echo logo" width="100px" height="100px" />
        </div>
        <div class="header">
            Member login
        </div>
        <div class="element">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="name" />
        </div>
        <div class="element">
            <label for="password">Password: </label>
            <div class="password-box">
                <input type="password" id="password" v-model="password" />
                <span class="password-toggle-icon">
                    <Icon :icon="passwordType === 'text' ? 'carbon:view-off' : 'carbon:view'"></Icon>
                </span>
            </div>
        </div>
        <div class="element">
            <button type="submit" @click="memberLogin">Login</button>
        </div>
        <div class="element register">
            <a @click="$emit('register')" href="#">Register</a>
        </div>
    </div>
</template>
<style scoped>
.password-box {
    position: relative;
}

.password-toggle-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    transition: color 0.3s ease-in-out;
}
</style>