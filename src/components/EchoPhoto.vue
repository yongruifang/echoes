<script setup lang="ts">
import { Icon } from '@iconify/vue'
const emits = defineEmits(['view'])
const props = defineProps({
    _id: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    time: {
        type: String
    },
    likes: {
        type: Number
    }
})
const toggleLike = async (e: Event) => {
    console.log('toggleLike')
    //@TODO: 复用点赞模块
    e.stopPropagation();
}
const toggleModal = (e: Event) => {
    console.log('toggleModal')
    emits('view')
    //@TODO: 开发图片浏览插件
    //@TODO: 复用评论模块
    e.stopPropagation();
}
</script>
<template>
    <div class="echo-img">
        <img :src="props.url" alt="图片" />
        <div class="overlay" @click="toggleModal"></div>
        <div class="fav-icon" @click="toggleLike">
            <div class="svg-icon">
                <span>{{ props.likes }}</span>
                <Icon icon="carbon:favorite" />
            </div>
        </div>
        <div class="img-footer">
            <p style="text-align: center;">{{ props.time?.slice(0, 10) }}</p>
            <p style="text-align: center;">{{ props._id }}</p>
        </div>
    </div>
</template>
<style scoped>
.echo-img {
    position: relative;
    background-color: rgba(250, 235, 215, 0.223);

    img {
        position: relative;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 250x;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
}


.overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.264);
    opacity: 0;
    transition: opacity 0.3s;
    backdrop-filter: invert(10%);
    /* backdrop-filter: sepia(90%); */
    cursor: pointer;
}

.fav-icon {
    position: absolute;
    z-index: 2;
    top: 15px;
    right: 20px;
    color: red;
    opacity: 0;
    cursor: pointer;
}

.svg-icon {
    display: inline-flex;
    align-self: center;
    position: relative;

    span {
        font-size: 0.9em;
    }

    transition: transform 0.3s;
}

.svg-icon svg {
    position: relative;
    bottom: 0em;
}

.svg-icon:hover {
    transform: scale(1.2);
}

.echo-img:hover .fav-icon {
    opacity: 1;
}

.overlay:hover {
    opacity: 1;
}

.img-footer {
    font-size: small;
    color: gray;
}
</style>