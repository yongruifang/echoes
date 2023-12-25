<script setup lang="ts">
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
</script>
<template>
    <!-- {{ props }} -->
    <div class="card" :class="props.color">
        <div class="card-header">
            <div class="card-header-title">
                <span class="tag is-info">{{ props.time }}</span>
                <span class="tag is-info">{{ props.tag }}</span>
            </div>
        </div>
        <div class="card-content">
            <div class="content">
                {{ props.content }}
            </div>
        </div>
        <div class="card-footer">
            <div class="card-footer-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-heart"></i>
                    </span>
                    <span>{{ props.likes }}</span>
                </span>
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-comment"></i>
                    </span>
                    <span>{{ props.comments }}</span>
                </span>
            </div>
            <div class="card-footer-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-comment"></i>
                    </span>
                    <span>{{ props.from }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    width: 200px;
    height: 200px;
    background-color: antiquewhite;
    padding: 0 0.5rem;
    margin: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.card-header-title {
    display: flex;
    justify-content: space-between;
}

.card-content {
    width: 100%;
    height: 70%;
    font-family: 'fa';
}

.card-footer {
    display: flex;
    justify-content: space-between;
}
</style>