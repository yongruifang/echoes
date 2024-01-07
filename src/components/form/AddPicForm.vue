<script setup lang="ts">

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
            <div class="upload-area">
                <p>Click or Drag N Drop Image</p>
            </div>
        </div>
        <button class="upload-btn">上传</button>
    </div>
</template>
<style scoped>
.add-pic-form {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 300px;
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
    width: 90%;
    max-width: 300px;
    height: 150px;
    border: 2px dashed #000;
    border-radius: 5px;
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