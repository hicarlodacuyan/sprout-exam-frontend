<template>
  <div>
    <h1>Login your account</h1>
    <form @submit.prevent="onLogin">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
      <router-link to="/register">Don't have an account? Register here</router-link>
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

<style scoped>
  div {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;
  }

  input {
    padding: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    form {
      width: 50%;
      margin: 0 auto;
    }
  }

  @media (min-width: 1024px) {
    form {
      width: 30%;
    }
  }
</style>
