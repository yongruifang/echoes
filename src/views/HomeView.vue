<script setup lang="ts">
import EchoCard from '@/components/EchoCard.vue';
import EchoModal from '@/components/EchoModal.vue';
import AddCardForm from '@/components/form/AddCardForm.vue';
import EditCardForm from '@/components/form/EditCardForm.vue';
import DiscussCardForm from '@/components/form/DiscussCardForm.vue';
import { ref, onMounted } from 'vue';
import { fetchMessageListApi } from '@/api/echo'
import { useEchoStore } from '@/stores/echo'
import { useUserStore } from '@/stores/user';
import EchoLoading from '@/components/common/EchoLoading.vue';
import EchoAlert from '@/components/common/EchoAlert.vue';
import { useAlertStore } from '@/stores/alert';
import { fetchLikeMessageApi } from '@/api/echo';
const alertStore = useAlertStore()
defineEmits(['failed'])
type AlertType = "success" | "error" | "warning" | "info";
type AlertArgs = {
  type: AlertType;
  message: string;
  show: boolean;
  autoClose: boolean;
}
const openAlert = (args: AlertArgs) => {
  alertStore.setAlert(args)
}
const handleMsg = (res: any) => {
  const type = res.status;
  const msg = res.message;
  openAlert({ type: type, message: msg, show: true, autoClose: true })
}
const openModal = ref(false);
const showOverlay = ref(false);
const newModal = () => {
  openModal.value = true;
  showOverlay.value = true;
  title.value = NEW_MODE;
}
const NEW_MODE = '新增留言';
const EDIT_MODE = '编辑留言';
const DISCUSS_MODE = '讨论区';
const title = ref(NEW_MODE);
// 选中的留言信息
interface Msg {
  _id?: string;
  color: string;
  time: string;
  content: string;
  from: string;
  tag: string;
  likes: number;
  comments: number;
}
const selectedEcho = ref<Msg>({
  _id: '',
  color: '',
  time: '',
  content: '',
  from: '',
  tag: '',
  likes: 0,
  comments: 0
});
// 当选中留言，就注入到selectedEcho中
const triggerEdit = (echo: any) => {
  // console.log(echo) // 发现是proxy
  const obj = JSON.parse(JSON.stringify(echo))
  // console.log(obj)
  selectedEcho.value = obj
  title.value = EDIT_MODE;
  openModal.value = true;
  showOverlay.value = true;
  echoStore.setActiveId(echo._id)
}
const triggerDetail = (echo: any) => {
  // console.log(echo)
  const obj = JSON.parse(JSON.stringify(echo))
  selectedEcho.value = obj
  title.value = DISCUSS_MODE;
  openModal.value = true;
  showOverlay.value = true;
  echoStore.setActiveId(echo._id)
}
const closeModal = () => {
  openModal.value = false;
  showOverlay.value = false;
  echoStore.setActiveId('')
}
const hidePanel = () => {
  if (openModal.value) {
    closeModal()
  }
}

const echoStore = useEchoStore()
const uploadSuccess = () => {
  if (isEnd.value) isEnd.value = false;
  alertStore.setAlert({ type: 'success', message: '上传成功', show: true, autoClose: true })
}
const updateSuccess = () => {
  alertStore.setAlert({ type: 'success', message: '更新成功', show: true, autoClose: true })
  closeModal()
}
const removeSuccess = () => {
  alertStore.setAlert({ type: 'success', message: '删除成功', show: true, autoClose: true })
  closeModal()
}
const userStore = useUserStore()
const toggleLike = async (echo: Msg) => {
  console.log('toggle like', echo)
  // 当前用户是否已经点赞
  console.log(userStore.likeset)
  const isLiked = userStore.likeset.includes(echo._id!)
  if (isLiked) {
    // 如果当前用户已经点赞，则取消点赞
    const res = await fetchLikeMessageApi(echo._id!)
    userStore.removeLike(echo._id!)
    echo.likes--;
    console.log('取消点赞', res)
  } else {
    // 否则，点赞
    const res = await fetchLikeMessageApi(echo._id!)
    userStore.addLike(echo._id!)
    echo.likes++;
    console.log('点赞', res)
  }
}
const handleComment = () => {
  console.log(selectedEcho.value)
  // 更新echoStore中对应的comment
  echoStore.incrComment(selectedEcho.value._id)
}
/**
 * 触发条件：
 * 1. 在fetch过程中不能重复触发（引入isLoading变量）
 * 2. 没有更多数据的时候不能再触发（引入isEnd变量）
 * 3. 屏幕距离容器边缘xxx的时候触发
 */
const isLoading = ref(false)
const isEnd = ref(false)
const triggerDistance = 200;
onMounted(() => {
  if (echoStore.echoes.length === 0) {
    fetchMessageListApi({ limit: 20, offset: 0 }).then((res) => {
      echoStore.setEchoes(res.data)
    }).catch((err) => {
      openAlert({ type: "error", message: err.message, show: true, autoClose: false })
    })
  }
  // debounce
  // function debounce(func, wait){
  //   let timeout, result
  //   return function(){
  //     let args = [...arguments]
  //     clearTimeout(timeout)
  //     timeout = setTimeout(() => {
  //       result=func.apply(this.args)
  //     }, wait);
  //     return result
  //   }
  // }
  // 显然防抖并不适合
})
// throttle
function throttle(func: any, wait: number) {
  let timeout: number | null, result: any
  return function (this: any) {
    if (!timeout) {
      // const args: any[] = [...arguments]
      // console.debug(args, wait)
      timeout = setTimeout(() => {
        //'this' implicitly has type 'any' because it does not have a type annotation
        // this:any
        result = func.apply(this.args)
        timeout = null
      }, wait);
    }
    return result
  }
}
const infiniteScroll = async () => {
  const container = document.getElementsByClassName('card-plane')[0]
  if (!container) return
  const distance = container.getBoundingClientRect().bottom - window.innerHeight;
  if (!isLoading.value && !isEnd.value && distance < triggerDistance) {
    isLoading.value = true;
    console.log('fetching...')
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('')
      }, 3000);
    })
    const res = await fetchMessageListApi({ limit: 20, offset: echoStore.echoes.length })
    if (res.data.length === 0) isEnd.value = true;
    echoStore.appendEchoes(res.data)
    isLoading.value = false;
    if (res.status === 'error') {
      openAlert({ type: "error", message: res.message, show: true, autoClose: false })
    }
  }
}
window.addEventListener('scroll', throttle(infiniteScroll, 50))
</script>

<template>
  <!-- <EchoCard /> -->
  <main class="card-plane">
    <EchoCard :class="echoStore.activeId === echo._id ? 'active' : ''" v-for="(echo, index) in echoStore.echoes"
      :key="index" :_id="echo._id" :color="echo.color" :time="echo.time" :tag="echo.tag" :content="echo.content"
      :likes="echo.likes" :comments="echo.comments" :from="echo.from" @edit="triggerEdit(echo)"
      @detail="triggerDetail(echo)" @like="toggleLike(echo)" />
    <!-- <button @click="infiniteScroll">无限滚动</button> -->
  </main>
  <!-- 右下角需要有一个添加按钮, 点击后弹出表单 -->
  <div class="fixed bottom-4 right-4">
    <button class="p-4 rounded-full bg-blue-500 text-white"
      style="border: 1px solid rgba(0,0,0,0.15);box-shadow: 0 0 10px rgba(0,0,0,0.2);" @click="newModal">+</button>
  </div>
  <!-- 弹出表单 -->
  <EchoModal :title="title" :open="openModal" @update:open="closeModal">
    <template v-slot:modal-form>
      <div>
        <AddCardForm v-if="title === NEW_MODE" @upload:success="uploadSuccess" @upload:error="handleMsg" />
        <EditCardForm v-else-if="title === EDIT_MODE" :_id="selectedEcho._id || ''" :color="selectedEcho.color"
          :time="selectedEcho.time" :tag="selectedEcho.tag" :content="selectedEcho.content" :from="selectedEcho.from"
          @update:success="updateSuccess" @remove:success="removeSuccess" @failed="handleMsg" />
        <DiscussCardForm v-else-if="title === DISCUSS_MODE" :_id="selectedEcho._id" :color="selectedEcho.color"
          :time="selectedEcho.time" :tag="selectedEcho.tag" :content="selectedEcho.content" :from="selectedEcho.from"
          :likes="selectedEcho.likes" @comment="handleComment">
        </DiscussCardForm>
      </div>
    </template>
  </EchoModal>
  <!-- <button @click="toggleAlert">toggleAlert</button> -->
  <Teleport to="#notification">
    <EchoAlert :show="alertStore.show" :type="alertStore.type" :message="alertStore.message"
      :auto-close="alertStore.autoClose" @close="alertStore.toggleClose">
    </EchoAlert>
  </Teleport>
  <Teleport to="#overlay">
    <div class="overlay" :class="showOverlay ? 'active' : ''" @click="hidePanel"></div>
  </Teleport>
  <div v-show="isLoading" class="loading-spinner">
    <EchoLoading />
    <p>加载中...</p>
  </div>
  <div v-show="isEnd" style="text-align:center; font-size: 0.8rem; color: gray; margin: 10px 0">No more Data</div>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 850;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.overlay.active {
  display: block;
}

.fixed {
  position: fixed;
}

.bottom-4 {
  bottom: 1rem;
}

.right-4 {
  right: 1rem;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.text-white {
  color: #fff;
}

.p-4 {
  /* padding: 0rem; */
  height: 40px;
  width: 40px;
  cursor: pointer;
}

.rounded-full {
  border-radius: 50%;
}

main.card-plane {
  margin-top: 90px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  justify-content: center;
}

.loading-spinner {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
</style>
```

