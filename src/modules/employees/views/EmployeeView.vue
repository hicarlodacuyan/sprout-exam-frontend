<template>
  <div v-if="employee">
    <h1>{{ employee.first_name }} {{ employee.last_name }}</h1>
    <p>Email: {{ employee.email }}</p>

    <div v-if="employee.number_of_leaves !== undefined">
      <p>Number of Leaves: {{ employee.number_of_leaves }}</p>
      <p>Benefits: {{ employee.benefits }}</p>
    </div>

    <div v-if="employee.contract_end_date !== undefined">
      <p>Contract End Date: {{ employee.contract_end_date }}</p>
      <p>Project: {{ employee.project }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getEmployee } from '../services/employeeService.ts'
  import type { Employee } from '../models/Employee.ts'

  const route = useRoute()
  const employeeId = route.params.id as string
  const employee = ref<Employee | null>(null)

  const fetchEmployee = async () => {
    if (employeeId) {
      try {
        employee.value = await getEmployee(employeeId)
      } catch (error) {
        console.error('Failed to fetch employee:', error)
      }
    }
  }

  onMounted(fetchEmployee)
</script>

<style scoped>
  /* make the div look like a card */
  div {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem;
  }

  @media (min-width: 768px) {
    div {
      width: 50%;
      margin: 1rem auto;
    }
  }
</style>

