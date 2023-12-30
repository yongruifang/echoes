<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, watch, onBeforeUpdate, onUpdated } from 'vue';
const props = defineProps({
    type: String,
    message: String,
    show: Boolean,
    autoClose: Boolean
})
const emits = defineEmits(['close'])
const iconType = computed(() => {
    switch (props.type) {
        case 'error':
            return 'ri:error-warning-fill'
        case 'info':
            return 'ri:information-2-fill'
        case 'success':
            return 'ep:success-filled'
        default:
            return 'ri:information-2-fill'
    }
})
const colorType = computed(() => {
    switch (props.type) {
        case 'error':
            return '#f56c6c'
        case 'info':
            return '#409eff'
        case 'success':
            return '#67c23a'
        default:
            return '#409eff'
    }
})
const title = computed(() => {
    switch (props.type) {
        case 'error':
            return '错误'
        case 'info':
            return '提示'
        case 'success':
            return '成功'
        default:
            return '提示'
    }
})
let timer: any = null
// watch(() => props.show, (val) => {
//     if (val && props.autoClose) {
//         timer = setTimeout(() => {
//             emits('close')
//         }, 3000)
//     }
// })
onBeforeUpdate(() => {
    console.log('onBeforeUpdate')
    clearTimeout(timer)
})
onUpdated(() => {
    console.log('onUpdated')
    if (props.show && props.autoClose) {
        timer = setTimeout(() => {
            emits('close')
        }, 3000)
    }
})
</script>

<template>
    <Transition name="notification">
        <div v-if="show" class="notification-container">
            <div class="header">
                <Icon :icon="iconType" :style="{ 'color': colorType }" />
                <div class="title">{{ title }}</div>
                <Icon icon="material-symbols:close" class="close" @click="emits('close')"></Icon>
            </div>
            <div class="content">{{ message }}</div>
        </div>
    </Transition>
</template>

<style scoped>
.notification-container {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    width: 18rem;
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    z-index: 999;
    transition: translate 0.3s ease-in-out;
}

.notification-enter-from {
    translate: -100% 0;
}

.notification-enter-to {
    translate: 0 1;
}

.notification-leave-from {
    translate: 0 1;
}

.notification-leave-to {
    translate: -100% 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
}

.title {
    flex: 1;
    font-weight: bold;
}

.close {
    cursor: pointer;
    font-weight: bold;
    opacity: 0.4;
}

.close:hover {
    opacity: 1;
}

.content {
    margin-top: 0.5rem;
    font-size: 0.85rem;
}
</style>