<script setup lang="ts">
import { RecaptchaV2 } from 'vue3-recaptcha-v2'

const handleWidgetId = (widgetId: number) => {
  console.log('Widget ID: ', widgetId)
}
const handleErrorCalback = () => {
  console.log('Error callback')
}
const handleExpiredCallback = () => {
  console.log('Expired callback')
}
const handleLoadCallback = (response: unknown) => {
  console.log('Load callback', response)
}
</script>

<template>
  <RecaptchaV2
    @widget-id="handleWidgetId"
    @error-callback="handleErrorCalback"
    @expired-callback="handleExpiredCallback"
    @load-callback="handleLoadCallback"
  />
</template>

<style>
#rc-anchor-alert {
  background-color: red !important;
}
</style>
