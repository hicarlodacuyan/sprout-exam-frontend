import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../modules/auth/services/authService'
import Login from '../modules/auth/views/Login.vue'
import Register from '../modules/auth/views/Register.vue'
import Dashboard from '../modules/employees/views/Dashboard.vue'
import EmployeeView from '../modules/employees/views/EmployeeView.vue'
import AddEmployee from '../modules/employees/views/AddEmployee.vue'
import EditEmployee from '../modules/employees/views/EditEmployee.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, guest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee/:id',
    name: 'employee-view',
    component: EmployeeView,
    props: (route) => ({ employeeId: route.params.id }),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-employee/:id',
    name: 'edit-employee',
    component: EditEmployee,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-employee',
    name: 'add-employee',
    component: AddEmployee,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated()
  if (to.meta.requiresAuth && !isAuth) {
    next('/login')
  } else if (to.meta.guest && isAuth) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
