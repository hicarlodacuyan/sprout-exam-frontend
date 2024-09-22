<template>
  <Card v-if="employee" class="m-4">
    <CardHeader>
      <CardTitle>{{ employee.first_name }} {{ employee.last_name }}</CardTitle>
      <CardDescription>Email: {{ employee.email }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="employee.number_of_leaves !== undefined">
        <p>Number of Leaves: {{ employee.number_of_leaves }}</p>
        <p>Benefits: {{ employee.benefits }}</p>
      </div>

      <div v-if="employee.contract_end_date !== undefined">
        <p>Contract End Date: {{ employee.contract_end_date }}</p>
        <p>Project: {{ employee.project }}</p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getEmployee } from '../services/employeeService.ts'
  import type { Employee } from '../models/Employee.ts'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/core/components/ui/card'

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
