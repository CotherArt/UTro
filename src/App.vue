<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue'
import TheBreadcrumb from '@/components/TheBreadcrumb.vue'

import { useAuthStore } from '@/stores/auth'
import { onBeforeMount } from 'vue'

const authStore = useAuthStore()

onBeforeMount(async () => await authStore.getUser())
</script>

<template>
  <header>
    <TheMenu />
    <TheBreadcrumb />
  </header>

  <RouterView />
</template>

<style scoped></style>
