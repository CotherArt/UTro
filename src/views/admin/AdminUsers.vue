<template>
  <div class="card">
    <Button label="New User" @click="modalNewVisible = true" :disabled="true"></Button>
    <DataTable size="small" stripedRows :value="usersStore.users" tableStyle="min-width: 50rem">
      <Column field="_id" header="ID"></Column>
      <Column field="username" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column header="Role">
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
            @click="handleEditUser(slotProps.data)"
          />
          <Button
            label="🗑️"
            size="small"
            outlined
            rounded
            severity="danger"
            @click="handleDelete(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Modal
    :visible="modalEditVisible"
    title="Edit User"
    @close="modalEditVisible = false"
    size="small"
  >
    <UserForm
      :initialValues="selectedRow"
      @cancel="modalEditVisible = false"
      @submit="modalEditVisible = false"
    />
  </Modal>
  <Modal
    :visible="modalDeleteVisible"
    title="Delete User"
    @close="modalDeleteVisible = false"
    size="small"
  >
    <p class="text-center">
      Are you sure to delete <span class="text-primary">{{ selectedRow.username }}</span> ?
    </p>
    <div class="flex gap-2 justify-content-center mt-4">
      <Button
        class="w-8rem"
        label="Delete"
        @click="confirmDeleteUser(selectedRow as UserType)"
        :loading="loadingDelete"
      />
      <Button
        class="w-8rem"
        label="Cancel"
        severity="danger"
        type="button"
        :disabled="loadingDelete"
        @click="modalDeleteVisible = false"
      />
    </div>
  </Modal>
  <Modal :visible="modalNewVisible" title="New User" @close="modalNewVisible = false" size="small">
    <NewUserForm />
  </Modal>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from '@/components/custom/Button.vue'
import Tag from 'primevue/tag'
import Modal from '@/components/custom/Modal.vue'
import NewUserForm from '@/components/forms/admin/NewUserForm.vue'
import { ref, onMounted } from 'vue'

import { useUsersStore } from '@/stores/users'
import type { UserType } from '@/models/user'
import UserForm from '@/components/forms/admin/UserForm.vue'

const usersStore = useUsersStore()
const products = ref()

const modalEditVisible = ref(false)
const modalDeleteVisible = ref(false)
const modalNewVisible = ref(false)
const loadingDelete = ref(false)
const selectedRow = ref()

const getSeverity = (user: UserType) => {
  switch (user.authentication.role) {
    case 'Administrator':
      return 'success'
    case 'User':
      return 'contrast'
    case 'Guest':
      return 'danger'
    case 'Moderator':
      return 'warning'
    default:
      return 'info'
  }
}

const handleEditUser = async (data: UserType) => {
  modalEditVisible.value = true
  selectedRow.value = data
}
const confirmDeleteUser = async (data: UserType) => {
  loadingDelete.value = true
  await usersStore.deleteUser(data._id)
  loadingDelete.value = false
  modalDeleteVisible.value = false
}
const handleDelete = (data: UserType) => {
  modalDeleteVisible.value = true
  selectedRow.value = data
}

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
