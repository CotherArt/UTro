<template>
  <div class="flex gap-1">
    <div class="w-12rem bg-purple-800 border-round p-1">sidemenu</div>
    <div class="w-full bg-purple-900 border-round p-1">
      <h2 class="m-0">Foto</h2>
      <img v-if="avatarImage" :src="avatarImage" class="w-5rem border-circle" alt="uploaded img" />
      <img
        v-else-if="authStore.avatarImage"
        :src="authStore.avatarImage"
        class="w-5rem border-circle"
        alt="current img"
      />
      <div v-else class="w-5rem h-5rem border-circle bg-primary-reverse mb-1"></div>
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
        <Button label="Upload" @click="setImage()" :disabled="uploadDisabled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// primevue
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { toastError } from '@/services/toast'
// store
import { useAuthStore } from '@/stores/auth'

const MAX_FILE_SIZE_IN_BYTES = 72464 //71 kilobytes

const authStore = useAuthStore()

const avatarImage = ref()
const uploadDisabled = ref(true)

const handleUpload = async (event: { files: any[] }) => {
  try {
    const file = event.files[0]

    if (file.size > MAX_FILE_SIZE_IN_BYTES) {
      toastError('File size exceeds the limit. Please upload a smaller file.')
      handleClear()
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
      const img = new Image()
      img.src = reader.result as string

      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          // Handle the case where getContext returns null
          toastError('Could not create canvas context')
          return
        }

        // Set the target dimensions
        const targetSize = 80

        // Determine the square size
        const squareSize = Math.min(img.width, img.height)

        // Calculate the position to crop the image
        const offsetX = (img.width - squareSize) / 2
        const offsetY = (img.height - squareSize) / 2

        // Set canvas size to target size
        canvas.width = targetSize
        canvas.height = targetSize

        // Draw the image cropped to the square on the canvas
        ctx.drawImage(img, offsetX, offsetY, squareSize, squareSize, 0, 0, targetSize, targetSize)

        // Get the cropped image as a data URL
        const base64data = canvas.toDataURL('image/png')

        avatarImage.value = base64data
        uploadDisabled.value = false
      }
    }
  } catch (error) {
    toastError('Error trying to upload file, please try again')
  }
}

const handleClear = async () => {
  avatarImage.value = ''
  uploadDisabled.value = true
}

async function setImage() {
  if (avatarImage.value) {
    await authStore.updateProfileImg(avatarImage.value)
  }
}
</script>

<style scoped></style>
