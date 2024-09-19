<template>
  <h2>Edit Employee</h2>

  <!-- Render form only when employee data is loaded -->
  <div v-if="employee">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="type_of_employee">Type of Employee:</label>
        <select v-model="typeOfEmployee" id="type_of_employee" :disabled="true">
          <option value="">Select Type</option>
          <option value="regular">Regular</option>
          <option value="contractual">Contractual</option>
        </select>
      </div>

      <!-- Regular Employee Form -->
      <div v-if="typeOfEmployee === 'regular'">
        <input v-model="employee.first_name" placeholder="First Name" required />
        <input v-model="employee.last_name" placeholder="Last Name" required />
        <input v-model="employee.email" placeholder="Email" type="email" required />
        <input v-model.number="employee.number_of_leaves" placeholder="Number of Leaves" type="number" required />
        <input v-model="employee.benefits" placeholder="Benefits" required />
      </div>

      <!-- Contractual Employee Form -->
      <div v-if="typeOfEmployee === 'contractual'">
        <input v-model="employee.first_name" placeholder="First Name" required />
        <input v-model="employee.last_name" placeholder="Last Name" required />
        <input v-model="employee.email" placeholder="Email" type="email" required />
        <input v-model="employee.contract_end_date" placeholder="Contract End Date" type="date" required />
        <input v-model="employee.project" placeholder="Project" required />
      </div>

      <button type="submit">Update Employee</button>
    </form>
  </div>

  <!-- Show a loading message or spinner while fetching data -->
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getEmployee, updateEmployee } from '../services/employeeService.ts'
  import type { RegularEmployee, ContractualEmployee } from '../models/Employee.ts'

  const route = useRoute()
  const router = useRouter()

  const typeOfEmployee = ref<string>('')
  const employee = ref<RegularEmployee | ContractualEmployee | null>(null)

  const fetchEmployee = async () => {
    const employeeId = route.params.id as string
    try {
      const data = await getEmployee(employeeId)
      employee.value = data
      console.log(data)
      // Determine the type of employee based on the fields
      if (data.number_of_leaves !== undefined) {
        typeOfEmployee.value = 'regular'
      } else if (data.contract_end_date !== undefined) {
        typeOfEmployee.value = 'contractual'
      }
    } catch (error) {
      console.error('Failed to fetch employee', error)
    }
  }

  const onSubmit = async () => {
    try {
      await updateEmployee(employee.value!.id, typeOfEmployee.value, employee.value!)
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to update employee', error)
    }
  }

  onMounted(fetchEmployee)
</script>

