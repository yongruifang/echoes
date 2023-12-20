<template>
    <div class="flex-modal" :style="isModalShow">
        <header>
            <p class="modal-name">{{ title }}</p>
            <Icon class="close-tag" icon="carbon:close" @click="closeModal"></Icon>
        </header>
        <slot name="card-content"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
const props = defineProps({
    title: {
        default: '标题'
    },
    isModal: {
        default: false
    }
})
const isModalShow = computed(() => {
    return props.isModal ? "transform: translateX(0)" :
        "transform: translateX(100%)"
})
const emit = defineEmits(['close'])
const closeModal = () => {
    emit('close')
}
</script>

<style scoped>
.flex-modal {
    position: fixed;
    top: 60px;
    right: 0;
    width: 25%;
    min-width: 240px;
    height: 100%;
    background-color: #fff;
    transition: .3s;
    backdrop-filter: blur(20px);
}

header {
    display: flex;
    margin: 5px 10px;
    justify-content: space-between;
    align-items: center;
}

.close-tag {
    cursor: pointer;
    transition: .3s;
}

.close-tag:hover {
    transform: scale(1.5);
    background: #d5d5d5;
    border-radius: 50%;
}
</style>