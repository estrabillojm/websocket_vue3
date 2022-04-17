import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '../views/ChatPage.vue'
import Home from '../views/Home.vue'

const routes = [
  {path: '/',name: 'Home',component: Home},
  {path: '/about',name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')},
  {path: '/chat', name: 'Chat', component: ChatPage}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
