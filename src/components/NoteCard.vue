<template>
    <div class="card">
        <header>
            <div class="time">
                {{ props.time }}
            </div>
            <div class="tag">
                {{ props.tag }}
            </div>
        </header>
        <main>
            {{ props.msg.length > limitLength ? props.msg.slice(0, limitLength) + '...' : props.msg }}
        </main>
        <footer>
            <div id="status">
                <div class="like">
                    <Icon :icon="currentLiked ? 'carbon:favorite-filled' : 'carbon:favorite'" @click="clickLike()"></Icon>
                    {{ currentLikes }}
                </div>
                <div class="comment">
                    <Icon :icon="currentCommented ? 'ant-design:message-filled' : 'ant-design:message-outlined'"
                        @click="clickComment()" />
                    {{ currentComments }}
                </div>
            </div>
            <div id="from">
                -- {{ props.from }}
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
interface Card {
    time: string,
    tag: string,
    msg: string,
    from: string,
    likes: number,
    comments: number,
    liked: boolean,
    commented: boolean,
    color?: string,
}
const props = defineProps<Card>()
const currentLikes = ref(props.likes)
const currentComments = ref(props.comments)
const currentLiked = ref(props.liked)
const currentCommented = ref(props.commented)
const limitLength = 90
const clickLike = () => {
    currentLiked.value = !currentLiked.value
    if (currentLiked.value) {
        currentLikes.value += 1
    } else {
        currentLikes.value -= 1
    }
}
const clickComment = () => {
    currentCommented.value = !currentCommented.value
    if (currentCommented.value) {
        currentComments.value += 1
    } else {
        currentComments.value -= 1
    }
}
</script>

<style scoped>
@font-face {
    font-family: fa;
    src: url("@/assets/font/RuiZiBiGe.ttf")
}

.card {
    width: 240px;
    height: 210px;
    background-color: #f9cec980;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 15px 10px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    header {
        color: rgb(142, 141, 141);
        font-family: fa;
        font-weight: bold;
        font-size: 12px;
        height: 20px;
        display: flex;
        justify-content: space-between;
        padding-right: 8px;
    }

    main {
        font-family: fa;
        font-size: 14px;
        font-weight: 600;
        padding: 14px 0;
        overflow: hidden;
    }

    footer {
        height: 20px;
        margin: 5px 0;
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        svg:hover {
            color: rgba(255, 0, 0, 0.504);
        }
    }

    footer #status {
        display: flex;

        .like,
        .comment {
            margin: 0 5px;
        }
    }

    footer #from {
        font-family: fa;
        color: #888888;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        flex-direction: row-reverse;
    }

    transition: all 0.2s;
    cursor: pointer;

}

.card:hover {
    /* 向上偏移 */
    transform: translateY(-5px);
}

/* 动态，鼠标移入尺寸放大，鼠标移除尺寸还原 */
</style>