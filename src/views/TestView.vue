<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-column gap-2">
    <InputText name="firstName" label="First Name:" />
    <InputText name="lastName" label="Last Name:" />
    <InputText name="email" label="Email:" />
    <InputText name="password" type="password" label="Password" />
    <InputText name="passwordConfirm" type="password" label="Password Confirm:" />
    <Button label="Submit" type="submit"></Button>
  </Form>

  <SimpleForm :inputArray="inputs" :validationSchema="schema" />

  <Button label="toast" @click="handleToastClick"></Button>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { Form } from 'vee-validate'
import InputText from '@/components/custom/InputText.vue'
import Button from '@/components/custom/Button.vue'
import SimpleForm from '@/components/custom/SimpleForm.vue'

import type { InputTextInterface } from '@/components/custom/SimpleForm.vue'
import { toastError, toastInfo, toastSuccess, toastWarn } from '@/services/toast'

const inputs: InputTextInterface[] = [
  {
    id: 'first-name',
    name: 'firstName',
    label: 'First Name:',
    type: 'text',
    placeholder: 'first name 🤖'
  }
]

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirm: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref('password')])
})

const onSubmit = (values: object) => {
  alert(JSON.stringify(values, null, 2))
}

const handleToastClick = () => {
  toastInfo('tremendo  canaya 🐛')
  toastError('tremendo mamawebaso 🐛')
  toastSuccess('tremendo mamawebaso 🐛')
  toastWarn('tremendo mamawebaso 🐛')
}
</script>
