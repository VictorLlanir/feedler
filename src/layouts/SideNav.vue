<template>
    <!-- Overlay para mobile -->
    <div v-if="isMobile && isDrawerOpen" :class="overlayClasses" @click="closeDrawer"></div>

    <aside :class="['side-nav', sidebarClasses]">
        <div class="side-nav__header">
            <img v-if="!isCollapsed || isMobile" src="/src/assets/images/feedler_logo.png" alt="Logo"
                class="side-nav__logo" />
            <button class="side-nav__toggle" @click="toggleSidebar"
                :title="isCollapsed ? 'Expandir menu' : 'Fechar menu'">
                <img :src="`/src/assets/icons/${isCollapsed ? 'menu-open.svg' : 'menu-close.svg'}`"
                    alt="Expandir menu" />
            </button>
        </div>

        <div class="side-nav__menu" v-show="!isCollapsed || isMobile">
            <ul>
                <MenuItem v-for="item in coreMenus" :key="item.text" :text="item.text" :icon="item.icon"
                    :link="item.link" :isActive="item.link === route.path" :showText="!isCollapsed || isMobile" />
            </ul>
            <hr />
            <ul>
                <MenuItem v-for="item in feedMenus" :key="item.text" :text="item.text" :icon="item.icon"
                    :link="item.link" :isActive="item.link === route.path" :showText="!isCollapsed || isMobile" />
            </ul>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MenuItem from './components/MenuItem.vue';
import { useSidebar } from '@/composables/useSidebar';

const coreMenus = [
    { text: 'Hoje', icon: 'sun.svg', link: '/today' },
    { text: 'Adicionar feeds', icon: 'add.svg', link: '/add-feeds' },
    { text: 'Buscar', icon: 'search.svg', link: '/search' },
    { text: 'Todos os feeds', icon: 'list.svg', link: '/all-feeds' },
];
const feedMenus = [
    { text: 'Favoritos', icon: 'star.svg', link: '/favorites' },
    { text: 'Ler mais tarde', icon: 'time.svg', link: '/read-later' },
    { text: 'Lidos recentemente', icon: 'check.svg', link: '/recently-read' },
]

const route = useRoute();

const {
    isCollapsed,
    isMobile,
    isDrawerOpen,
    sidebarClasses,
    overlayClasses,
    toggleSidebar,
    closeDrawer
} = useSidebar();
</script>

<style scoped>
.side-nav {
    width: var(--sidebar-width);
    height: 100vh;
    background-color: var(--color-almost-dark);
    padding: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.075);
    position: fixed;
    left: 0;
    top: 0;
    z-index: var(--z-sidebar);
    transition: transform var(--transition-normal), width var(--transition-normal);
    overflow-y: auto;
}

.side-nav.sidebar-collapsed:not(.sidebar-mobile) {
    width: var(--sidebar-collapsed-width);
    padding: 20px 10px;
}

.side-nav.sidebar-collapsed:not(.sidebar-mobile) .side-nav__header {
    justify-content: center;
}

.side-nav.sidebar-mobile {
    width: var(--sidebar-mobile-width);
    transform: translateX(-100%);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
}

.side-nav.sidebar-mobile.sidebar-drawer-open {
    transform: translateX(0);
}

.side-nav.sidebar-mobile.sidebar-drawer-closed {
    transform: translateX(-100%);
}

.side-nav__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: 40px;
}

.side-nav__logo {
    width: 60%;
    height: auto;
    transition: opacity 0.3s ease;
}

.side-nav.sidebar-collapsed:not(.sidebar-mobile) .side-nav__logo {
    width: 100%;
    opacity: 0;
    visibility: hidden;
}

.side-nav__toggle {
    width: 30px;
    height: 30px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    color: #fff;
}

.side-nav__toggle:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.side-nav__toggle img {
    width: 16px;
    height: 16px;
}

.side-nav__menu {
    font-size: 1rem;
    line-height: 1.25;
    transition: opacity 0.3s ease;
}

.side-nav.sidebar-collapsed:not(.sidebar-mobile) .side-nav__menu {
    opacity: 0;
    visibility: hidden;
}

.side-nav__menu ul {
    list-style: none;
}

.side-nav__menu hr {
    height: 1px;
    background: rgba(255, 255, 255, 0.075);
    margin: 10px 0;
    border: none;
}

/* Overlay para mobile */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-overlay);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
}

.sidebar-overlay.sidebar-overlay-visible {
    opacity: 1;
    visibility: visible;
}

/* Responsividade */
@media screen and (max-width: 768px) {
    .side-nav {
        width: 280px;
        padding: 20px;
    }

    .side-nav__header {
        margin-bottom: 30px;
    }

    .side-nav__logo {
        width: 70%;
    }
}

@media screen and (min-width: 769px) {
    .side-nav {
        position: relative;
        transform: none !important;
    }
}
</style>