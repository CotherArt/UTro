<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card flex justify-content-center">
    <Dialog
      :visible="prop.visible"
      :closable="false"
      :header="title"
      :class="prop.class"
      :style="{ width: getSize(prop.size) }"
    >
      <template #header>
        <h3 class="text-center w-full m-0">{{ prop.title }}</h3>
      </template>
      <div class="container flex flex-column gap-4">
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import type { PropType } from 'vue'

type sizeType = 'small' | 'medium' | 'large' | 'full'

const prop = defineProps({
  visible: {
    required: true,
    type: Boolean
  },
  title: {
    type: String
  },
  class: {
    type: String
  },
  size: {
    type: String as PropType<sizeType>,
    default: 'medium'
  }
})

const emit = defineEmits<{
  close: []
}>()

const sizes = {
  small: '20rem',
  medium: '30rem',
  large: '60rem',
  full: '95%'
}

const getSize = (type: sizeType) => {
  return sizes[type]
}
</script>
