<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-column">
    <label v-if="label" :for="name" class="pl-1">{{ label }}</label>
    <Dropdown
      :id="id || name"
      :name="name"
      v-model="value"
      :options="options"
      :placeholder="placeholder"
      :aria-describedby="`${name}-help`"
      :invalid="!!errorMessage"
      class="border-round-3xl"
      checkmark
      v-bind="$attrs"
    />
    <small :id="`${name}-help`" class="text-red-200" v-if="!!errorMessage">
      🥵{{ errorMessage }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import Dropdown from 'primevue/dropdown'

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
  },
  options: {
    type: Array,
    required: true
  }
})

const { value, errorMessage } = useField<string>(() => props.name || '')
</script>
