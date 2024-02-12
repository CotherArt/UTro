import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/models/steam'
import type { AxiosResponse } from 'axios'
import axios from '@/services/axios'

export const useSteamStore = defineStore('steam', () => {
  // STATE
  const steamSpecialOffers = ref<Game[]>([])
  const steamNewReleases = ref<Game[]>([])

  // GETTERS
  const specialOffers = computed<Game[]>(() => steamSpecialOffers.value)
  // FUNCTIONS
  async function getSpecialOffers() {
    axios.get('/steam/special_offers').then((response: AxiosResponse) => {
      steamSpecialOffers.value = response.data
    })
  }

  async function getNewReleases() {
    axios.get('/steam/new_releases').then((response: AxiosResponse) => {
      steamNewReleases.value = response.data
    })
  }
  return {
    // state
    steamSpecialOffers,
    steamNewReleases,
    // getters
    specialOffers,
    // functions
    getSpecialOffers,
    getNewReleases
  }
})
