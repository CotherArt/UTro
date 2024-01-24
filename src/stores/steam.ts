import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSteamStore = defineStore('steam', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const test = async () => {
    const key = 'CE30A80EE8FC34C1B60EE72E8D03379C'
    const steamid = '76561198319045204'
    const data = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${key}&steamid=${steamid}`
    )
    console.log(data)
    return data
  }

  return { count, doubleCount, test }
})
