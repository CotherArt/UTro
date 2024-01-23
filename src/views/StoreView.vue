<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'

interface GameCardInterface {
  title: string
  imageURL: string
  offerTime: string
  normalPrice: number
  percentageDiscount: number
}

const offerGames: GameCardInterface[] = [
  {
    title: 'ELDEN RING',
    imageURL: 'https://img.pccomponentes.com/pcblog/2677/elden-ring.jpg',
    offerTime: '29 Jan',
    normalPrice: 200,
    percentageDiscount: 25
  },
  {
    title: 'ELDEN RING',
    imageURL: 'https://img.pccomponentes.com/pcblog/2677/elden-ring.jpg',
    offerTime: '29 Jan',
    normalPrice: 200,
    percentageDiscount: 25
  }
]
</script>

<template>
  <h1>Store</h1>
  <div class="flex gap-2 w-full overflow-x-scroll">
    <GameCard
      v-for="item in offerGames"
      v-bind:key="item.title"
      :imageURL="item.imageURL"
      :title="item.title"
      :offerTime="`Offer ends ${item.offerTime} @ 11:00am.`"
      :normalPrice="item.normalPrice"
      :percentageDiscount="item.percentageDiscount"
    />
  </div>
</template>
