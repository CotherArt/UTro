<template>
  <div v-if="!logged" class="sm:w-21rem w-full">
    <Form @submit="handleSubmit" :validation-schema="schema">
      <Card>
        <template #title>
          <div class="text-center">Log in</div>
        </template>
        <template #content>
          <InputText id="email" name="email" label="email:" />
          <InputText id="password" name="password" label="password:" type="password" />
        </template>
        <template #footer>
          <Button label="Login" type="submit" :loading="loading" class="w-full"></Button>
          <div class="mt-4 text-center">
            Don't you have an account?
            <RouterLink to="register">Register</RouterLink>
          </div>
        </template>
      </Card>
    </Form>
  </div>
  <div v-else>
    <Card class="p-4">
      <template #title> Congratulations </template>
      <template #content> you are logged in </template>
      <template #footer>
        <Button label="Go to Store" type="button" class="w-full" @click="$router.push('/')" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// components
import Card from 'primevue/card'
//custom componets
import Button from '@/components/custom/Button.vue'
import InputText from '@/components/custom/InputText.vue'
// validation
import * as yup from 'yup'
import { Form } from 'vee-validate'
// stores
import { useAuthStore } from '@/stores/auth'
// models
import type { LogInByEmailModel } from '@/models/auth'

const authStore = useAuthStore()
const loading = ref<boolean>(false)
const logged = ref<boolean>(false)

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
})

async function handleSubmit(values: object) {
  loading.value = true
  await authStore.loginByEmail(values as LogInByEmailModel)
  logged.value = true
  loading.value = false
}
</script>

<style scoped></style>
