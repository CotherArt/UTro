<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img
          width="120px"
          src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016"
          class="cursor-pointer"
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
          <div v-else>
            <Button @click="router.push({ name: 'login' })">Login</Button>
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
    label: 'LOGIN',
    command: () => router.push({ name: 'login' })
  },
  {
    label: 'STORE',
    items: [
      {
        label: 'Home',
        command: () => router.push({ name: 'home' })
      },
      {
        label: 'Discovery Queue'
      },
      {
        label: 'Wishlist'
      },
      {
        label: 'Points Shop'
      },
      {
        label: 'News'
      },
      {
        label: 'Stats'
      }
    ]
  },
  {
    label: 'COMMUNITY',
    items: [
      {
        label: 'Home',
        command: () => router.push({ name: 'community' })
      },
      {
        label: 'Discussions'
      },
      {
        label: 'Workshop'
      },
      {
        label: 'Market'
      },
      {
        label: 'Broadcast'
      }
    ]
  },
  {
    label: 'ABOUT',
    command: () => router.push({ name: 'about' })
  },
  {
    label: 'SUPPORT',
    command: () => router.push({ name: 'support' })
  },
  {
    label: 'TEST',
    command: () => router.push({ name: 'test' }),
    items: [
      {
        label: 'SUB TEST',
        command: () => router.push({ name: 'sub test' })
      }
    ]
  },
  {
    label: 'SITE MAP',
    command: () => router.push({ name: 'map' })
  }
])

onMounted(() => {})

onBeforeMount(async () => {
  logged.value = await authStore.validateToken()
})
</script>

<style scoped></style>
