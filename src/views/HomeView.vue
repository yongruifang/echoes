<script setup lang="ts">
import EchoCard from '@/components/EchoCard.vue';
import EchoModal from '@/components/EchoModal.vue';
import AddCardForm from '@/components/form/AddCardForm.vue';
import { ref, onMounted } from 'vue';
import { fetchMessageListApi } from '@/api/echo'
import { useEchoStore } from '@/stores/echo'
const openAddModal = ref(false);
const showAddModal = () => {
  openAddModal.value = true;
};
const echoStore = useEchoStore()
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
      console.log(res.data)
      echoStore.setEchoes(res.data)
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
  // throttle
  function throttle(func: any, wait: number) {
    let timeout: number | null, result: any
    return function (this: any) {
      const args: any[] = [...arguments]
      if (!timeout) {
        console.debug(args, wait)
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
    console.log('trigger infiniteScroll')
    const container = document.getElementsByClassName('card-plane')[0]
    const distance = container.getBoundingClientRect().bottom - window.innerHeight;
    if (!isLoading.value && !isEnd.value && distance < triggerDistance) {
      isLoading.value = true;
      const res = await fetchMessageListApi({ limit: 5, offset: echoStore.echoes.length })
      console.log(res.data)
      if (res.data.length === 0) isEnd.value = true;
      echoStore.appendEchoes(res.data)
      isLoading.value = false;
    }
  }
  window.addEventListener('scroll', throttle(infiniteScroll, 1000))
})

</script>

<template>
  <!-- <EchoCard /> -->
  <main class="card-plane">
    <EchoCard v-for="(echo, index) in echoStore.echoes" :key="index" :_id="echo._id" :color="echo.color" :time="echo.time"
      :tag="echo.tag" :content="echo.content" :from="echo.from" />
    <!-- <button @click="infiniteScroll">无限滚动</button> -->
  </main>
  <!-- 右下角需要有一个添加按钮, 点击后弹出表单 -->
  <div class="fixed bottom-4 right-4">
    <button class="p-4 rounded-full bg-blue-500 text-white" @click="showAddModal">+</button>
  </div>
  <!-- 弹出表单 -->
  <EchoModal title="新增留言" :open="openAddModal" @update:open="openAddModal = false">
    <template v-slot:modal-form>
      <AddCardForm />
    </template>
  </EchoModal>
</template>
<style scoped>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 10px;
  justify-content: center;
}
</style>
```

