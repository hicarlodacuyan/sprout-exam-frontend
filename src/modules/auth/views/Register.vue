<template>
  <div class="h-dvh flex justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>Register an account</CardTitle>
        <CardDescription>Enter your credentials to register an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="flex flex-col gap-4">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit">Register</Button>
          <router-link to="/login" class="self-center">Already have an account? Login here</router-link>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { register } from '../services/authService'
import { useRouter } from 'vue-router'
import { Button } from '@/core/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form'
import { Input } from '@/core/components/ui/input'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(3).max(20).nonempty(),
  password: z.string().min(6).max(100).nonempty(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const router = useRouter()

const onSubmit = form.handleSubmit(async (values) => {
  const { username, password } = values

  try {
    await register(username, password)
    router.push('/')
  } catch (error) {
    console.error('Registration failed', error)
  }
})
</script>
