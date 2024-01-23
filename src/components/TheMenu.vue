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
          <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'

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
  }
])
</script>

<style scoped></style>
