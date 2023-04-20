import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import state from '../store/index' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
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


router.beforeEach( async (to) => {
    if(localStorage.getItem("token")){
        await state.dispatch('checkToken')
    }
    if (to.meta.requiresAuth && !state.getters.isAuth) {
        return {
        path: '/login'
        }
    }
})

export default router
