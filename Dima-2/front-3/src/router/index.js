import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: {
    //     requiresAuth: true
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: AuthView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from) => {
//     if(to.meta.requiresAuth) {
//         return {name: 'login'}
//     }
// })

export default router
