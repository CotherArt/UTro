<template>
  <Breadcrumb :home="home" :model="crumbs" class="text-sm p-1 px-2 bg-transparent border-0">
    <template #item="{ item }">
      <span
        class="cursor-pointer text-blue-200 text-sm"
        :class="item.icon"
        @click="$router.push(item.route)"
      >
        {{ item.label }}
      </span>
    </template>
    <template #separator> {{ crumbs.length === 0 ? '' : '💠' }} </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()
const crumbs = computed(() => craftBread())

function craftBread() {
  const routes = route.path.split('/')

  const rutaslocas = []
  for (let i = 2; i <= routes.length; i++) {
    rutaslocas.push({
      label: routes[i - 1],
      route: '/' + routes.slice(1, i).join('/')
    })
  }
  return rutaslocas
}

const home = ref({
  icon: 'pi pi-home',
  route: '/'
})

console.log(crumbs.value)
</script>

<style scoped></style>
