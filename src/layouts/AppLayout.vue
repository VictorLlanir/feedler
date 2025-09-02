<template>
    <div class="app-layout">
        <SideNav />
        <MainContent />
        <!-- Botão flutuante para mobile -->
        <FloatingMenuButton />
    </div>
</template>

<script setup lang="ts">
import MainContent from './MainContent.vue';
import SideNav from './SideNav.vue';
import FloatingMenuButton from '../components/FloatingMenuButton.vue';
import { useSidebar } from '@/composables/useSidebar';

const { isCollapsed, isMobile } = useSidebar();
</script>

<style scoped>
.app-layout {
    display: flex;
    min-height: 100vh;
    width: 100%;
}

@media screen and (max-width: 768px) {
    .app-layout {
        position: relative;
    }
}
</style>