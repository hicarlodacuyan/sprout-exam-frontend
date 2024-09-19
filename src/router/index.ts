import { createRouter, createWebHistory } from 'vue-router'
import Login from '../modules/auth/views/Login.vue'
import Register from '../modules/auth/views/Register.vue'
import Dashboard from '../modules/employees/views/Dashboard.vue'
import EmployeeView from '../modules/employees/views/EmployeeView.vue'
import AddEmployee from '../modules/employees/views/AddEmployee.vue'
import EditEmployee from '../modules/employees/views/EditEmployee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard },
    {
      path: '/employee/:id',
      name: 'employee-view',
      component: EmployeeView,
      props: (route) => ({ employeeId: route.params.id })
    },
    { path: '/add-employee', component: AddEmployee },
    { path: '/edit-employee/:id', component: EditEmployee, props: true }
  ]
})

export default router
