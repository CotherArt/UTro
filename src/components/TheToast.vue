<template>
  <Toast ref="toast" position="top-right">
    <template #container="{ message, closeCallback }">
      <div class="flex w-full justify-content-between align-items-center p-1 text-sm">
        <div class="flex gap-2 align-items-center">
          <div class="">{{ getIcon(message.severity) }}</div>
          <div class="">{{ message.detail }}</div>
        </div>
        <Button icon="pi pi-times" text class="text-gray-900" @click="closeCallback"></Button>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
// primevue
import Toast from 'primevue/toast'
import Button from 'primevue/button'

type emojiType = 'info' | 'error' | 'success' | 'warn' | 'default'

const getIcon = (name: emojiType) => {
  const emojiObj = {
    info: '🤓',
    error: '😡',
    success: '😃',
    warn: '😧',
    default: '🐛'
  }
  return emojiObj[name] || emojiObj['default']
}
</script>

<style scoped>
.p-toast-message-content {
  align-items: center !important;
}
</style>
