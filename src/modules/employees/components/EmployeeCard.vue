<template>
  <div class="employee-card">
    <h3>{{ employee.first_name }} {{ employee.last_name }}</h3>
    <p>Email: {{ employee.email }}</p>

    <!-- Show additional fields based on employee type -->
    <div v-if="employee.number_of_leaves !== undefined">
      <p>Number of Leaves: {{ employee.number_of_leaves }}</p>
      <p>Benefits: {{ employee.benefits }}</p>
    </div>

    <div v-if="employee.contract_end_date !== undefined">
      <p>Contract End Date: {{ employee.contract_end_date }}</p>
      <p>Project: {{ employee.project }}</p>
    </div>

    <button @click="viewEmployee">View</button>
    <button @click="editEmployee">Edit</button>
    <button @click="deleteEmployeeHandler">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { Employee } from '../models/Employee.ts'
import { deleteEmployee } from '../services/employeeService.ts'

const props = defineProps<{
  employee: Employee
}>()

const emit = defineEmits<{
  (event: 'delete'): void
}>()

const router = useRouter()

const viewEmployee = () => {
  router.push({
    name: 'employee-view',
    params: { id: props.employee.id },
  })
}

const editEmployee = () => {
  router.push(`/edit-employee/${props.employee.id}`)
}

const deleteEmployeeHandler = async () => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      await deleteEmployee(props.employee.id, props.employee)
      emit('delete')
    } catch (error) {
      console.error('Failed to delete employee:', error)
    }
  }
}
</script>

<style scoped>
.employee-card {
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 8px;
  margin: 1em 0;
}
</style>

