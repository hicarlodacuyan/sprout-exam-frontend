export interface Employee {
  id: string
  name: string
  email: string
  number_of_leaves?: number
  benefits?: string
  contract_end_date?: string
  project?: string
}

export type RegularEmployee = Omit<Employee, 'contract_end_date' | 'project'>

export type ContractualEmployee = Omit<Employee, 'number_of_leaves' | 'benefits'>
