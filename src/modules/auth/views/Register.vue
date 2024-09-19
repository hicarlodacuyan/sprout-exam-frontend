<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="onRegister">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <router-link to="/login">Already have an account? Login here</router-link>
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
