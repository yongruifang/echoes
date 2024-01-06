import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const _id = ref('')
    function setId(newId: string) {
        _id.value = newId
    }
    const name = ref('')
    function setName(newName: string) {
        name.value = newName
    }
    const token = ref('')
    function setToken(newToken: string) {
        token.value = newToken
    }
    const likeset = ref<string[]>([])
    function setLikeset(newLikeset: string[]) {
        likeset.value = newLikeset
    }
    function addLike(newLike: string) {
        likeset.value.push(newLike)
    }
    function removeLike(newLike: string) {
        likeset.value = likeset.value.filter((item: string) => item !== newLike)
    }
    function logout() {
        _id.value = ''
        name.value = ''
        token.value = ''
        likeset.value = []
    }
    return { _id, setId, name, setName, token, setToken, logout, likeset, setLikeset, addLike, removeLike }
})