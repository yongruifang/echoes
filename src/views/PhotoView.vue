<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AddPicForm from '@/components/form/AddPicForm.vue'
import { onMounted, ref } from 'vue';
import { fetchPicListApi } from '@/api/picture';
const showModal = ref(true)
const baseUrl = import.meta.env.VITE_S3_BUCKET_BASE_URL
interface picture {
    url: string
}
const picList = ref<picture[]>([])
const toggleAdd = () => {
    showModal.value = !showModal.value
}
const getPicList = async () => {
    console.log('trigger getPicList')
    const res = await fetchPicListApi()
    console.log(res.data.Contents)
    res.data.Contents.forEach((content: any) => {
        for (let i = 0; i < 10; i++)
            picList.value.push({
                url: baseUrl + content.Key,
            })
    })
}
onMounted(() => {
    getPicList()
})
</script>
<template>
    <div class="photo-plane">
        <div class="header">
            <h2>照片墙</h2>
        </div>
        <div class="content">
            多列布局+瀑布流
        </div>
        <div class="pic-grid">
            <div class="pic-item" v-for="pic in picList" :key="pic.url">
                <img :src="pic.url" alt="" />
            </div>
        </div>
    </div>
    <button class="add-btn" @click="toggleAdd">
        <Icon icon="carbon:add-large" />
    </button>
    <AddPicForm v-if="showModal" />
    <Transition name="overlay">
        <div class="overlay" v-show="showModal" @click="toggleAdd"></div>
    </Transition>
</template>

<style scoped>
.photo-plane {
    margin-top: 90px;
}

.add-btn {
    background: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 750;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
}

.pic-grid {
    column-count: 3;
    column-gap: 13px;
    column-fill: balance;
    box-sizing: border-box;
}

.pic-item {
    margin-bottom: 10px;
    break-inside: avoid;

    img {
        width: 100%;
        border-radius: 5px;
    }
}

@media(max-width: 768px) {
    .pic-grid {
        column-count: 2;
    }
}

@media(max-width: 576px) {
    .pic-grid {
        column-count: 1;
    }
}
</style>