<template>
    <div class="today-page">
        <TodayItem v-for="feed in feeds" :feed="feed" />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { from, Subject, takeUntil } from 'rxjs';
import { onMounted, ref } from 'vue';
import type { Feed } from './models/feed';
import TodayItem from './components/TodayItem.vue';

const feeds = ref<Feed[]>([]);
const destroy$ = new Subject<void>();

onMounted(() => {
    from(axios.get<Feed[]>(import.meta.env.VITE_API_URL + '/feeds'))
        .pipe(takeUntil(destroy$))
        .subscribe(response => {
            feeds.value = response.data;
        });
});
</script>

<style scoped></style>