<script setup lang="ts">
import SideNav from './layouts/SideNav.vue'
import MainContent from './layouts/MainContent.vue'
</script>

<template>
  <SideNav />
  <MainContent />
</template>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, var(--color-app-bg), #0b0b0b);
}
</style>