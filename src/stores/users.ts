import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from '@/services/axios'

export const useUsersStore = defineStore('users', () => {
  // STATE
  const users = ref()

  // GETTERS
  // FUNCTIONS
  async function getUsers() {
    const response = await axios
      .get(`/users`)
      .then((response: AxiosResponse) => {
        users.value = response.data
      })
      .catch((reason: AxiosError) => {
        alert(JSON.stringify(reason.response?.data))
        return reason
      })
    return response
  }

  return {
    // state
    users,
    // getters
    // functions
    getUsers
  }
})
