<template>
  <form @submit.prevent="handleSubmit" class="sm:w-28rem w-full my-2">
    <Card>
      <template #header>
        <div class="relative">
          <div class="overflow-hidden border-round-top">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style="object-fit: cover; filter: blur(6px); transform: scale(1.1)"
              class="w-full h-6rem"
              alt=""
            />
          </div>
          <h1 class="text-center w-full absolute m-10 p-0 top-0">Sign in</h1>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column justify-content-center gap-4">
          <div class="flex flex-column gap-2">
            <label for="username">Username</label>
            <InputText
              id="username"
              name="username"
              v-model="values.username"
              aria-describedby="username-help"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Password</label>
            <Password
              id="password"
              name="password"
              input-class="w-full"
              v-model="values.password"
              aria-describedby="username-help"
            />
          </div>
          <div class="flex align-items-center">
            <Checkbox id="remember" v-model="remember" />
            <label for="remember" class="ml-2">Remember me</label>
          </div>
        </div>
      </template>
      <template #footer>
        <Button label="Sign in" type="submit" class="w-full" />
      </template>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputText'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

const values = ref<{ username: string; password: string }>({
  username: '',
  password: ''
})
const remember = ref<boolean>(false)

function handleSubmit() {
  console.log(values.value)
}
</script>

<style scoped></style>
