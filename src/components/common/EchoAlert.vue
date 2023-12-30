<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue';
const props = defineProps({
    type: String,
    message: String,
    show: Boolean
})
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
</script>

<template>
    <Transition name="notification">
        <div v-if="show" class="notification-container">
            <div class="header">{{ type }}</div>
            <div class="content">{{ message }}</div>
            <Icon :icon="iconType" :style="{ 'color': colorType }" />
            <Icon icon="material-symbols:close"></Icon>
        </div>
    </Transition>
</template>