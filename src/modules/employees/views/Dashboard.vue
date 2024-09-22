<template>
  <div class="m-4 flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Employee Dashboard</h1>
      <Button type="button" variant="destructive" @click="logoutEmployee">
        <LogOut />
      </Button>
    </div>
    <div>
      <div>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <li v-for="employee in employees" :key="employee.id">
            <EmployeeCard 
              :employee="employee"
              @delete="fetchEmployees"
            />
          </li>
        </ul>
      </div>
    </div>
    <router-link to="/add-employee" class="fixed bottom-4 right-4">
      <Button type="button" icon-only variant="primary" class="rounded-full w-14 h-14 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-700">
        <Plus />
      </Button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getEmployees } from '../services/employeeService.ts'
  import { logout } from '../../auth/services/authService.ts'
  import type { Employee } from '../models/Employee.ts'
  import EmployeeCard from '../components/EmployeeCard.vue'
  import { Button } from '@/core/components/ui/button'
  import { Trash, Plus, LogOut } from 'lucide-vue-next'

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
