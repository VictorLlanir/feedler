<template>
    <div class="today-item">
        <h3>{{ feed.name }}</h3>
        <div class="today-item__posts">
            <div class="today-item__post" v-for="post in posts" :key="post.guid">
                <h4>{{ post.title }}</h4>
                <p>{{ post.contentSnippet }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { from, Subject, takeUntil } from 'rxjs';
import { onMounted, ref } from 'vue';
import type { Feed } from '../models/feed';
import type { Post } from '../models/post';

const props = defineProps<{
    feed: Feed;
}>();
const destroy$ = new Subject<void>();
const posts = ref<Post[]>([]);

onMounted(() => {
    from(axios.get(import.meta.env.VITE_API_URL + '/feeds/' + props.feed.id + '/posts'))
        .pipe(takeUntil(destroy$))
        .subscribe(response => {
            posts.value = response.data.items;
        });
});
</script>

<style scoped>
.today-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>