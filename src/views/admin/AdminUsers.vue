<template>
  <div class="card">
    <DataTable size="small" stripedRows :value="usersStore.users" tableStyle="min-width: 50rem">
      <Column field="_id" header="ID"></Column>
      <Column field="username" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.authentication.role"
            :severity="getSeverity(slotProps.data)"
          />
        </template>
      </Column>
      <Column header="Action" :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            label="✏️"
            size="small"
            outlined
            rounded
            class="mr-2"
            @click="editUser(slotProps.data)"
          />
          <Button
            label="🗑️"
            size="small"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteUser(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { ref, onMounted } from 'vue'

import { useUsersStore } from '@/stores/users'
import type { UserType } from '@/models/user'

const usersStore = useUsersStore()
const products = ref()

const getSeverity = (user: UserType) => {
  switch (user.authentication.role) {
    case 'Administrator':
      return 'success'

    case 'User':
      return 'info'

    case 'Guest':
      return 'danger'
    case 'Moderator':
      return 'danger'
    default:
      return 'info'
  }
}

const editUser = (data: UserType) => {}
const confirmDeleteUser = (data: UserType) => {}

onMounted(() => {
  usersStore.getUsers()
  products.value = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }
  ]
})
</script>

<style scoped></style>
