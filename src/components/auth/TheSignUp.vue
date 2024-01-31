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
          <h1 class="text-center w-full absolute m-10 p-0 top-0">Create your account</h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column justify-content-center gap-2">
          <div class="flex flex-column gap-2">
            <label for="username">Username:</label>
            <InputText id="username" name="username" v-model="formData.username" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="email">Email:</label>
            <InputText id="email" name="email" v-model="formData.email" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Password:</label>
            <Password
              id="password"
              name="password"
              input-class="w-full"
              v-model="formData.password"
            />
          </div>
        </div>
      </template>
      <div>{{ errors }}</div>
      <template #footer>
        <Button label="Sign in" type="submit" class="w-full" :disabled="loading">
          <i v-if="loading" class="pi pi-spin pi-spinner w-full text-2xl font-bold"></i>
        </Button>
      </template>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authenticationStore } from '@/stores/authentication'
// components
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import type { SignUpModel } from '@/models/auth'

const authStore = authenticationStore()

const loading = ref<boolean>(false)
const errors = ref<string[]>([])

const formData = ref<SignUpModel>({
  username: '',
  email: '',
  password: ''
})

function validateForm(data: SignUpModel) {
  const newErrors: string[] = []
  if (data.email) newErrors.push('campo email requerido')
  if (data.password) newErrors.push('campo password requerido')
  if (data.username) newErrors.push('campo username requerido')

  errors.value = newErrors
  return newErrors.length > 0
}

async function handleSubmit() {
  if (!validateForm(formData.value)) return
  loading.value = true
  await authStore.register(formData.value).finally(() => (loading.value = false))
}
</script>

<style scoped></style>
@/services/axios
