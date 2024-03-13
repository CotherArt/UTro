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
          <InputText
            placeholder="Search"
            type="text"
            class="w-8rem sm:w-auto"
            :value="searchValue"
          />
          <Button @click="search" label="search" icon="pi pi-search" />
          <Avatar
            v-if="authStore.user"
            :image="authStore.avatarImage"
            shape="circle"
            @click="toggle"
          />
          <Avatar v-else icon="pi pi-user" shape="circle" @click="toggle" />
        </div>
      </template>
    </Menubar>
    <Menu ref="userMenu" id="overlay_menu" :model="userMenuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
//vue
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
//stores
import { useAuthStore } from '@/stores/auth'
import { useSteamStore } from '@/stores/steam'
//components
import type { MenuItem } from 'primevue/menuitem'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Button from 'primevue/button'

const authStore = useAuthStore()
const steamStore = useSteamStore()

const searchValue = ref()

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
    label: 'CONTACT',
    command: () => router.push({ name: 'contact' })
  },
  {
    label: 'MAPA DE SITIO',
    command: () => router.push({ name: 'map' })
  }
])

const loggedItems: MenuItem[] = [
  {
    label: 'Mi Perfil',
    icon: 'pi pi-user',
    command: () => router.push({ name: 'settings' })
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => logOutHandler()
  }
]

const offlineItems: MenuItem[] = [
  {
    label: 'Iniciar sesión',
    icon: 'pi pi-sign-in',
    command: () => router.push({ name: 'login' })
  },
  {
    label: 'Registrarse',
    icon: 'pi pi-user-edit',
    command: () => router.push({ name: 'register' })
  }
]

async function search() {
  const response = await steamStore.getGamesByName(searchValue.value)
  console.log(response)
}

const userMenu = ref()
const userMenuItems = computed(() => {
  let items: MenuItem[] = []
  if (authStore.user) {
    items.push(...loggedItems)
  } else {
    items.push(...offlineItems)
  }
  return items
})

const toggle = (event: Event) => {
  userMenu.value.toggle(event)
}
const logOutHandler = () => {
  authStore.logOut()
  router.push('/')
  window.location.reload()
}
</script>

<style scoped></style>
