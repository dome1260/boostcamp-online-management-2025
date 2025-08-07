import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../pages/Home.vue'),
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import('../pages/auth/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import ('../pages/auth/pages/Login.vue'),
        meta: {
          layout: 'blank'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'UserPage',
    component: () => import('../pages/user/User.vue'),
    meta: {
      layout: 'default'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
