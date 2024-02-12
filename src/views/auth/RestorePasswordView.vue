<template>
  <form @submit.prevent="handleSubmit" class="sm:w-28rem w-full my-2">
    <Card>
      <template #header>
        <div class="relative">
          <div class="overflow-hidden border-round-top">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style="object-fit: cover; filter: blur(6px); transform: scale(1.1)"
              class="w-full h-6rem"
            />
          </div>
          <h1 class="text-center w-full absolute m-10 p-0 top-0">Restore password</h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column justify-content-center gap-2">
          <div class="flex flex-column gap-2">
            <label for="password">New password:</label>
            <Password
              id="password"
              name="password"
              input-class="w-full"
              v-model="formData.password"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Confirm password:</label>
            <Password
              id="password"
              name="password"
              input-class="w-full"
              v-model="formData.password"
            />
          </div>
        </div>
        <div class="flex flex-column gap-2 mt-2">
          <InlineMessage v-for="error in errors" :key="error" severity="error">{{
            error
          }}</InlineMessage>
        </div>
      </template>
      <template #footer>
        <Button label="Sign in" type="submit" class="w-full" :loading="loading" />
      </template>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
// components
import Card from 'primevue/card'
import InlineMessage from 'primevue/inlinemessage'
import Password from 'primevue/password'
import Button from 'primevue/button'
// models
import type { SignUpModel } from '@/models/auth'
import { isAxiosError } from 'axios'
import router from '@/router'
import type { ErrorResponseData } from '@/services/axios'

const authStore = useAuthStore()

const loading = ref<boolean>(false)
const errors = ref<string[]>([])

const formData = ref<SignUpModel>({
  username: '',
  email: '',
  password: ''
})

function validateForm(data: SignUpModel) {
  const newErrors: string[] = []
  if (!data.username!!) newErrors.push('username required')
  if (!data.email!!) newErrors.push('email required')
  if (!data.password!!) newErrors.push('password required')
  console.log(data)
  errors.value = newErrors
  return errors.value.length === 0
}

async function handleSubmit() {
  errors.value = []
  if (!validateForm(formData.value)) return

  loading.value = true
  const response = await authStore.register(formData.value).finally(() => (loading.value = false))
  if (isAxiosError(response)) {
    const errorData = response.response?.data as ErrorResponseData
    if (errorData.detail) {
      errors.value.push(errorData.detail)
    }
    return
  }
  await router.push('/').then(() => window.location.reload())
}
</script>

<style scoped></style>
