<script setup lang="ts">
// vue
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import TheToast from './components/TheToast.vue'
// custom
import TheMenu from './components/TheMenu.vue'
import TheBreadcrumb from '@/components/TheBreadcrumb.vue'
// sotore
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onBeforeMount(async () => await authStore.getUser())
</script>

<template>
  <TheToast />
  <header>
    <TheMenu />
    <TheBreadcrumb />
  </header>

  <RouterView v-slot="{ Component }">
    <transition leave-active-class="" enter-active-class="" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
</template>

<style></style>
