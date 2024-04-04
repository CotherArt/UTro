<template>
  <Button label="toast" @click="handleToastClick"></Button>
  <Button label="get users" @click="handleGetUsers"></Button>
  <div v-for="user in usersStore.users" :key="user._id" class="flex gap-1">
    <div class="text-blue-400">{{ user.username }}</div>
    \
    <div class="text-red-400">{{ user.email }}</div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/custom/Button.vue'

import { toastError, toastInfo, toastSuccess, toastWarn } from '@/services/toast'

import { useUsersStore } from '@/stores/admin/users'

const usersStore = useUsersStore()

const handleToastClick = () => {
  toastInfo('tremendo  canaya 🐛')
  toastError('tremendo mamawebaso 🐛')
  toastSuccess('tremendo mamawebaso 🐛')
  toastWarn('tremendo mamawebaso 🐛')
}
const handleGetUsers = async () => {
  await usersStore.getUsers()
}
</script>
