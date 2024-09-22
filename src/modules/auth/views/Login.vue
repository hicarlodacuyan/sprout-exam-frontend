<template>
  <div class="h-dvh flex justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>Login your account</CardTitle>
        <CardDescription>Enter your credentials to login to your account</CardDescription>
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
          <Button type="submit">Login</Button>
          <router-link to="/register" class="self-center">Don't have an account? Register here</router-link>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { login } from '../services/authService.ts'
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
    password: z.string().min(5).max(20).nonempty(),
  }))

  const form = useForm({
    validationSchema: formSchema,
  })

  const router = useRouter()

  const onSubmit = form.handleSubmit(async (values) => {
    const { username, password } = values

    try {
      const { access_token } = await login(username, password)
      localStorage.setItem('token', access_token)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
    }
  })
</script>
