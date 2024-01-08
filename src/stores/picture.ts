import { defineStore } from "pinia";

import { ref } from 'vue';

interface picture {
    _id: string,
    url: string,
    time: string,
    likes: number,
}
export const usePicStore = defineStore('photo', () => {
    const pictures = ref<picture[]>([])
    function setPictures(newPictures: picture[]) {
        pictures.value = newPictures;
    }
    function appendPictures(newPictures: picture[]) {
        pictures.value.push(...newPictures)
    }
    function updatePicture(picture: picture) {
        // 通过_id找到对应的picture
        const index = pictures.value.findIndex((item) => item._id === picture._id)
        console.log('通过_id找到对应的picture', index)
        // 更新picture
        pictures.value[index] = picture;
    }
    function deletePicture(id: string) {
        // delete
        const index = pictures.value.findIndex((item) => item._id === id)
        pictures.value.splice(index, 1)
    }
    function incrLikes(id: string | undefined) {
        const index = pictures.value.findIndex((item) => item._id === id)
        pictures.value[index].likes++;
    }
    return { pictures, setPictures, appendPictures, updatePicture, deletePicture, incrLikes }
})