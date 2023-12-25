import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const name = ref('')
    function setName(newName: string) {
        name.value = newName
    }
    const token = ref('')
    function setToken(newToken: string) {
        token.value = newToken
    }
    function logout() {
        name.value = ''
        token.value = ''
    }
    return { name, setName, token, setToken, logout }
})