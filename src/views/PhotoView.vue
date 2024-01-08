<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AddPicForm from '@/components/form/AddPicForm.vue'
import EchoPhoto from '@/components/EchoPhoto.vue';
import { onMounted, ref, computed } from 'vue';
import { fetchPicListApi } from '@/api/picture';
import { usePicStore } from '@/stores/picture';
import VueEasyLightbox from 'vue-easy-lightbox';
import { useAlertStore } from '@/stores/alert';
import EchoAlert from '@/components/common/EchoAlert.vue';
const alertStore = useAlertStore()
const picStore = usePicStore()
const showModal = ref(false)
const baseURL = import.meta.env.VITE_S3_BUCKET_BASE_URL
interface picture {
    _id: string,
    url: string,
    time: string,
    likes: number,
}
const imgsRef = computed(() => {
    const arr = picStore.pictures.map((pic: picture) => pic.url)
    console.log(arr)
    return arr;
})
const indexRef = ref(0)
const visibleRef = ref(false)
const onHide = () => {
    visibleRef.value = false
}
const toggleView = (index: number) => {
    indexRef.value = index
    visibleRef.value = true
}
const toggleAdd = () => {
    showModal.value = !showModal.value
}
const handleUpload = () => {
    toggleAdd();
}
type AlertType = "success" | "error" | "warning" | "info";
type AlertArgs = {
    type: AlertType;
    message: string;
    show: boolean;
    autoClose: boolean;
}
const openAlert = (args: AlertArgs) => {
    alertStore.setAlert(args)
}
onMounted(() => {
    if (picStore.pictures.length === 0) {
        fetchPicListApi({ limit: 20, offset: 0 }).then((res: any) => {
            picStore.setPictures(res.data)
            console.log(res.data)
        }).catch((err) => {
            openAlert({ type: "error", message: err.message, show: true, autoClose: false })
        })
    }
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
            <div class="pic-item" v-for="(pic, index) in picStore.pictures" :key="pic.url">
                <EchoPhoto :url="baseURL + pic.url" :likes="pic.likes" :time="pic.time" :_id="pic._id"
                    @view="toggleView(index)" />
            </div>
        </div>
        <vue-easy-lightbox :imgs="imgsRef" :index="indexRef" :visible="visibleRef" @hide="onHide" />
    </div>
    <button class="add-btn" @click="toggleAdd">
        <Icon icon="carbon:add-large" />
    </button>
    <AddPicForm v-if="showModal" @upload="handleUpload" />
    <Transition name="overlay">
        <div class="overlay" v-show="showModal" @click="toggleAdd"></div>
    </Transition>
    <Teleport to="#notification">
        <EchoAlert :show="alertStore.show" :type="alertStore.type" :message="alertStore.message"
            :auto-close="alertStore.autoClose" @close="alertStore.toggleClose">
        </EchoAlert>
    </Teleport>
</template>

<style scoped>
.photo-plane {
    margin-top: 90px;
}

.add-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #fff;
    width: 30px;
    height: 30px;
    border: 2px solid red;
    color: red;
    border-radius: 50%;
    cursor: pointer;
    z-index: 751;
    transition: all 0.3s ease;
}

.add-btn:hover {
    transform: scale(1.1);
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
    column-count: 4;
    column-gap: 13px;
    column-fill: balance;
    box-sizing: border-box;
}

.pic-item {
    margin-bottom: 10px;
    break-inside: avoid;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media(max-width: 768px) {
    .pic-grid {
        column-count: 3;
    }
}

@media(max-width: 576px) {
    .pic-grid {
        column-count: 2;
    }
}
</style>