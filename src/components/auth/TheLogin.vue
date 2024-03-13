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
              alt=""
            />
          </div>
          <h1 class="text-center w-full absolute m-10 p-0 top-0">Log in</h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column justify-content-center gap-2">
          <div class="flex flex-column gap-2">
            <label for="username">Username:</label>
            <InputText
              id="username"
              name="username"
              v-model="loginData.username"
              aria-describedby="username-help"
              :tabindex="1"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Password:</label>
            <Password
              id="password"
              name="password"
              input-class="w-full"
              v-model="loginData.password"
              aria-describedby="username-help"
              :tabindex="2"
            />
          </div>
          <div class="flex align-items-center">
            <Checkbox id="remember" v-model="remember" :tabindex="3" />
            <label for="remember" class="ml-2">Remember me</label>
          </div>
          <RecaptchaV2
            class="flex justify-content-center mt-4"
            @widget-id="handleWidgetId"
            @error-callback="handleErrorCalback"
            @expired-callback="handleExpiredCallback"
            @load-callback="handleLoadCallback"
          />
        </div>
      </template>
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
import router from '@/router'
// components
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { RecaptchaV2 } from 'vue3-recaptcha-v2'
// stores
import { useAuthStore } from '@/stores/auth'
// models
import type { LogInByUsernameModel } from '@/models/auth'

const authStore = useAuthStore()
const loading = ref<boolean>(false)
const captchaPassed = ref<boolean>(false)

const loginData = ref<LogInByUsernameModel>({
  username: '',
  password: ''
})
const remember = ref<boolean>(false)

async function handleSubmit() {
  if (!captchaPassed.value) return
  loading.value = true
  await authStore.loginByUsername(loginData.value).finally(async () => {
    loading.value = false
    await router.push('/')
    window.location.reload()
  })
}

// recaptcha
const handleWidgetId = (widgetId: number) => {
  console.log('Widget ID: ', widgetId)
}
const handleErrorCalback = () => {
  console.log('Error callback')
  captchaPassed.value = false
}
const handleExpiredCallback = () => {
  console.log('Expired callback')
}
const handleLoadCallback = (response: unknown) => {
  console.log('Load callback', response)
  captchaPassed.value = true
}
</script>

<style scoped></style>
