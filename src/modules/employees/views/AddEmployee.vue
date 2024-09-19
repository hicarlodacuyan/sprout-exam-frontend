<template>
    <h2>Add Employee</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="type_of_employee">Type of Employee:</label>
        <select v-model="typeOfEmployee" id="type_of_employee" @change="onTypeChange">
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

      <button type="submit">Add Employee</button>
    </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { createEmployee } from "../services/employeeService.ts"
  import { useRouter } from 'vue-router'
  import type { RegularEmployee, ContractualEmployee } from '../models/Employee.ts'

  const typeOfEmployee = ref<string>('')
  const employee = ref<Employee>({})
  const router = useRouter()

  const onTypeChange = () => {
    employee.value = typeOfEmployee.value === 'regular'
      ? {} as RegularEmployee
      : {} as ContractualEmployee
  }

  const onSubmit = async () => {
    try {
      const data = await createEmployee(typeOfEmployee.value, employee.value)
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to add employee', error)
    }
  }
</script>
