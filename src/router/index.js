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
        component: () => import('../pages/auth/pages/Login.vue'),
        meta: {
          auth: false,
          layout: 'blank'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'ProductPage',
    component: () => import('../pages/product/Product.vue'),
    children: [
      {
        path: '',
        name: 'ProductList',
        component: () => import('../pages/product/pages/ProductList.vue'),
        meta: {
          auth: true,
          layout: 'default',
          root: 'ProductPage'
        }
      },
      {
        path: 'create',
        name: 'ProductCreate',
        component: () => import('../pages/product/pages/ProductCreate.vue'),
        meta: {
          auth: true,
          layout: 'default',
          root: 'ProductPage'
        }
      },
      {
        path: ':id/detail',
        name: 'ProductDetail',
        component: () => import('../pages/product/pages/ProductDetail.vue'),
        meta: {
          auth: true,
          layout: 'default',
          root: 'ProductPage'
        }
      },
      {
        path: ':id/edit',
        name: 'ProductEdit',
        component: () => import('../pages/product/pages/ProductEdit.vue'),
        meta: {
          auth: true,
          layout: 'default',
          root: 'ProductPage'
        }
      }
    ]
  },
  {
    path: '/category',
    name: 'CategoryPage',
    component: () => import('../pages/category/Category.vue'),
    meta: {
      auth: true,
      layout: 'default',
      root: 'CategoryPage'
    }
  },
  {
    path: '/tag',
    name: 'TagPage',
    component: () => import('../pages/tag/Tag.vue'),
    meta: {
      auth: true,
      layout: 'default',
      root: 'TagPage'
    }
  },
  {
    path: '/user',
    name: 'UserPage',
    component: () => import('../pages/user/User.vue'),
    meta: {
      auth: true,
      layout: 'default',
      root: 'UserPage'
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
