<script setup lang="ts">
import EchoCard from '@/components/EchoCard.vue';
import EchoModal from '@/components/EchoModal.vue';
import AddCardForm from '@/components/form/AddCardForm.vue';
import { ref } from 'vue';
const openAddModal = ref(false);
const showAddModal = () => {
  openAddModal.value = true;
};
</script>

<template>
  <EchoCard />
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
</style>
```

