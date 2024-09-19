<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { login } from '../services/authService.ts'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const router = useRouter()

  const onLogin = async () => {
    try {
      const { access_token } = await login(username.value, password.value)
      localStorage.setItem('token', access_token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
    }
  }
</script>
