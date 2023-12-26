import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Message {
    _id?: string,
    color: string,
    time: string,
    content: string,
    from: string,
    tag: string,
}

export const useEchoStore = defineStore('echo', () => {
    const echoes = ref<Message[]>([])
    const activeId = ref<string>('')
    function setEchoes(newEchoes: Message[]) {
        echoes.value = newEchoes;
    }
    function appendEchoes(newEchoes: Message[]) {
        echoes.value.push(...newEchoes)
    }
    function updateEcho(Echo: Message) {
        // 通过_id找到对应的echo
        const index = echoes.value.findIndex((item) => item._id === Echo._id)
        console.log('通过_id找到对应的echo', index)
        // 更新echo
        echoes.value[index] = Echo;
    }
    function deleteEcho(id: string) {
        // delete
        const index = echoes.value.findIndex((item) => item._id === id)
        echoes.value.splice(index, 1)
    }
    function setActiveId(id: string) {
        activeId.value = id;
    }
    return { activeId, echoes, setEchoes, appendEchoes, updateEcho, deleteEcho, setActiveId }
})