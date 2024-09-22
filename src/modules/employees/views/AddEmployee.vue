<template>
  <div class="m-4">
    <Card>
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
        <CardDescription>Fill out the form to add a new employee</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="flex flex-col gap-4">
          <!-- Employee Type Selection -->
          <FormField v-slot="{ componentField }" name="type_of_employee">
            <FormItem>
              <FormLabel for="type_of_employee">Type of Employee</FormLabel>
              <FormControl>
                <Select v-bind="componentField" v-model="form.values.type_of_employee" id="type_of_employee" @change="onTypeChange">
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
          <Button type="submit">Add Employee</Button>
        </form>
      </CardContent>
    </Card>
    </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'
  import { createEmployee } from '../services/employeeService.ts'
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/core/components/ui/select'

  // Schema definition for employee form validation
  const employeeSchema = toTypedSchema(z.object({
    type_of_employee: z.enum(['regular', 'contractual'], { errorMap: () => ({ message: 'You must select a type of employee' }) }),
    first_name: z.string().min(1, 'First Name is required'),
    last_name: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format'),
    number_of_leaves: z.number().optional().refine(value => value !== undefined || z.number(), 'Number of Leaves is required for regular employees'),
    benefits: z.string().optional(),
    contract_end_date: z.string().optional(),
    project: z.string().optional(),
  }))

  // Use Vee Validate's useForm for form state management
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

  const router = useRouter()

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const data = await createEmployee(values.type_of_employee, values)
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to add employee', error)
    }
  })

  const onTypeChange = () => {
    const isRegular = form.values.type_of_employee === 'regular'
    form.setFieldValue('number_of_leaves', isRegular ? 0 : undefined)
  }
</script>
