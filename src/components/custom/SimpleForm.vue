<template>
  <Form
    @submit="onSubmit"
    :validation-schema="props.validationSchema"
    class="flex flex-column gap-2"
  >
    <div v-for="input in props.inputArray" :key="input.id">
      <InputText v-bind="input" />
    </div>
    <Button label="Submit" type="submit"></Button>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import InputText from '@/components/custom/InputText.vue'
import Button from '@/components/custom/Button.vue'

export interface InputTextInterface {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
}

interface Props {
  inputArray: InputTextInterface[]
  validationSchema: object
}

const props = defineProps<Props>()

const onSubmit = (values: any) => {
  console.log(values)
  alert(JSON.stringify(values, null, 2))
}
</script>
