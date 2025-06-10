import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('./views/ChatDashboard.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

