<template>
  <div>
    <Button label="test" @click="test()" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useSteamStore } from '@/stores/steam'

const steamStore = useSteamStore()

async function test() {
  const webo = await steamStore.test()
  console.log(webo)
}
</script>

<style scoped></style>
