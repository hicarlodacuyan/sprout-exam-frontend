<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="onRegister">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from '../services/authService'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const onRegister = async () => {
  try {
    await register(username.value, password.value)
    router.push('/login') 
  } catch (error) {
    console.error('Registration failed', error)
  }
}
</script>
