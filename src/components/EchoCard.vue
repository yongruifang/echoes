<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { cardBgColor } from '@/utils/data'
import { computed } from 'vue'
interface EchoCard {
    _id?: string;
    color: string;
    time: string;
    tag: string;
    content: string;
    from: string;
    likes?: number;
    comments?: number;
}
const props = withDefaults(defineProps<EchoCard>(), {
    color: 'blue',
    time: '2023-12-25',
    tag: '留言',
    content: 'Merry Christmas!',
    from: '匿名',
    likes: 0,
    comments: 0,
})
// const cardColor = cardBgColor[props.color].rgba;
// const styleObject = {
//     backgroundColor: cardColor,
// } // 缺陷：当父组件传入的props.color变化时，子组件的styleObject不会变化
const styleObject = computed(() => {
    const cardColor = cardBgColor[props.color].rgba;
    return {
        backgroundColor: cardColor,
    }
})
</script>
<template>
    <!-- {{ props }} -->
    <div class="card" :style="styleObject">
        <div class="card-header">
            <div class="card-header-title">
                <span id="time">{{ props.time }}</span>
                <span id="tag">{{ props.tag }}</span>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                {{ props.content }}
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item" id="status">
                <span class="icon-text">
                    <span class="icon">
                        <Icon icon="carbon:favorite"></Icon>
                    </span>
                    <span>{{ props.likes }}</span>
                </span>
                <span class="icon-text">
                    <span class="icon">
                        <Icon icon="carbon:chat"></Icon>
                    </span>
                    <span>{{ props.comments }}</span>
                </span>
            </div>
            <div class="card-footer-item" id="from">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-comment"></i>
                    </span>
                    <span>--{{ props.from }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    width: 200px;
    height: 200px;
    padding: 0 0.5rem;
    margin: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: scale 0.3s ease-in-out;
}

.card.active {
    border: 2px solid rgba(76, 162, 178, 0.575);
}

.card:hover {
    transform: scale(1.05);
}

.card-header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

    #time {
        font-size: 12px;
        color: #888888;
    }

    #tag {
        font-size: 12px;
        color: #888888;
        background-color: #f5f5f5;
        padding: 0 0.2rem;
        border-radius: 5px;
    }
}

.card-content {
    width: 90%;
    height: 150px;
    font-family: 'fa';
    padding: 0 0.5rem;
}

.card-footer {
    display: flex;
    justify-content: space-between;
}

.card-footer #status {
    display: flex;
    align-items: center;

    .icon-text {
        margin: 0 0.5rem;
        font-size: 14px;

        /* 解决字体图标与文字对齐 */
        .icon {
            position: relative;
            top: 0.05rem;
            margin-right: 0.2rem;
        }
    }
}

.card-footer #from {
    font-family: fa;
    color: #888888;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    flex-direction: row-reverse;
}
</style>