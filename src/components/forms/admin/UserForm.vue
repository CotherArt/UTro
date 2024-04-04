<template>
  <div>
    <Form :initial-values="initialValues" @submit="handleSubmit" :validation-schema="schema">
      <InputText id="username" name="username" label="username:" />
      <InputText id="email" name="email" label="email:" />
      <Dropdown
        id="authentication.role"
        name="authentication.role"
        :options="roles"
        placeholder="Select a Role"
        label="Role:"
        checkmark
      />
      <div class="flex gap-2 justify-content-end mt-4">
        <Button class="w-8rem" label="Save" type="submit" :loading="loading" />
        <Button
          class="w-8rem"
          label="Cancel"
          severity="danger"
          type="button"
          @click="handleCancel"
        />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//custom componets
import Button from '@/components/custom/Button.vue'
import InputText from '@/components/custom/InputText.vue'
import Dropdown from '@/components/custom/Dropdown.vue'
// validation
import * as yup from 'yup'
import { Form } from 'vee-validate'
// stores
import { useUsersStore } from '@/stores/users'
import type { UserType } from '@/models/user'
const usersStore = useUsersStore()
// models
const emit = defineEmits<{
  cancel: []
  submit: []
}>()

const prop = defineProps({
  initialValues: {
    required: true,
    type: Object
  }
})

const loading = ref<boolean>(false)

const roles = ref(['Administrator', 'User', 'Guest', 'Moderator'])

// TODO: add schema
const schema = yup.object({
  username: yup.string().required().min(5),
  email: yup.string().email().required()
})

async function handleSubmit(values: Object) {
  loading.value = true
  await usersStore.updateUser(values as UserType)
  loading.value = false
  emit('submit')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped></style>
