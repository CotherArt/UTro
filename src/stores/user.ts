import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import axios from '@/services/axios'

//models
import type { AxiosResponse } from 'axios'
import type { User } from '@/models/user'

export const userStore = defineStore('user', () => {
  //STATE
  const user = ref<User>({})

  //GETTERS (computed values)
  const avatarImage = computed(() => user.value.avatar || false)

  //FUNCTIONS
  const getUser = async () => {
    return await axios.get('/current_user').then((response: AxiosResponse) => {
      user.value = response.data
    })
  }

  return {
    //state
    user,
    //getters uwu
    avatarImage,
    //functions
    getUser
  }
})
