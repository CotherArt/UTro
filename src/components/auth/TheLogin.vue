<template>
  <Form @submit="handleSubmit" :validation-schema="schema">
    <Card class="w-full sm:w-20rem">
      <template #title>Log in</template>
      <template #content>
        <InputText id="username" name="username" label="username:" />
        <InputText id="password" name="password" label="password:" type="password" />
      </template>
      <template #footer>
        <Button label="Submit" type="submit" :loading="loading" class="w-full"></Button>
      </template>
    </Card>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
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
import type { LogInByUsernameModel } from '@/models/auth'

const authStore = useAuthStore()
const loading = ref<boolean>(false)

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
})

async function handleSubmit(values: object) {
  loading.value = true
  await authStore.loginByUsername(values as LogInByUsernameModel).finally(async () => {
    loading.value = false
    await router.push('/')
    window.location.reload()
  })
}
</script>

<style scoped></style>
