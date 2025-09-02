<template>
    <li class="menu-item">
        <RouterLink :to="link" :class="{ 'is-active': isActive }">
            <img :src="`/src/assets/icons/${icon}`" :alt="text" />
            <span v-show="showText">{{ text }}</span>
        </RouterLink>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    text: string;
    icon: string;
    link: string;
    isActive: boolean;
    showText?: boolean;
}>();

const showText = computed(() => props.showText !== false);
</script>

<style scoped>
.menu-item a {
    padding: 10px 8px;
    border-radius: 8px;
    display: flex;
    gap: 10px;
    align-items: center;
    transition: all .14s ease;
    text-decoration: none;
    margin-bottom: 10px;
    color: #aaa;
    min-height: 40px;
    justify-content: flex-start;
}

.menu-item a:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.menu-item a.is-active {
    background: rgba(255, 255, 255, 0.02);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.menu-item a.is-active:hover {
    background: rgba(255, 255, 255, 0.05);
}

.menu-item img {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
}

.menu-item span {
    transition: opacity 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
}
</style>