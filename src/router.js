import { createRouter, createMemoryHistory } from 'vue-router'
import Login from './views/Login.vue'
import ChatDashboard from './views/ChatDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatDashboard
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

