<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './form/LoginForm.vue';
import RegisterForm from './form/RegisterForm.vue';
defineProps({
    openUserModal: Boolean
})
const type = ref('login')
</script>
<template>
    <div class="popup-overlay" :class="openUserModal ? 'active' : ''"></div>
    <div :class="openUserModal ? 'active' : ''" class="popup">
        <div class="popup-close" @click="$emit('close')">&times;</div>
        <LoginForm v-if="type === 'login'" @register="type = 'register'" @loginSuccess="$emit('close')" />
        <RegisterForm v-else @login="type = 'login'" @registerSuccess="type = 'login'" />
    </div>
</template>
<style>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(115, 115, 115, 0.5);
    z-index: 1;
    display: none;
    transition: all 0.3s ease;
}

.popup-overlay.active {
    display: block;
}

.popup {
    position: absolute;
    left: 50%;
    top: -150%;
    transform: translate(-50%, -50%) scale(1.15);
    background: #fff;
    z-index: 2;
    opacity: 0;
    width: 300px;
    height: 450px;
    font-family: fa;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgb(0, 0, 0);
    transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
}

.popup.active {
    top: 50%;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

.active .popup-close {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 25px;
    font-weight: 600;
    background: #555;
    color: #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.popup-close:hover {
    background: #333;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.473);
}

.form .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.form .logo img {
    background-color: #8a9ffd4d;
    border-radius: 50%;
    padding: 10px;
}

.popup .form .header {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #222;
    margin: 20px 0px;
}

.popup .form .element {
    padding: 8px 20px;
}

.popup .form .element label {
    display: block;
    font-size: 14px;
    color: #222;
    margin-bottom: 5px;
}

.popup .form .element input {
    width: 100%;
    box-sizing: border-box;
    background: #eee;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 8px 10px;
}

.popup .form .element button {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    padding: 10px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: #8a9ffd;
    color: #f5f5f5;
}

.popup .form {

    .register,
    .login {
        text-align: center;
        margin-top: 10px;
    }
}
</style>