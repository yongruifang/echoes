import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const name = ref(localStorage.getItem('name') || '')
    function setName(newName: string) {
        name.value = newName
        localStorage.setItem('name', newName)
    }
    const token = ref(localStorage.getItem('token') || '')
    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }
    function logout() {
        name.value = ''
        token.value = ''
    }
    return { name, setName, token, setToken, logout }
})