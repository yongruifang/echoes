<script setup lang="ts">
import { cardBgColor, CardLabel } from '@/utils/data'
import { ref, watch } from 'vue'
import { fetchUpdateMessageApi, fetchDeleteMessageApi } from '@/api/echo'
import { useEchoStore } from '@/stores/echo';
const echoStore = useEchoStore()
const emits = defineEmits(['update:success', 'remove:success', 'failed'])
interface Msg {
    _id: string;
    color: string;
    time: string;
    content: string;
    from: string;
    tag: string;
}
const props = defineProps<Msg>()
// 当前选中颜色
const currentColor = ref(props.color)
const labels = CardLabel.slice(1)
const currentTag = ref(props.tag)
const msgContent = ref(props.content)
const msgFrom = ref(props.from)
// 子组件监听props变化
watch(() => props._id, (newVal) => {
    console.log('子组件监听props变化', newVal)
    const { color, tag, content, from } = props
    console.log(color, tag, content, from)
    currentColor.value = color
    currentTag.value = tag
    msgContent.value = content
    msgFrom.value = from
})
const computeTime = () => {
    const ts = new Date();
    const year = ts.getFullYear()
    const month = ts.getMonth()
    const date = ts.getDate()
    return `${year}-${month + 1}-${date}`;
}
// const reset = () => {
//     currentColor.value = cardBgColorNames[0];
//     currentTag.value = labels[0].name;
//     msgContent.value = ''
//     msgFrom.value = ''
// }
const update = async () => {
    // content, from, tag不能为空
    if (!msgContent.value || !msgFrom.value) {
        alert('留言或签名不能为空')
        return
    }
    // 组装留言
    const message: Msg = {
        _id: props._id,
        color: currentColor.value,
        time: computeTime(),
        content: msgContent.value,
        from: msgFrom.value || '匿名',
        tag: currentTag.value
    }
    const res = await fetchUpdateMessageApi(message)
    console.log(res)
    if (res.status === 'success') {
        console.log('更新成功')
        // 更新store
        echoStore.updateEcho(message)
        emits('update:success')
    } else {
        emits('failed', res)
    }
}
const remove = async () => {
    const confirm = window.confirm('确定删除吗?')
    if (confirm) {
        const res = await fetchDeleteMessageApi(props._id)
        console.log(res)
        if (res.status === 'success') {
            console.log('删除成功')
            // 更新store
            echoStore.deleteEcho(props._id)
            emits('remove:success')
        } else {
            emits('failed', res)
        }
    }
}

</script>
<template>
    <div class="edit-card">
        <div class="color-list">
            <div class="color-box" v-for="(color, name, index) in cardBgColor" :key="index"
                :style="{ 'background-color': color.rgb }"
                :class="cardBgColor[currentColor].rgb === color.rgb ? 'is-active' : ''"
                @click="currentColor = name as string">

            </div>
        </div>
        <div class="card-content" :style="{ 'background-color': cardBgColor[currentColor].rgba }">
            <textarea placeholder="留言..." v-model="msgContent" />
            <input type="text" placeholder="签名" v-model="msgFrom" @keyup.enter="update" />
        </div>
        <div class="card-tag">
            <p>选择标签: {{ currentTag }}</p>
            <div class="tag-box">
                <span class="tag-name" v-for="(label, index) in labels" :key="index"
                    :class="[label.name === currentTag ? 'is-active' : '']" @click="currentTag = label.name">
                    {{ label.name }}
                </span>
            </div>
            <div style="display:none">时间: {{ computeTime() }}</div>
        </div>
        <div class="card-footer">
            <button @click="remove">删除</button>
            <button @click="update">更新</button>
        </div>
    </div>
</template>

<style scoped>
.edit-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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