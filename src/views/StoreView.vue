<template>
  <h1 class="w-full text-center">Store</h1>
  <div>
    <h3>SPECIAL OFFERS</h3>
    <Carousel
      :value="steamStore.specialOffers"
      :numVisible="3"
      :numScroll="3"
      :autoplayInterval="3000"
      circular
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <GameCard
          :imageURL="slotProps.data.large_capsule_image"
          :title="slotProps.data.name"
          :offerTime="`Offer ends ${slotProps.data.discount_expiration} @ 11:00am.`"
          :normalPrice="slotProps.data.original_price"
          :percentageDiscount="slotProps.data.discount_percent"
        />
      </template>
    </Carousel>
    <!-- <div class="flex gap-1 flex-wrap">
      <div v-for="game in steamStore.specialOffers" :key="game.id">
        <img :src="game.header_image" />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Game } from '@/models/steam'
import GameCard from '@/components/GameCard.vue'
import Carousel from 'primevue/carousel'

// store
import { useSteamStore } from '@/stores/steam'

interface GameCardInterface {
  title: string
  imageURL: string
  offerTime: string
  normalPrice: number
  percentageDiscount: number
}

const steamStore = useSteamStore()

const offerGames: GameCardInterface[] = [
  {
    title: 'ELDEN RING',
    imageURL:
      'https://static.bandainamcoent.eu/high/elden-ring/elden-ring/00-page-setup/elden-ring-new-header-mobile.jpg',
    offerTime: '29 Jan',
    normalPrice: 950,
    percentageDiscount: 32
  },
  {
    title: 'Kingdom come deliverance',
    imageURL:
      'https://cdn1.epicgames.com/undefined/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S4-510x680-ec915782c8a2d6f1d64c028dd74a398f.jpg',
    offerTime: '29 Jan',
    normalPrice: 800,
    percentageDiscount: 30
  },
  {
    title: 'Bioshock infinite',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/en/a/a3/Official_cover_art_for_Bioshock_Infinite.jpg',
    offerTime: '29 Jan',
    normalPrice: 450,
    percentageDiscount: 12
  },
  {
    title: 'Dark Souls III',
    imageURL:
      'https://p325k7wa.twic.pics/high/dark-souls/dark-souls-3/00-page-setup/ds3_game-thumbnail.jpg?twic=v1/resize=760/step=10/quality=80',
    offerTime: '29 Jan',
    normalPrice: 650,
    percentageDiscount: 50
  },
  {
    title: 'Tunic',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/85/Tunic_cover_art.jpg',
    offerTime: '29 Jan',
    normalPrice: 150,
    percentageDiscount: 80
  }
]

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
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

onMounted(() => {
  steamStore.getSpecialOffers()
})
</script>
