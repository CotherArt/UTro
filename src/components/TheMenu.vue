<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img
          src="../assets/icons/vapor.svg"
          class="cursor-pointer w-3rem text-white mx-2"
          @click="$router.push({ name: 'home' })"
        />
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
          <div v-if="logged" class="flex justify-content-center">
            <Avatar v-if="user.avatarImage" :image="user.avatarImage" shape="circle" />
            <Avatar v-else icon="pi pi-user" shape="circle" />
          </div>
          <div v-else class="flex gap-2">
            <Button
              severity="secondary"
              @click="router.push({ name: 'registrarse' })"
              label="Registrarse"
            />
            <Button @click="router.push({ name: 'iniciar-sesion' })" label="Iniciar Sesión" />
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
//vue
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
//stores
import { userStore } from '@/stores/user'
import { authenticationStore } from '@/stores/authentication'
//components
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

const user = userStore()
const authStore = authenticationStore()
const logged = ref<boolean>(false)

const router = useRouter()
const items = ref([
  {
    label: 'TIENDA',
    items: [
      {
        label: 'Inicio',
        command: () => router.push({ name: 'home' })
      },
      {
        label: 'Lista de deseados',
        command: () => router.push({ name: 'wishlist' })
      }
    ]
  },
  {
    label: 'MAPA DE SITIO',
    command: () => router.push({ name: 'map' })
  },
  {
    label: 'CONTACTO',
    command: () => router.push({ name: 'contact' })
  }
])

onMounted(() => {})

onBeforeMount(async () => {
  logged.value = await authStore.validateToken()
})
</script>

<style scoped></style>
