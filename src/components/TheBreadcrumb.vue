<template>
  <Breadcrumb
    :home="home"
    :model="crumbs"
    :pt="{
      root: { class: 'surface-ground p-1 px-2 border-2' }
    }"
  >
    <template #item="{ item }">
      <span
        class="cursor-pointer text-red-500"
        :class="item.icon"
        @click="$router.push(item.route)"
      >
        {{ item.label }}
      </span>
    </template>
    <template #separator> / </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import { type MenuItem } from 'primevue/menuitem'
import { useRoute } from 'vue-router'

const route = useRoute()
const crumbs = computed<MenuItem[]>(() => craftBread())

function craftBread() {
  const routes = route.path.split('/')

  const rutaslocas: MenuItem[] = []
  for (let i = 2; i <= routes.length; i++) {
    rutaslocas.push({
      label: routes[i - 1],
      route: '/' + routes.slice(1, i).join('/')
    })
  }
  return rutaslocas
}

const props = defineProps({
  items: {
    type: Object as PropType<MenuItem[]>
  }
})

const home = ref({
  icon: 'pi pi-home',
  route: '/'
})
</script>

<style scoped></style>
