<template>
  <div class="flex gap-1">
    <div class="w-12rem bg-purple-800 border-round p-1">sidemenu</div>
    <div class="w-full bg-purple-900 border-round p-1">
      <h2 class="m-0">Foto</h2>
      <img v-if="avatarImage" :src="avatarImage" class="w-5rem border-circle" alt="avatar img" />
      <img v-else :src="authStore.avatarImage" class="w-5rem border-circle" alt="avatar img" />
      <div class="flex gap-1">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// primevue
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { toastError, toastSuccess } from '@/services/toast'
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
</script>

<style scoped></style>
