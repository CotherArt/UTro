<template>
  <OrganizationChart v-model:selectionKeys="selection" :value="data" collapsible>
    <template #person="slotProps">
      <div class="flex flex-column cursor-pointer" @click="slotProps.node.data.command">
        <div class="flex flex-column align-items-center">
          <img
            :alt="slotProps.node.data.name"
            :src="slotProps.node.data.image"
            class="mb-3 w-3rem h-3rem"
          />
          <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
          <v-icon icon="md:home"></v-icon>
          <span>{{ slotProps.node.data.title }}</span>
        </div>
      </div>
    </template>
    <template #default="slotProps">
      <span>{{ slotProps.node.label }}</span>
    </template>
  </OrganizationChart>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OrganizationChart from 'primevue/organizationchart'
import 'primeicons/primeicons.css'

const router = useRouter()

const data = ref({
  key: '0',
  type: 'person',
  data: {
    image: 'https://cdn-icons-png.freepik.com/512/5188/5188738.png?ga=GA1.1.2013646664.1706826289',
    name: 'INICIO'
  },
  children: [
    {
      key: '0_0',
      type: 'person',
      data: {
        image:
          'https://cdn-icons-png.freepik.com/512/1179/1179601.png?ga=GA1.1.2013646664.1706826289&amp',
        name: 'TIENDA',
        command: () => {
          router.push({ name: 'home' })
        }
      },
      children: [
        {
          key: '0_0_0',
          label: 'HOME'
        },
        {
          key: '0_0_"1',
          label: 'LISTA DE DESEOS'
        }
      ]
    },
    {
      key: '0_1',
      type: 'person',
      data: {
        image:
          'https://cdn-icons-png.freepik.com/512/2508/2508493.png?ga=GA1.1.2013646664.1706826289&amp',
        name: 'MAPA DE SITIO',
        command: () => {
          router.push({ name: 'map' })
        }
      }
    },
    {
      key: '0_1',
      type: 'person',
      data: {
        image:
          'https://cdn-icons-png.freepik.com/512/1371/1371317.png?ga=GA1.1.2013646664.1706826289&amp',
        name: 'CONTACTO'
      }
    },
    {
      key: '0_1',
      type: 'person',
      data: {
        image:
          'https://cdn-icons-png.freepik.com/512/1650/1650276.png?ga=GA1.1.2013646664.1706826289&amp',
        name: 'REGISTRO',
        command: () => {
          router.push({ name: 'login' })
        }
      }
    }
  ]
})
const selection = ref({})
</script>
