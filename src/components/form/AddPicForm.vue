<script setup lang="ts">
import { ref } from 'vue'
import { fetchAddPicApi } from '@/api/picture'
const preview = ref('')
const fileName = ref('')
const formData = ref()
const handleChange = (event: any) => {
    const file = event.files[0]
    fileName.value = file.name
    const form = new FormData()
    // append(): used to add a key/value pair to the FormData object
    form.append("pic", file)
    console.log("fileSize", file.size)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        preview.value = e.target?.result as string
    }
    formData.value = form
}
const upload = async () => {
    console.log('trigger upload')
    const res = await fetchAddPicApi(formData.value)
    const data = await res.json()
    console.log(data)
}
</script>

<template>
    <div class="add-pic-form">
        <div class="header">
            <h2>上传照片</h2>
        </div>
        <div class="content">
            <!-- <form action="#" method="post" enctype="multipart/form-data" :onsubmit="handleSubmit">
                <input type="hidden" name="MAX_FILE_SIZE" value="2000000" /> 
                <label>请选择您要上传的图片<br><input type="file" name="pic" accept="image/*" /></label><br>
                <button type="submit">提交</button>
            </form> -->
            <div class="upload-area" @dragover.prevent @dragenter.prevent @dragstart.prevent
                @drop.prevent="handleChange($event.dataTransfer)">
                <label for="file-input" class="btn file-select"
                    :style="preview ? {} : { 'transform': 'translate(-50px, 50px)' }">选择一张图片</label>
                <input id="file-input" type="file" accept="image/*" @change="handleChange($event.target)" required
                    style="display: none;">
                <p v-show="preview" style="text-align: center; margin-top: 50px;">Click or Drag N Drop Image</p>
                <p class="prompt" v-show="!preview">Click or Drag N Drop Image</p>
                <div class="preview-box">
                    <img :src="preview" style="max-width: 100px; max-height: 100px;">
                    <h3 v-if="preview">名称: {{ fileName.length > 10 ? fileName.slice(0, 10) + '...' : fileName }}</h3>
                </div>
            </div>
        </div>
        <button class="upload-btn" @click="upload">上传</button>
    </div>
</template>
<style scoped>
.btn {
    width: 50px;
    height: 25px;
    border: 2px solid #000;
    border-radius: 5px;
    cursor: pointer;
    padding: 2px 5px;
}

.prompt {
    position: absolute;
    width: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.add-pic-form {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    background-color: aliceblue;
    transform: translate(-50%, -50%);
    z-index: 751;
}

.header {
    margin-left: 10px;
    display: flex;
    justify-content: center;
}

.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upload-area {
    position: relative;
    width: 90%;
    height: 250px;
    max-width: 300px;
    border: 2px dashed #000;
    border-radius: 5px;
}

.file-select {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translate(-50%);
    width: auto;
    height: auto;
    border: 2px solid #000;
    border-radius: 5px;
    cursor: pointer;
}

.preview-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upload-btn {
    position: absolute;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
    width: 60px;
    height: 30px;
    border-radius: 5px;
    background: none;
    font-weight: bold;
    color: red;
    border: 2px solid red;
    cursor: pointer;
}
</style>