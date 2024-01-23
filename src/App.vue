<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
</script>

<template>
  <header>
    <TheMenu />
  </header>

  <RouterView />
</template>

<style scoped></style>
