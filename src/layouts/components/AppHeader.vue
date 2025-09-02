<template>
    <div class="app-header">
        <!-- Botão de menu para mobile -->
        <button v-if="isMobile" class="app-header__menu-toggle" @click="toggleSidebar" :title="'Abrir menu'">
            <img :src="`/src/assets/icons/add.svg`" alt="Menu" />
        </button>

        <div class="app-header__title">
            <h3>{{ $route.meta.title }}</h3>
            <small>{{ $route.meta.subtitle }}</small>
        </div>
        <div class="app-header__actions">
            <input type="text" placeholder="Pesquisar" class="app-header__actions__input" />
            <button class="app-header__actions__button-icon">
                <img :src="`/src/assets/icons/refresh.svg`" alt="Atualizar" />
            </button>
            <button class="app-header__actions__button">
                Adicionar feed
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSidebar } from '@/composables/useSidebar';

const route = useRoute();
const { isMobile, toggleSidebar } = useSidebar();
</script>

<style scoped>
.app-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.app-header__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;
}

.app-header__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.app-header__actions__input {
    border: 1px solid var(--color-border);
    height: 36px;
    padding: 6px 10px;
    border-radius: 8px;
    background-color: var(--color-almost-dark);
    color: #fff;
    transition: all .25s ease;
    font-size: 16px;
}

.app-header__actions__input:focus {
    outline: none;
    border-color: var(--color-secondary-border);
}

.app-header__actions__button-icon {
    display: flex;
    height: 30px;
    width: 30px;
    border-radius: 8px;
    background-color: white;
    border: none;
    cursor: pointer;
    transition: all .25s ease;
    padding: 6px;
}

.app-header__actions__button-icon:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.app-header__actions__button {
    border: 1px solid var(--color-secondary);
    height: 30px;
    padding: 6px 10px;
    border-radius: 8px;
    background-color: var(--color-secondary);
    color: #fff;
    cursor: pointer;
    transition: all .25s ease;
}

.app-header__actions__button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

/* Botão de toggle do menu para mobile */
.app-header__menu-toggle {
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    margin-right: 15px;
    flex-shrink: 0;
}

.app-header__menu-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.app-header__menu-toggle img {
    width: 18px;
    height: 18px;
    filter: invert(1);
}

@media screen and (max-width: 768px) {
    .app-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .app-header__title {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>