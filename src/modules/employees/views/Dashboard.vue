<template>
  <div>
    <h1>Employee Dashboard</h1>
    <router-link to="/add-employee">Add Employee</router-link>
    <button @click="logoutEmployee">Logout</button>
    <ul>
      <li v-for="employee in employees" :key="employee.id">
        <EmployeeCard 
          :employee="employee"
          @delete="fetchEmployees"
        />
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getEmployees } from '../services/employeeService.ts'
  import { logout } from '../../auth/services/authService.ts'
  import type { Employee } from '../models/Employee.ts'
  import EmployeeCard from '../components/EmployeeCard.vue'

  const employees = ref<Employee[]>([])
  const router = useRouter()

  const fetchEmployees = async () => {
    const data = await getEmployees()
    employees.value = data 
  }

  const logoutEmployee = async () => {
    try {
      await logout()
      router.push('/login')     
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  onMounted(fetchEmployees)
</script>
