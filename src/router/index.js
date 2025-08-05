import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../pages/Home.vue'),
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../pages/About.vue'),
    meta: {
      layout: 'blank'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
