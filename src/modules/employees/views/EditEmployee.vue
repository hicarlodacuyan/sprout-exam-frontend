<template>
  <!-- Render form only when employee data is loaded -->
  <div class="m-4" v-if="employee">
    <Card>
      <CardHeader>
        <CardTitle>Edit Employee</CardTitle>
        <CardDescription>Modify the details of the employee</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="flex flex-col gap-4">
          <!-- Employee Type (Disabled) -->
          <FormField v-slot="{ componentField }" name="type_of_employee">
            <FormItem>
              <FormLabel for="type_of_employee">Type of Employee</FormLabel>
              <FormControl>
                <Select v-bind="componentField" v-model="form.values.type_of_employee" id="type_of_employee" :disabled="true">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup label="Employee Type">
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="contractual">Contractual</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Regular Employee Form -->
          <template v-if="form.values.type_of_employee === 'regular'">
            <FormField v-slot="{ componentField }" name="first_name">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="last_name">
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="number_of_leaves">
              <FormItem>
                <FormLabel>Number of Leaves</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" type="number" placeholder="Number of Leaves" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="benefits">
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Benefits" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <!-- Contractual Employee Form -->
          <template v-if="form.values.type_of_employee === 'contractual'">
            <FormField v-slot="{ componentField }" name="first_name">
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="last_name">
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="contract_end_date">
              <FormItem>
                <FormLabel>Contract End Date</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" type="date" placeholder="Contract End Date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="project">
              <FormItem>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Project" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </template>

          <!-- Submit Button -->
          <Button type="submit">Update Employee</Button>
        </form>
      </CardContent>
    </Card>
  </div>

  <!-- Loading state -->
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'
  import { getEmployee, updateEmployee } from '../services/employeeService.ts'
  import { Button } from '@/core/components/ui/button'
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
  } from '@/core/components/ui/card'
  import {
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage
  } from '@/core/components/ui/form'
  import { Input } from '@/core/components/ui/input'
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/core/components/ui/select'

  // Zod schema for validation
  const employeeSchema = toTypedSchema(z.object({
    type_of_employee: z.enum(['regular', 'contractual']),
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format'),
    number_of_leaves: z.number().optional(),
    benefits: z.string().optional(),
    contract_end_date: z.string().optional(),
    project: z.string().optional(),
  }))

  const router = useRouter()
  const route = useRoute()
  const employee = ref(null)

  const form = useForm({
    validationSchema: employeeSchema,
    initialValues: {
      type_of_employee: '',
      first_name: '',
      last_name: '',
      email: '',
      number_of_leaves: undefined,
      benefits: '',
      contract_end_date: '',
      project: ''
    }
  })

  const fetchEmployee = async () => {
    const employeeId = route.params.id as string
    try {
      const data = await getEmployee(employeeId)
      employee.value = data
      form.setValues({
        ...data,
        type_of_employee: data.number_of_leaves !== undefined ? 'regular' : 'contractual',
      })
    } catch (error) {
      console.error('Failed to fetch employee', error)
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await updateEmployee(route.params.id, values.type_of_employee, values)
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to update employee', error)
    }
  })

  onMounted(fetchEmployee)
</script>

