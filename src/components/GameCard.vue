<template>
  <div class="container bg-purple-800 w-20rem border-round">
    <div class="w-20rem h-20rem border-round-top image" :style="imageClass" />
    <div class="info mx-4 h-7rem">
      <p class="title-name text-white">{{ title?.toUpperCase() }}</p>
      <p class="offer-time text-gray-100 mb-2 text-xs">{{ offerTime }}</p>
      <div class="discount flex border-round">
        <span class="percentage bg-green-600 text-green-200 px-1 text-2xl"
          >-{{ percentageDiscount }}%</span
        >
        <div class="prices flex flex-column bg-gray-700 px-2">
          <strike class="priceDisc text-xs text-right text-gray-200"
            >Mex$ {{ normalPrice }}.00</strike
          >
          <span class="priceAct text-green-200">Mex$ {{ actualPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps({
  title: { type: String },
  offerTime: { type: String },
  percentageDiscount: { type: Number, required: true },
  normalPrice: { type: Number, required: true },
  imageURL: { type: String }
})

const actualPrice = computed(() => {
  const discount = (props.percentageDiscount * props.normalPrice) / 100
  return props.normalPrice - discount
})

const imageClass = ref<string>(
  `
  background: linear-gradient(180deg, rgba(9, 9, 121, 0) 80%, rgba(65,46,117, 1) 100%),url('${props.imageURL}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  `
)
</script>

<style scoped>
p {
  margin: 0;
}
</style>
