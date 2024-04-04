<template>
  <div class="flex gap-1">
    <div class="w-12rem bg-purple-800 border-round p-1">sidemenu</div>
    <div class="w-full bg-purple-900 border-round p-1">
      <h2 class="m-0">Foto</h2>
      <img v-if="avatarImage" :src="avatarImage" class="w-5rem border-circle" alt="avatar img" />
      <img v-else :src="authStore.avatarImage" class="w-5rem border-circle" alt="avatar img" />
      <div class="flex gap-1 webo">
        <FileUpload
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          customUpload
          @select="handleUpload"
          @clear="handleClear"
        />
        <Button label="Upload" @click="setImage()" :disabled="!avatarImage" />
      </div>

      <div>
        <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-column gap-2">
          <InputText name="firstName" label="First Name:" />
          <InputText name="lastName" label="Last Name:" />
          <InputText name="email" label="Email:" />
          <InputText name="password" type="password" label="Password" />
          <InputText name="peso" type="text" label="Peso" />
          <InputText name="passwordConfirm" type="password" label="Password Confirm:" />
          <Button label="Submit" type="submit"></Button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// primevue
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { toastError, toastSuccess } from '@/services/toast'
import InputText from '@/components/custom/InputText.vue'
import * as yup from 'yup'
import { Form } from 'vee-validate'
// store
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const avatarImage = ref()

const handleUpload = async (event: any) => {
  try {
    const file = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(file.objectURL).then((r) => r.blob()) //blob:url

    reader.readAsDataURL(blob)

    reader.onloadend = function () {
      const base64data = reader.result
      console.log(base64data)
      avatarImage.value = base64data
    }
  } catch (error) {
    toastError('Error trying to upload file, please try again')
  }
}

const handleClear = async () => {
  avatarImage.value = null
}

async function setImage() {
  //TODO: upload the image bia endpoint
  toastSuccess('Avatar image updated')
}

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  passwordConfirm: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref('password')]),
    peso: yup.number().max(500)
})

const onSubmit = (values: object) => {
  alert(JSON.stringify(values, null, 2))
}
</script>

<style scoped>
.webo{
  margin-bottom: 4rem;
}
</style>
