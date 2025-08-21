import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "../stores/user"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../pages/Home.vue'),
    redirect: { name: 'UserPage' }
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
          layout: 'blank',
          auth: false
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'UserPage',
    component: () => import('../pages/user/User.vue'),
    meta: {
      layout: 'default',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const currentDate = Math.ceil(Date.now() / 1000)

  if (to.meta?.auth) {
    if (userStore.userAccessToken && currentDate < userStore.userAuth.expiresIn) {
      return next()
    }
    userStore.clearUser()
    return next({ name: 'LoginPage' })
  }
  if (!to.meta?.auth && userStore.userAccessToken) {
    return next({ name: 'UserPage' })
  }
  return next()
})

export default router
