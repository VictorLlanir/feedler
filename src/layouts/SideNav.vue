<script setup lang="ts">
import MenuItem from './components/MenuItem.vue';

</script>

<template>
    <aside class="side-nav">
        <div class="side-nav__header">

        </div>
        <div class="side-nav__menu">
            <ul>
                <MenuItem text="Hoje" icon="sun.svg" link="today" />
            </ul>
        </div>
    </aside>
</template>

<style scoped>
.side-nav {
    width: 260px;
    height: 100vh;
    background-color: var(--color-sidenav-bg);
    padding: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.075);
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
</style>