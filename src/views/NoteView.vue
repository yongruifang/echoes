<template>
    <header>
        <div class="title">留言墙</div>
        <p>很多事情值得记录，当然也值得回味</p>
    </header>
    <!-- tags 二级路由 -->
    <nav>
        <!-- <NoteTagBtn tag-name="全部" class="isSelected" />
        <NoteTagBtn tag-name="留言" />
        <NoteTagBtn tag-name="目标" />
        <NoteTagBtn tag-name="理想" />
        <NoteTagBtn tag-name="过去" />
        <NoteTagBtn tag-name="将来" />
        <NoteTagBtn tag-name="爱情" />
        <NoteTagBtn tag-name="亲情" />
        <NoteTagBtn tag-name="友情" />
        <NoteTagBtn tag-name="秘密" />
        <NoteTagBtn tag-name="信条" /> -->
        <NoteTagBtn v-for="tag in tags" :key="tag.param" :tag-name="tag.name" :link="/echoes/ + tag.param"
            :class="currentTag === tag.name ? 'isSelected' : ''" @click="changeTag(tag)">
        </NoteTagBtn>
    </nav>
    <main class="card-plane">
        <NoteCard v-for="(card, index) in cards" :key="index" :tag="card.tag" :time="card.time" :msg="card.msg"
            :from="card.from" :likes="card.likes" :comments="card.comments" :liked="card.liked"
            :commented="card.commented" />
    </main>
    <Icon class="add-msg" icon="carbon:add-filled" @click="addMsg"></Icon>
    <NoteModal :isModal="openModal" title="写留言" @close="openModal = false">
        <template v-slot:card-content>
            <NewCard />
        </template>
    </NoteModal>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NoteTagBtn from '../components/NoteTagBtn.vue'
import NoteCard from '../components/NoteCard.vue'
import NoteModal from '@/components/NoteModal.vue';
import NewCard from '@/components/NewCard.vue';
interface Tag {
    name: string,
    param: string,
}
const tags: Tag[] = [
    { name: "全部", param: 'all' },
    { name: "留言", param: 'text' },
    { name: "目标", param: 'target' },
    { name: "理想", param: 'dream' },
    { name: "过去", param: 'path' },
    { name: "将来", param: 'future' },
    { name: "爱情", param: 'love' },
    { name: "亲情", param: 'affection' },
    { name: "友情", param: 'friend' },
    { name: "秘密", param: 'secret' },
    { name: "信条", param: 'principle' },
]
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
const cards = ref<null | Card[]>([])
for (let i = 0; i < 20; i++) {
    cards.value?.push({
        time: "2023.12.20",
        tag: "留言",
        msg: "阳光透过窗帘的缝隙，轻轻拂过你的脸庞，我在你耳边轻声说：“早安，我的世界。”此刻，岁月静好，诗意盎然。",
        from: "玛卡巴卡",
        likes: 0,
        comments: 0,
        liked: false,
        commented: false,
    })
}

const currentTag = ref('')
// 当前路由
const route = useRoute()
const changeTag = (tag: Tag) => {
    currentTag.value = tag.name;
}
onMounted(() => {
    switch (route.fullPath) {
        case '/': currentTag.value = "全部"; break;
        case '/echoes/all': currentTag.value = "全部"; break;
        case '/echoes/text': currentTag.value = "留言"; break;
        case '/echoes/target': currentTag.value = "目标"; break;
        case '/echoes/dream': currentTag.value = "理想"; break;
        case '/echoes/path': currentTag.value = "过去"; break;
        case '/echoes/future': currentTag.value = "将来"; break;
        case '/echoes/love': currentTag.value = "爱情"; break;
        case '/echoes/affection': currentTag.value = "亲情"; break;
        case '/echoes/friend': currentTag.value = "友情"; break;
        case '/echoes/secret': currentTag.value = "秘密"; break;
        case '/echoes/principle': currentTag.value = "信条"; break;
        default: console.log('404'); break;
    }
})
const openModal = ref(false)
const addMsg = () => {
    console.log('addMsg')
    openModal.value = true
}
</script>
<style scoped>
header {
    padding: 60px 0 0 0;
    display: flex-column;
}

header .title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
}

header p {
    text-align: center;
    color: gray;
    font-weight: 100;
}

nav {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    justify-content: center;
}

nav::-webkit-scrollbar {
    display: none;
}

main.card-plane {
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 10px;
    justify-content: center;
}

main .add-msg {
    width: 40px;
    height: 40px;
    color: #000000b3;
    cursor: pointer;
    position: fixed;
    right: 15px;
    bottom: 50px;
    transition: 0.3s;
}

main .add-msg:hover {
    color: #000000;
    transform: scale(1.1);
}
</style>