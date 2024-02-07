<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
import TheBreadcrumb from '@/components/TheBreadcrumb.vue'
</script>

<template>
  <header>
    <TheMenu />
    <TheBreadcrumb />
  </header>

  <RouterView />
</template>

<style scoped></style>
