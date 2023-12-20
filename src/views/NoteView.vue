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
    <main>
        <NoteCard tag="留言" time="2023.12.20" :msg="msg" from="玛卡巴卡" :likes="0" :comments="0" />
    </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NoteTagBtn from '../components/NoteTagBtn.vue'
import NoteCard from '../components/NoteCard.vue'
interface Tag {
    name: string,
    param: string,
}
const msg = "阳光透过窗帘的缝隙，轻轻拂过你的脸庞，我在你耳边轻声说：“早安，我的世界。”此刻，岁月静好，诗意盎然"
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
</script>
<style scoped>
header {
    padding: 24px 0;
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
</style>