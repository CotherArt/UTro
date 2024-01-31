import { defineStore } from 'pinia'
import axios from 'axios'

export const useSteamStore = defineStore('steam', () => {
  const test = async () => {
    const key = '2918959A690CDD176A92211F0AA1AB20'
    const steamid = '76561198319045204'
    const data = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${key}&steamid=${steamid}`
    )
    console.log(data)
    return data
  }

  return { test }
})
