<template>
  <div>
    <h1>Employee Dashboard</h1>
    <div class="employees-container">
      <router-link to="/add-employee" class="add-employee">Add Employee</router-link>
      <div class="employee-list">
        <ul>
          <li v-for="employee in employees" :key="employee.id">
            <EmployeeCard 
              :employee="employee"
              @delete="fetchEmployees"
            />
          </li>
        </ul>
      </div>
    <button @click="logoutEmployee">Logout</button>
  </div>
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

<style scoped>
  div {
    height: 100%;

    display: flex;
    flex-direction: column;

    padding: 1rem;
  }

  .employee-list {
    flex: 1;

    overflow-y: auto;
  }

  .add-employee {
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    align-self: flex-end;
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    padding: 0.5rem;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;

    align-self: flex-end;
  }

  @media (min-width: 768px) {
    .employee-list ul {
      display: flex;
      gap: 1em;
      flex-direction: row;
    }
  }
</style>
