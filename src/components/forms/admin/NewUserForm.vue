<template>
  <Form @submit="handleSubmit" :validation-schema="schema">
    <Card>
      <template #content>
        <InputText name="username" label="user name:" />
        <InputText name="email" label="email:" />
        <InputText name="password" type="password" label="password:" />
        <InputText name="passwordConfirm" type="password" label="password confirm:" />
        <TheReCaptcha class="pt-2" name="recaptcha" />
      </template>
      <template #footer>
        <Button label="Sign in" type="submit" class="w-full" :loading="loading" />
      </template>
    </Card>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
// components
import Card from 'primevue/card'
//custom componets
import Button from '@/components/custom/Button.vue'
import InputText from '@/components/custom/InputText.vue'
import TheReCaptcha from '@/components/custom/TheReCaptcha.vue'
// validation
import * as yup from 'yup'
import { Form } from 'vee-validate'
// models
import type { SignUpModel } from '@/models/auth'
import { isAxiosError } from 'axios'
import type { ErrorResponseData } from '@/services/axios'

const emit = defineEmits<{
  submit: []
}>()

const authStore = useAuthStore()

const loading = ref<boolean>(false)
const errors = ref<string[]>([])
const registered = ref<boolean>(false)

const schema = yup.object({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirm: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref('password')]),
  recaptcha: yup.string().required()
})

async function handleSubmit(values: object) {
  loading.value = true
  const response = await authStore
    .register(values as SignUpModel)
    .finally(() => (loading.value = false))
  if (isAxiosError(response)) {
    const errorData = response.response?.data as ErrorResponseData
    if (errorData.detail) {
      errors.value.push(errorData.detail)
    }
    return
  }
  registered.value = true
  emit('submit')
}
</script>

<style scoped></style>
