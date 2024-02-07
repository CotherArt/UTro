import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/models/steam'
import type { AxiosResponse } from 'axios'
import axios from '@/services/axios'

export const useSteamStore = defineStore('steam', () => {
  // STATE
  const steamSpecialOffers = ref<Game[]>([])

  // GETTERS
  const specialOffers = computed<Game[]>(() => steamSpecialOffers.value)
  // FUNCTIONS
  async function getSpecialOffers() {
    axios.get('/steam/special_offers').then((response: AxiosResponse) => {
      steamSpecialOffers.value = response.data
    })
  }
  return {
    // state
    steamSpecialOffers,
    // getters
    specialOffers,
    // functions
    getSpecialOffers
  }
})
