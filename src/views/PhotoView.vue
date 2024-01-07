<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AddPicForm from '@/components/form/AddPicForm.vue'
import { ref } from 'vue';
const showModal = ref(true)
const toggleAdd = () => {
    showModal.value = !showModal.value
}
</script>
<template>
    <div class="photo-plane">
        <div class="header">
            <h2>照片墙</h2>
        </div>
        <div class="content">
            多列布局+瀑布流
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
</style>