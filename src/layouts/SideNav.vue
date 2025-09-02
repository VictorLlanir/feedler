<template>
    <aside class="side-nav">
        <div class="side-nav__header">
            <img src="/src/assets/images/feedler_logo.png" alt="Logo" class="side-nav__logo" />
        </div>
        <div class="side-nav__menu">
            <ul>
                <MenuItem v-for="item in coreMenus" :key="item.text" :text="item.text" :icon="item.icon"
                    :link="item.link" :isActive="item.link === route.path" />
            </ul>
            <hr />
            <ul>
                <MenuItem v-for="item in feedMenus" :key="item.text" :text="item.text" :icon="item.icon"
                    :link="item.link" :isActive="item.link === route.path" />
            </ul>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MenuItem from './components/MenuItem.vue';

const coreMenus = [
    { text: 'Hoje', icon: 'sun.svg', link: '/today' },
    { text: 'Adicionar feeds', icon: 'add.svg', link: '/add-feeds' },
    { text: 'Buscar', icon: 'search.svg', link: '/search' },
];
const feedMenus = [
    { text: 'Favoritos', icon: 'star.svg', link: '/favorites' },
    { text: 'Ler mais tarde', icon: 'time.svg', link: '/read-later' },
    { text: 'Lidos recentemente', icon: 'check.svg', link: '/recently-read' },
]

const route = useRoute();
</script>

<style scoped>
.side-nav {
    width: 260px;
    height: 100vh;
    background-color: var(--color-almost-dark);
    padding: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.075);
}

.side-nav__logo {
    width: 60%;
    height: auto;
    margin-bottom: 20px;
}

.side-nav__menu {
    font-size: 1rem;
}

.side-nav__menu {
    line-height: 1.25;
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

@media screen and (max-width: 768px) {
    .side-nav {
        width: 100%;
        height: auto;
        padding: 10px;
    }
}
</style>