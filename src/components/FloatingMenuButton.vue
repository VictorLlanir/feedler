<template>
    <button v-if="isMobile && !isDrawerOpen" class="floating-menu-button" @click="openDrawer"
        :title="'Abrir menu lateral'" aria-label="Abrir menu lateral">
        <img :src="`/src/assets/icons/add.svg`" alt="Menu" />
    </button>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar';

const { isMobile, isDrawerOpen, openDrawer } = useSidebar();
</script>

<style scoped>
.floating-menu-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-secondary);
    border: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-floating-button);
    transition: all var(--transition-fast);
}

.floating-menu-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.floating-menu-button:active {
    transform: scale(0.95);
}

.floating-menu-button img {
    width: 24px;
    height: 24px;
    filter: invert(1);
}

/* Animação de entrada */
.floating-menu-button {
    animation: floatIn 0.3s ease-out;
}

@keyframes floatIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
