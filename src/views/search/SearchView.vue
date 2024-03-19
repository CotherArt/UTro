<template>
  <div>
    <div class="flex flex-column w-full align-items-center w-full justify-items-center">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        type="long"
        style="max-width: 50rem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Game } from '@/models/steam'

// components
import GameCard from '@/components/UI/cards/GameCard.vue'
// store
import { useSteamStore } from '@/stores/steam'

const steamStore = useSteamStore()
const route = useRoute()
const games = ref<Game[]>([])

onMounted(async () => {
  const name = route.params.name.toString()
  const response = await steamStore.getGamesByName(name)
  console.log(response)
})
</script>
