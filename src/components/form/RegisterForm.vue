<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchRegisterApi } from '@/api/user'
const name = ref('')
const password = ref('')
const emits = defineEmits(['login', 'registerSuccess', 'failed'])
const toggleRegister = async () => {
    const res = await fetchRegisterApi(name.value, password.value)
    if (res.status !== 'success') {
        emits('failed', res)
        return
    }
    console.log(res)
    // 通知父组件注册成功
    emits('registerSuccess')
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
    <div class="form" @keyup.enter="toggleRegister">
        <div class="logo">
            <img src="@/assets/echo.svg" alt="Echo logo" width="100px" height="100px" />
        </div>
        <div class="header">
            Member register
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
            <button type="submit" @click="toggleRegister">Register</button>
        </div>
        <div class="element login">
            <a @click="$emit('login')" href="#">Login</a>
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