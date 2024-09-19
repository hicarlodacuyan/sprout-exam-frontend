import apiClient from '@/plugins/axios'
import type { LoginResponse } from '../models/LoginResponse'

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    username,
    password
  })
  return response.data
}

export const register = async (
  username: string,
  password: string
): Promise<{ username: string }> => {
  const response = await apiClient.post<{ username: string }>('/auth/register', {
    username,
    password
  })
  return response.data
}

export const logout = async () => {
  localStorage.removeItem('token')
  return true
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token')
}
