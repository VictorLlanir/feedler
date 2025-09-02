<template>
    <main :class="['main-content', { 'main-content-collapsed': isCollapsed && !isMobile }]">
        <AppHeader :title="(route.meta.title as string)" />
        <router-view />
    </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import { useSidebar } from '@/composables/useSidebar';

const route = useRoute();
const { isCollapsed, isMobile } = useSidebar();
</script>

<style scoped>
.main-content {
    padding: 20px;
    color: #fff;
    flex: 1;
    transition: margin-left var(--transition-normal);
    min-height: 100vh;
}

@media screen and (max-width: 768px) {
    .main-content {
        margin-left: 0;
        width: 100vw;
        padding: 15px;
    }

    .main-content.main-content-collapsed {
        margin-left: 0;
    }
}
</style>