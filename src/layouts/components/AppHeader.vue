<template>
    <div class="app-header">
        <div class="app-header__title">
            <h3>{{ title }}</h3>
            <small>Posts de todos os feeds para hoje</small>
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
const props = defineProps<{
    title: string;
}>();
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
</style>