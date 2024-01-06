<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { cardBgColor } from '@/utils/data'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user';
import { fetchAddCommentApi, fetchCommentListApi } from '@/api/comment';
import DiscussItem from '../common/DiscussItem.vue';
const userStore = useUserStore()
const redLike = computed(() => {
    return userStore.likeset.includes(props._id || '-1')
})
const comment = ref('')
interface Comment {
    _id: string;
    time: string;
    content: string;
    user: string;
}
const commentList = ref<Comment[]>([])
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
const props = defineProps<EchoCard>();
const styleObject = computed(() => {
    const cardColor = cardBgColor[props.color].rgba;
    return {
        backgroundColor: cardColor,
    }
})
const send = async () => {
    console.log(comment.value)
    // 准备参数: mid, uid, time, content
    const params = {
        mid: props._id || '',
        uid: userStore._id,
        time: new Date().toISOString(),
        content: comment.value,
    }
    const res = await fetchAddCommentApi(params)
    console.log(res)
    emits('comment')
    // 清空输入框
    comment.value = ''
    // 重新加载评论
    loadComment();
}
// 加载
const loadComment = async () => {
    const res = await fetchCommentListApi(props._id || '')
    console.log('加载评论', res)
    commentList.value = res.result
}
const emits = defineEmits(['comment'])
const handleSubmit = () => {
    return false;
}
watch(() => props._id, () => {
    loadComment()
})
</script>
<template>
    <div class="square">
        <div class="card" :style="styleObject">
            <div class="card-header">
                <span id="time" style="flex:1">{{ props.time }}</span>
                <span id="tag">{{ props.tag }}</span>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ props.content }}
                </div>
            </div>
            <div class="card-footer">
                <div class="card-footer-item" style="color: #888888; font-size: small">
                    <span class="icon-text">
                        <span class="icon">
                            <Icon :icon="redLike ? 'carbon:favorite-filled' : 'carbon:favorite'" style="color: red"></Icon>
                        </span>
                        <span class="card-likes">{{ props.likes || 0 }}</span>
                    </span>
                    <span class="icon-text">
                        <span class="icon">
                            <Icon icon="carbon:chat"></Icon>
                        </span>
                        <span class="card-comments">{{ props.comments || 0 }}</span>
                    </span>
                </div>
                <div class="card-footer-item">
                    <span class="card-from">—— {{ props.from }}</span>
                </div>
            </div>
        </div>
        <div class="discuss">
            <p class="discuss-header">热门评论</p>
            <div class="discuss-content">
                <div v-for="(item, index) in commentList" :key="index">
                    <DiscussItem :time="item.time" :content="item.content" :name="JSON.parse(item.user).name"></DiscussItem>
                </div>
            </div>
            <form class="discuss-footer" :onsubmit="handleSubmit">
                <input name="content" placeholder="发条评论趴" v-model="comment">
                <button @click="send" class="discuss-btn">发布</button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.card {
    width: 200px;
    margin: auto;
    padding: 8px;
    border-radius: 5px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 5px;
    color: #888888;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}

.card-from {
    color: #888888;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    flex-direction: row-reverse;
}

.icon-text {
    margin-right: 0.5rem;
}

.square {
    height: 100%;
}

.discuss {
    padding: 8px;
    display: grid;
    grid-template: 1fr 4fr 2fr/ 1fr;
}

.discuss-content {
    max-height: 250px;
    overflow-y: scroll;
}

.discuss-footer {
    display: flex;
    gap: 5px;
    align-items: center;
}

.discuss-btn {
    background: #4ca3b2d4;
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    font-size: smaller;
}

.discuss-btn:hover {
    background-color: #4ca2b2;
}
</style>