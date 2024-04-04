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
  const authUser = ref<UserType | null>(null)
  const menuRoutes = ref<MenuItem[]>([
    {
      label: '🛒TIENDA',
      items: [
        {
          label: 'Inicio',
          command: () => router.push({ name: 'home' })
        },
        {
          label: 'Lista de deseados',
          command: () => router.push({ name: 'wishlist' })
        }
      ]
    },
    {
      label: '📫CONTACT',
      command: () => router.push({ name: 'contact' })
    },
    {
      label: '🗺️MAPA DE SITIO',
      command: () => router.push({ name: 'map' })
    }
  ])
  const adminRoutes: MenuItem[] = [
    {
      label: '😎 ADMIN',
      items: [
        { label: '👥USERS', command: () => router.push({ name: 'adminUsers' }) },
        {
          label: '🧪TEST',
          command: () => router.push({ name: 'test' })
        }
      ]
    }
  ]

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
        if (response.data.authentication.role === 'Administrator') {
          menuRoutes.value.push(...adminRoutes)
        }
      })
      .catch(() => {
        authUser.value = null
      })
  }

  const updateProfileImg = async (imgBase64: string) => {
    try {
      await axios.patch(`/users/${authUser.value?._id}`, {
        profile: {
          img: imgBase64
        }
      })
      authenticate()
      toastSuccess('✨ Imagen actualizada correctamente! ✨')
    } catch (error) {
      toastError('💩 Error al actualizar imagen de usuario, por favor intente otra vez 💩')
    }
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
    validateToken,
    updateProfileImg
  }
})
