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
import EchoLoading from '@/components/common/EchoLoading.vue';
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
const isLoading = ref(false)
const isEnd = ref(false)
const imgsRef = computed(() => {
    const arr = picStore.pictures.map((pic: picture) => baseURL + pic.url)
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
    if (isEnd.value) isEnd.value = false;
    fetchData();
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
function throttle(func: any, wait: number) {
    let timeout: number | null, result: any
    return function (this: any) {
        if (!timeout) {
            // const args: any[] = [...arguments]
            // console.debug(args, wait)
            timeout = setTimeout(() => {
                //'this' implicitly has type 'any' because it does not have a type annotation
                // this:any
                result = func.apply(this.args)
                timeout = null
            }, wait);
        }
        return result
    }
}
const triggerDistance = 200;
const fetchData = async () => {
    const res = await fetchPicListApi({ limit: 20, offset: picStore.pictures.length })
    picStore.appendPictures(res.data)
    return res;
}
const infiniteScroll = async () => {
    const container = document.getElementsByClassName('photo-plane')[0]
    if (!container) return
    const distance = container.getBoundingClientRect().bottom - window.innerHeight;
    if (!isLoading.value && !isEnd.value && distance < triggerDistance) {
        isLoading.value = true;
        console.log('fetching...')
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('')
            }, 3000);
        })
        const res = await fetchData();
        if (res.data.length === 0) isEnd.value = true;
        isLoading.value = false;
        if (res.status === 'error') {
            openAlert({ type: "error", message: res.message, show: true, autoClose: false })
        }
    }
}
window.addEventListener('scroll', throttle(infiniteScroll, 50))
</script>
<template>
    <div class="photo-plane">
        <div class="header">
            <h2>照片墙</h2>
        </div>
        <div class="content">
            <!-- 多列布局+瀑布流 -->
        </div>
        <div class="pic-grid">
            <div class="pic-item" v-for="(pic, index) in picStore.pictures" :key="pic.url">
                <EchoPhoto :url="baseURL + pic.url" :likes="pic.likes" :time="pic.time" :_id="pic._id"
                    @view="toggleView(index)" :name="pic.url" />
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
    <div v-show="isLoading" class="loading-spinner">
        <EchoLoading />
        <p>加载中...</p>
    </div>
    <div v-show="isEnd" style="text-align:center; font-size: 0.8rem; color: gray; margin: 10px 0">No more Data</div>
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
    /* column-count: 4; */
    column-width: 400px;
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
        column-width: 300px;
    }
}

@media(max-width: 576px) {
    .pic-grid {
        column-width: 250px;
    }
}

.loading-spinner {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
}
</style>