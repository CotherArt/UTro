<template>
  <div>
    <h2 class="text-center">SPECIAL OFFERS</h2>
    <Carousel
      :value="steamStore.specialOffers"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="5000"
      :numVisible="4"
      :numScroll="1"
    >
      <template #item="slotProps">
        <GameCard :game="slotProps.data" />
      </template>
    </Carousel>
    <h2 class="text-center">New Releases</h2>
    <div class="flex flex-column w-full align-items-center w-full justify-items-center">
      <GameCard
        v-for="game in steamStore.steamNewReleases"
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

// components
import Carousel from 'primevue/carousel'
import GameCard from '@/components/UI/cards/GameCard.vue'

// store
import { useSteamStore } from '@/stores/steam'

const steamStore = useSteamStore()

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])

onMounted(async () => {
  await steamStore.getSpecialOffers()
  await steamStore.getNewReleases()
})
</script>
