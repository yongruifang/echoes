import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'echo',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/photo',
      name: 'photo',
      component: () => import('../views/PhotoView.vue')
    }
  ]
})

export default router
