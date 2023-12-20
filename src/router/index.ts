import { createRouter, createWebHistory } from 'vue-router'
import NoteView from '../views/NoteView.vue'
import PhotoView from '../views/PhotoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'note',
      component: NoteView,
      children: [
        {
          path: '/echoes/:tag',
          component: NoteView,
        }
      ]
    },
    {
      path: '/photo',
      name: 'photo',
      component: PhotoView
    }
  ]
})

export default router
