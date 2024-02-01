import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from '@/services/axios'

import { userStore } from './user'

//models
import type { LogInByUsernameModel, SignUpModel } from '@/models/auth'
import type { AxiosError, AxiosResponse } from 'axios'
import { setAccessToken } from '@/services/utils'

export const authenticationStore = defineStore('authentication', () => {
  //STATE
  const isAuthenticated = ref<boolean>(false)
  //GETTERS (computed values)

  //FUNCTIONS

  const register = async (values: SignUpModel) => {
    return await axios
      .post('/signup', values)
      .then(async (response: AxiosResponse) => {
        await setAccessToken(response.data.access_token)
      })
      .catch((reason: AxiosError) => alert(reason.toJSON()))
      .finally(async () => {
        await validateToken()
      })
  }

  // Se autentica en la API con usuario y contraseña y se obtiene el token
  const loginByUsername = async (values: LogInByUsernameModel) => {
    const userStoreHandler = userStore()
    return await axios
      .post('login-by-username', JSON.stringify(values))
      .then(async (response: AxiosResponse) => {
        await setAccessToken(response.data.access_token)
        await userStoreHandler.getUser()
      })
      .finally(async () => {
        await validateToken()
      })
  }

  const validateToken = async () => {
    return await axios
      .post('validate_token')
      .then((response: AxiosResponse) => {
        isAuthenticated.value = response.data
        return response.data
      })
      .catch(() => {
        isAuthenticated.value = false
      })
  }

  return {
    //state
    //getters uwu
    //functions
    loginByUsername,
    register,
    validateToken
  }
})
