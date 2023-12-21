<template>
    <div class="new-card">
        <div class="color-list">
            <div class="color-box" v-for="(color, index) in cardBgColor" :key="index"
                :style="{ 'background-color': color.rgb }" :class="currentColor.rgb === color.rgb ? 'is-active' : ''"
                @click="currentColor = color">
            </div>
        </div>
        <div class="card-content" :style="{ 'background-color': currentColor.rgba }">
            <textarea placeholder="留言..." v-model="msgContent" />
            <input type="text" placeholder="签名" v-model="msgFrom" />
        </div>
        <div class="card-tag">
            <p>选择标签: {{ currentTag.name }}</p>
            <div class="tag-box">
                <span class="tag-name" v-for="(label, index) in labels" :key="index"
                    :class="[label.name === currentTag.name ? 'is-active' : '']" @click="currentTag = label">
                    {{ label.name }}
                </span>
            </div>
            <div>时间: {{ time() }}</div>
        </div>
        <div class="card-footer">
            <button @click="reset">重置</button>
            <button @click="upload">上传</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { cardBgColor, CardLabel } from '../utils/data'
import { ref } from 'vue'
interface Msg {
    color: string;
    time: string;
    content: string;
    from: string;
    tag: string;
}
// 当前选中颜色
const currentColor = ref(cardBgColor.pink);
const labels = CardLabel.slice(1)
const currentTag = ref(labels[0])
const msgContent = ref('')
const msgFrom = ref('')
const time = () => {
    const ts = new Date();
    const year = ts.getFullYear()
    const month = ts.getMonth()
    const day = ts.getDay()
    return `${year}.${month}.${day}`;
}
const reset = () => {
    currentColor.value = cardBgColor.pink;
    currentTag.value = labels[0]
    msgContent.value = ''
    msgFrom.value = ''
}
const upload = () => {
    // content, from, tag不能为空
    if (!msgContent.value || !msgFrom.value) {
        alert('留言或签名不能为空')
        return
    }
    // 组装留言
    const message: Msg = {
        color: currentColor.value.rgba,
        time: time(),
        content: msgContent.value,
        from: msgFrom.value,
        tag: currentTag.value.name
    }
    console.log(message)
    // if(上传成功){
    //     reset()
    // }
}

</script>
<style scoped>
@font-face {
    font-family: fa;
    src: '@/assets/RuZiBiGe.ttf'
}

.new-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: scroll;
}

.color-list {
    height: 40px;
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.color-box {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.2s;
}

.color-box:hover {
    transform: translateY(-2px);
}

.color-box.is-active {
    border: 1px solid black;
}

.card-content {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.card-content textarea {
    font-family: fa;
    line-height: 1.5em;
    width: 90%;
    height: 180px;
    padding: 10px;
    margin: 10px 0;
    resize: none;
    background: none;
    border: none;
    border-radius: 5%;
    outline: none;
}

.card-content input {
    font-family: fa;
    width: 90%;
    height: 30px;
    padding: 10px;
    border: none;
    background: none;
    border: 1px solid #fff;
    margin-bottom: 10px;
    border-radius: 8px;
    outline: none;
}

.card-tag {
    margin: 5px 10px;
    font-family: fa;
    font-weight: bold;
}

.tag-box {
    font-size: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 30px);
    grid-gap: 10px;
    justify-content: center;
}

.tag-name {
    border: 1px solid black;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.tag-name.is-active {
    background-color: antiquewhite;
}

.tag-name:hover {
    transform: scale(1.2);
    background-color: antiquewhite;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    margin: 10px;

    button {
        background: none;
        border-radius: 5px;
        margin: 0 5px;
        cursor: pointer;
    }

    button:hover {
        transform: scale(1.1);
        background-color: antiquewhite;
    }
}
</style>