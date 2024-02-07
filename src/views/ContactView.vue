<template>
  <div class="w-full flex justify-content-center">
    <Card class="w-5">
      <template #content>
        <div class="flex flex-column gap-2">
          <label for="username">Nombre:</label>
          <InputText id="username" v-model="value" aria-describedby="username-help" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Correo:</label>
          <InputText id="username" v-model="value" aria-describedby="username-help" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="username">Mensaje:</label>
          <Textarea v-model="value" rows="5" cols="30" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const value = ref('')
</script>

<style scoped></style>
