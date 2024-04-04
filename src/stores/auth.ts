import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
import type { MenuItem } from 'primevue/menuitem'
import router from '@/router'
// utils
import { setAccessToken, removeAccessToken } from '@/services/utils/token'
import { toastSuccess, toastError } from '@/services/toast'
// models
import type { LogInByEmailModel, SignUpModel } from '@/models/auth'
import type { AxiosError, AxiosResponse } from 'axios'
import type { UserType } from '@/models/user'

export const useAuthStore = defineStore('authStore', () => {
  //STATE
  const authUser = ref<User | null>(null)

  //GETTERS (computed values)
  const avatarImage = computed(() => authUser.value?.profile.img)
  const role = computed(() => authUser.value?.authentication.role)
  const user = computed(() => authUser.value)
  const isAuthenticated = computed(() => authUser.value !== null)

  //FUNCTIONS
  const register = async (values: SignUpModel) => {
    const response = await axios
      .post('/auth/register', values)
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
  const loginByEmail = async (values: LogInByEmailModel): Promise<AxiosResponse | AxiosError> => {
    const response = await axios
      .post('/auth/login', values)
      .then(async (response: AxiosResponse) => {
        await setAccessToken(response.data.access_token)
        await authenticate()
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

  const authenticate = async () => {
    await axios
      .get(`/auth/authenticate`)
      .then((response: AxiosResponse) => {
        authUser.value = response.data
      })
      .catch(() => {
        authUser.value = null
      })
  }

  return {
    //state
    authUser,
    menuRoutes,
    //getters uwu
    user,
    avatarImage,
    role,
    isAuthenticated,
    //functions
    loginByEmail,
    logOut,
    register,
    authenticate,
    validateToken
  }
})
