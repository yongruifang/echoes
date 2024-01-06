<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { cardBgColor } from '@/utils/data'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const redLike = computed(() => {
    return userStore.likeset.includes(props._id || '')
})
const emits = defineEmits(['edit', 'detail', 'like'])
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
const showMenu = ref(false)
const toggleMenu = () => {
    showMenu.value = !showMenu.value
}
const clickDots = (e: Event) => {
    console.log('click dots')
    // 确保只有一个菜单是打开的
    const menus = document.querySelectorAll('.more-menu.active')
    if (menus.length > 0) {
        menus.forEach(menu => {
            menu.classList.remove('active')
        })
    }
    toggleMenu()
    e.stopPropagation()
}
const toggleEdit = (e: Event) => {
    console.log('toggle edit', e)
    toggleMenu()
    emits('edit')
    e.stopPropagation()
}
const toggleDetail = (e: Event) => {
    console.log('toggle detail')
    toggleMenu()
    emits('detail')
    e.stopPropagation()
}
const toggleLike = (e: Event) => {
    emits('like')
    // 发现需要保存状态——当前用户是否已经点赞（并且根据状态显示红心和空心）
    // 如果当前用户已经点赞，则取消点赞
    // 否则，点赞
    e.stopPropagation()
}
</script>
<template>
    <!-- {{ props }} -->
    <div class="card" :style="styleObject" @click="emits('detail')">
        <div class="card-header">
            <div class="card-header-title">
                <span id="time" style="flex:1">{{ props.time }}</span>
                <span id="tag">{{ props.tag }}</span>
                <Icon icon="tabler:dots-vertical" class="dots" @click="clickDots" style="display:none"></Icon>
                <div class="more-menu" :class="showMenu ? 'active' : ''">
                    <div class="more-menu-caret">
                        <div class="more-menu-caret-outer"></div>
                        <div class="more-menu-caret-inner"></div>
                    </div>
                    <ul class="more-menu-items" tabindex="-1" role="menu" aria-labelledby="more-btn" aria-hidden="true">
                        <li class="more-menu-item" role="presentation">
                            <button type="button" class="more-menu-btn" role="menuitem" @click="toggleEdit">编辑留言</button>
                        </li>
                        <li class="more-menu-item" role="presentation">
                            <button type="button" class="more-menu-btn" role="menuitem" @click="toggleDetail">留言详情</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                {{ props.content }}
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item" id="status">
                <span class="icon-text" @click="toggleLike">
                    <span class="icon" :data-cy="redLike">
                        <Icon :icon="redLike ? 'carbon:favorite-filled' : 'carbon:favorite'" style="color: red"></Icon>
                    </span>
                    <span style="color: #888888">{{ props.likes }}</span>
                </span>
                <span class="icon-text">
                    <span class="icon">
                        <Icon icon="carbon:chat" style="color: #4ca2b2"></Icon>
                    </span>
                    <span style="color: #888888">{{ props.comments }}</span>
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
    <Icon icon="carbon:favorite-filled" style="color: red; display: none;"></Icon>
    <Icon icon="carbon:favorite" style="color: red; display: none;"></Icon>
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

.card-header-title {
    position: relative;
    height: 15px;
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

    .dots {
        background-color: #fff;
        border-radius: 50%;
        padding: 0.2rem;
        width: 0.6rem;
        height: 0.6rem;
        opacity: 0.5;
        transition: transform 0.3s ease-in-out opacity 0.3s ease-in-out;
    }

    .dots:hover {
        transform: scale(1.2);
        opacity: 1;
    }
}

.more-menu {
    position: absolute;
    top: 100%;
    right: -20%;
    z-index: 700;
    padding: 2px 0 0;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    opacity: 0;
    pointer-events: none;
    transform: translate(0, 1px) scale(0.95);
    transition: transform 0.1s cubic-bezier(0.3, 1, 0.5, 1), opacity 0.1s cubic-bezier(0.3, 1, 0.5, 1);
}

.more-menu.active {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, 0) scale(1);
}

.more-menu-caret {
    position: absolute;
    top: -10px;
    left: 20%;
    width: 18px;
    height: 10px;
}

.more-menu-caret-outer,
.more-menu-caret-inner {
    position: absolute;
    display: inline-block;
    margin-left: -1px;
    font-size: 0;
    line-height: 1;
}


.more-menu-caret-outer {
    border-bottom: 10px solid #c1d0da;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: auto;
    left: 0;
    top: 0;
    width: auto;
}

.more-menu-caret-inner {
    top: 1px;
    left: 1px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
}

.more-menu-items {
    margin: 0;
    list-style: none;
    padding: 0;
}

.more-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.15);
}

.more-menu {
    width: 80px;
}

.more-btn,
.more-menu-btn {
    background: none;
    border: 0 none;
    line-height: normal;
    overflow: visible;
    width: 100%;
    text-align: center;
    outline: none;
    cursor: pointer;
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

span.icon:hover {
    svg {
        box-sizing: border-box;
        transform: scale(1.2);
    }
}
</style>