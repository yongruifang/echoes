<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed,onMounted } from 'vue';
const emits = defineEmits(['view'])
const props = defineProps({
    _id: {
        type: String,
        default: ''
    },
    name: {
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
const decodedUrl = computed(() => {
    const decoded = decodeURIComponent(props.name)
    const dotLastIndex = decoded.lastIndexOf('-')
    return decoded.slice(0, dotLastIndex)
})
const smallUrl = computed(() => {
    const LastIndex = props.url.lastIndexOf('/')
    return props.url.slice(0, LastIndex)+'/small'+ props.url.slice(LastIndex)
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
onMounted(()=>{
    const blurDivs = document.querySelectorAll('.blur-load')
    blurDivs.forEach(div => {
        const img = div.querySelector('img')
        
        function loaded() {
            // show img
            div.classList.add('loaded')
        }
        if(img.complete) {
            loaded()
        }else{
            img.addEventListener("load", loaded)
        }

    })
})
</script>
<template>
    <div class="echo-img">
        <div class="blur-load" :style="{'background-image': 'url('+smallUrl+')'}">
            <img :src="props.url" alt="图片" loading="lazy"/>
        </div>
        <div class="overlay" @click="toggleModal"></div>
        <div class="fav-icon" @click="toggleLike">
            <div class="svg-icon">
                <span>{{ props.likes }}</span>
                <Icon icon="carbon:favorite" />
            </div>
        </div>
        <div class="img-footer">
            <p style="text-align: center;">{{ props.time?.slice(0, 10) }}</p>
            <p style="text-align: center;">{{ decodedUrl }}</p>
        </div>
    </div>
</template>
<style scoped>
.echo-img {
    position: relative;
    background-color: rgba(250, 235, 215, 0.223);
    width: 400px;

    img {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        aspect-ratio: 1 / 1;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        display: block;
        object-fit: cover;
        object-position: center;
    }

    .blur-load{
        width: 100%;
        background-size: cover;
        background-position: center;
    }
    .blur-load::before{
        content: "";
        position: absolute;
        inset: 0;
        animation: pulse 2.5s infinite;
        animation-timing-function: ease-in-out;
    }
    .blur-load.loaded::before{
        /* content: none; */
        background-color: rgba(255,255,255);
    }
    @keyframes pulse {
        0% {
            background-color: rgba(255,255,255,0);
        }
        25% {
            background-color: rgba(255,255,255,0.2);
        }
        50% {
            background-color: rgba(255,255,255,0.6);
        }
        75% {
            background-color: rgba(255,255,255,0.2);
        }
        100% {
            background-color: rgba(255,255,255,0);
        }
    }

    .blur-load.loaded > img{
        opacity: 1;
    }
    .blur-load > img {
        opacity: 0;
        transition: opacity 200ms ease-in-out;
    }
}
@media(max-width: 768px) {
    .echo-img {
        width: 300px;
    }
}

@media(max-width: 576px) {
    .echo-img {
        width: 250px;
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