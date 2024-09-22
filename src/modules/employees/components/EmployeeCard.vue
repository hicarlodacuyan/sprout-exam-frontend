<template>
  <div>
    <Card>
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
      <CardFooter class="flex gap-4">
        <Button type="button" variant="outline" @click="viewEmployee">
          <Eye />
        </Button>
        <Button type="button" variant="outline" @click="editEmployee">
          <Pencil />
        </Button>
        <Button type="button" variant="outline" @click="deleteEmployeeHandler">
          <Trash />
        </Button>
      </CardFooter>
    </Card>   
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import type { Employee } from '../models/Employee.ts'
import { deleteEmployee } from '../services/employeeService.ts'
import { Button } from '@/core/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
import { Eye, Pencil, Trash } from 'lucide-vue-next';

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
