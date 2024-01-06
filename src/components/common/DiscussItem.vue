<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
    time: String,
    content: String,
    name: String,
})
const timeStr = computed(() => {
    return props.time?.slice(0, 10)
})
</script>
<template>
    <div class="panel">
        <div class="header">
            <img class="avatar" src="../../assets/footprint.png">
            <div class="name">{{ name }}</div>
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div class="footer">
            <div class="time">{{ timeStr }}</div>
        </div>
    </div>
</template>
<style scoped>
.panel {
    margin-top: 5px;
}

.header {
    display: flex;
    align-items: center;
    gap: 5px;
}

.avatar {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #ccc;
}

.footer {
    font-size: smaller;
    color: #888888;
    opacity: 0.8;
}
</style>