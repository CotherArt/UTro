import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
// utils
import { setAccessToken, removeAccessToken } from '@/services/utils/token'
import { toastSuccess, toastError } from '@/services/toast'
// models
import type { LogInByUsernameModel, SignUpModel } from '@/models/auth'
import type { AxiosError, AxiosResponse } from 'axios'
import type { User } from '@/models/user'

export const useAuthStore = defineStore('authStore', () => {
  //STATE
  const authUser = ref<User | null>(null) 

  //GETTERS (computed values)
  const avatarImage = computed(() => authUser.value?.avatar)
  const user = computed(() => authUser.value)

  //FUNCTIONS
  const register = async (values: SignUpModel) => {
    const response = await axios
      .post('/signup', values)
      .then(async (response: AxiosResponse) => {
        await setAccessToken(response.data.access_token)
        toastSuccess('✨ Usuario registrado correctamente! ✨')
        return response
      })
      .catch((reason: AxiosError) => {
        toastError('💩 Error al registrar usuario, por favor intente otra vez 💩')
        return reason
      })
    return response
  }

  // Se autentica en la API con usuario y contraseña y se obtiene el token
  const loginByUsername = async (
    values: LogInByUsernameModel
  ): Promise<AxiosResponse | AxiosError> => {
    const response = await axios
      .post('login-by-username', JSON.stringify(values))
      .then(async (response: AxiosResponse) => {
        await setAccessToken(response.data.access_token)
        return response
      })
      .catch((reason: AxiosError) => {
        alert(JSON.stringify(reason.response?.data))
        return reason
      })
    return response
  }

  const logOut = () => {
    removeAccessToken()
  }

  const validateToken = async () => {
    return await axios.post('validate_token').then((response: AxiosResponse) => {
      return response.data
    })
  }

  const getUser = async () => {
    await axios
      .get('/current_user')
      .then((response: AxiosResponse) => {
        authUser.value = response.data

        authUser.value = {
          username: "pepe",
          avatar: "https://sakuragates.com/wp-content/uploads/2023/04/Good-Smile-Hello-Puella-Magi-Madoka-Magica-The-Movie-Rebellion-Madoka-Kaname-4.webp",
          email: "pepe@gmail.com"
        }
      })
      .catch(() => {
        authUser.value = null
      })
  }

  return {
    //state
    authUser,
    //getters uwu
    user,
    avatarImage,
    //functions
    loginByUsername,
    logOut,
    register,
    getUser,
    validateToken
  }
})
