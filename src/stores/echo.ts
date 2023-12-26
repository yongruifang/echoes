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

export const useEchoStore = defineStore('echo', ()=>{
    const echoes = ref<Message[]>([])
    function setEchoes(newEchoes: Message[]){
        echoes.value = newEchoes;
    }   
    function appendEchoes(newEchoes: Message[]){
        echoes.value.push(...newEchoes)
    }
    function updateEcho(id: string){
        // update
    }
    function deleteEcho(id: string){
        // delete
    }
    return {echoes, setEchoes, appendEchoes, updateEcho, deleteEcho}
})