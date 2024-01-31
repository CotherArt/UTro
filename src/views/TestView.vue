<template>
  <div>
    <Button label="test" @click="test()" />
  </div>
<h1>Perreo Intenso</h1>

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
