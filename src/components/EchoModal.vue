<script setup lang="ts">
// interface EchoModal {
//     title: string;
//     open: boolean;
// }
// const props = withDefaults(defineProps<EchoModal>(), {
//     title: '弹出框',
//     open: false
// })
const props = defineProps({
    title: {
        type: String,
        default: '弹出框'
    },
    open: {
        type: Boolean,
        default: false
    }
})
const openStyle = 'transform: translateX(0);'
const closeStyle = 'transform: translateX(100%);'
</script>
<template>
    <div class="modal" :style="props.open ? openStyle : closeStyle">
        <header class="modal-header">
            <h4>{{ props.title }}</h4>
            <button @click="$emit('update:open', false)">&times;</button>
        </header>
        <main class="modal-content">
            <slot name="modal-form" />
        </main>
    </div>
</template>
<style scoped>
.modal {
    position: fixed;
    top: 80px;
    right: 0;
    width: 250px;
    height: calc(100vh - 90px);
    max-width: 90%;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    z-index: 900;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0;
    padding: 0 10px;

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        width: 30px;
        height: 30px;
    }
}

.modal-content {
    overflow: hidden;
    height: calc(100% - 50px);
}
</style>