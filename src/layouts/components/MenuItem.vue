<template>
    <li class="menu-item">
        <a :href="link" :class="{ 'is-active': isActive }">
            <img :src="`/src/assets/icons/${icon}`" :alt="text" />
            <span>{{ text }}</span>
        </a>
    </li>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string;
    icon: string;
    link: string;
    isActive: boolean;
}>();
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
}

.menu-item a.is-active {
    background: rgba(255, 255, 255, 0.02);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}
</style>