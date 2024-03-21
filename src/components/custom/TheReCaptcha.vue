<script setup lang="ts">
import { RecaptchaV2 } from 'vue3-recaptcha-v2'
import { useField } from 'vee-validate'

const props = defineProps({
  name: String
})

const handleWidgetId = () => {}
const handleErrorCalback = () => {
  setValue('')
}
const handleExpiredCallback = () => {
  setValue('')
}
const handleLoadCallback = (response: unknown) => {
  setValue(response as string)
}

const { setValue, errorMessage } = useField<string>(() => props.name || '')
</script>

<template>
  <div class="flex flex-column my-2">
    <RecaptchaV2
      :name="name"
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCalback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
    <small :id="`${name}-help`" class="text-red-200" v-if="!!errorMessage">
      🥵{{ errorMessage }}
    </small>
  </div>
</template>
