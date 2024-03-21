<template>
  <div class="flex flex-column">
    <label v-if="label" :for="name" class="pl-1">{{ label }}</label>
    <InputText
      :id="id || name"
      :name="name"
      v-model="value"
      :type="type || 'text'"
      :aria-describedby="`${name}-help`"
      size="small"
      :invalid="!!errorMessage"
      class="border-round-3xl"
      v-bind="$attrs"
    />
    <small :id="`${name}-help`" class="text-red-200" v-if="!!errorMessage">
      🥵{{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import InputText from 'primevue/inputtext'

const props = defineProps({
  id: String,
  name: String,
  label: {
    type: String,
    required: false,
    default: ''
  },
  type: String,
  placeholder: {
    type: String,
    required: false
  }
})

const { value, errorMessage } = useField<string>(() => props.name || '')
</script>
