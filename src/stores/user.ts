import { defineStore } from 'pinia'

interface UserState {
    name: string;
    token: string;
}

export const useUserStore = defineStore('user', () => {
    const state: UserState = {
        name: '',
        token: ''
    }

    function setName(name: string) {
        state.name = name
    }

    function setToken(token: string) {
        state.token = token
    }

    return { state, setName, setToken }
})