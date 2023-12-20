<template>
    <button>
        <RouterLink :to="link" class="tag">
            {{ tagName }}
        </RouterLink>
    </button>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps(['tagName', 'link'])
</script>
<style scoped>
button {
    overflow: hidden;
    min-width: 50px;
    border-radius: 24px;
    font-size: 14px;
    color: gray;
    margin: 0 5px;
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
}

button:hover {
    border: 1px solid black;
}

button.isSelected {
    border: 1px solid black;

    .tag {
        color: black;
        font-weight: bold;
    }
}

.tag {
    color: gray;
}

.tag:hover {
    background-color: transparent;
}
</style>