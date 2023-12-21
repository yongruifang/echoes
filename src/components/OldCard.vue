<template>
    <NoteCard :tag="props.tag!" :time="props.time!" :msg="props.msg!" :from="props.from!" :likes="props.likes!"
        :comments="props.comments!" :liked="props.liked!" :commented="props.commented!" />
</template>
<script setup lang="ts">
import NoteCard from './NoteCard.vue';
interface Card {
    time?: string,
    tag?: string,
    msg?: string,
    from?: string,
    likes?: number,
    comments?: number,
    liked?: boolean,
    commented?: boolean,
    color?: string,
}
const props = defineProps<Card>()

</script>