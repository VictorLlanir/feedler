<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

const route = useRoute();
</script>

<template>
    <main class="main-content">
        <AppHeader :title="route.meta.title as string" />
        <router-view />
    </main>
</template>

<style scoped>
.main-content {
    padding: 20px;
    color: #fff;
    width: 100vw;
}
</style>