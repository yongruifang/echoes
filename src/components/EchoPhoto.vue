<script setup lang="ts">
const props = defineProps({
    url: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div class="echo-photo">
        <img :src="props.url" alt="图片" />
    </div>
</template>