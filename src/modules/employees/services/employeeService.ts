import apiClient from '@/plugins/axios'
import type { Employee, RegularEmployee, ContractualEmployee } from '../models/Employee'

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await apiClient.get('/employees')
    return response.data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    return []
  }
}

export const getEmployee = async (id: string): Promise<Employee> => {
  try {
    const response = await apiClient.get(`/employees/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch employee:', error)
    return {} as Employee
  }
}

export const createEmployee = async (
  type: string,
  employeeData: RegularEmployee | ContractualEmployee
): Promise<Employee> => {
  const payload = {
    type_of_employee: type,
    employee: employeeData
  }

  try {
    const response = await apiClient.post('/employees', payload)
    return response.data
  } catch (error) {
    console.error('Failed to create employee:', error)
    return employeeData as Employee
  }
}

export const updateEmployee = async (
  id: string,
  typeOfEmployee: string,
  employeeData: RegularEmployee | ContractualEmployee
): Promise<Employee> => {
  try {
    const response = await apiClient.put(`/employees/${id}`, {
      type_of_employee: typeOfEmployee,
      employee: employeeData
    })
    return response.data
  } catch (error) {
    console.error('Failed to update employee:', error)
    return employeeData as Employee
  }
}

export const deleteEmployee = async (id: string, employee: Employee) => {
  try {
    const type_of_employee = employee.number_of_leaves !== undefined ? 'regular' : 'contractual'

    await apiClient.delete(`/employees/${id}?type_of_employee=${type_of_employee}`)
  } catch (error) {
    console.error('Failed to delete employee:', error)
    throw error
  }
}
