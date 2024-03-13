import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Game } from '@/models/steam'
import type { AxiosError, AxiosResponse } from 'axios'
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

  async function getGamesByName(name: string) {
    const response = await axios
      .get(`/steam/search_by_name?target_name=${name}`)
      .then((response: AxiosResponse) => response.data)
      .catch((reason: AxiosError) => {
        alert(JSON.stringify(reason.response?.data))
        return reason
      })
    return response
  }

  async function getGameDetails(app_id: string) {
    const response = await axios
      .get(`/steam/game_details?app_id=${app_id}`)
      .then((response: AxiosResponse) => response)
      .catch((reason: AxiosError) => {
        alert(JSON.stringify(reason.response?.data))
        return reason
      })
    return response
  }

  return {
    // state
    steamSpecialOffers,
    steamNewReleases,
    // getters
    specialOffers,
    // functions
    getSpecialOffers,
    getNewReleases,
    getGamesByName,
    getGameDetails
  }
})
