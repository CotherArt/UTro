<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TheMenu from './components/TheMenu.vue'

const router = useRoute()
const path = computed(() => router.path)
</script>

<template>
  <header>
    <TheMenu />
  </header>

  <RouterView />
</template>

<style scoped></style>
