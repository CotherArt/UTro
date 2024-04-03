import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosError, AxiosResponse } from 'axios'
import axios from '@/services/axios'
import type { UserType } from '@/models/user'
import { toastError, toastSuccess } from '@/services/toast'

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

  async function updateUser(params: UserType) {
    const response = await axios
      .patch(`/admin/users/${params._id}`, {
        username: params.username,
        email: params.email,
        authentication: {
          role: params.authentication.role
        }
      })
      .then(async (response: AxiosResponse) => {
        toastSuccess('✨ Usuario actualizado correctamente! ✨')
        await getUsers()
        return response
      })
      .catch((reason: AxiosError) => {
        toastError('💩 Error al actualizar usuario, por favor intente otra vez 💩')
        return reason
      })
    return response
  }

  async function deleteUser(id: string) {
    const response = await axios
      .delete(`/admin/users/${id}`)
      .then(async (response: AxiosResponse) => {
        toastSuccess('✨ Usuario eliminado correctamente! ✨')
        await getUsers()
        return response
      })
      .catch((reason: AxiosError) => {
        toastError('💩 Error al eliminar usuario, por favor intente otra vez 💩')
        return reason
      })
    return response
  }

  return {
    // state
    users,
    // getters
    // functions
    getUsers,
    updateUser,
    deleteUser
  }
})
