import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
// import dotenv from "dotenv";

// dotenv.config();

import store from './store'

import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ToDoPage from '@/pages/ToDoPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

const routes = [
    {
        path: '/register',
        component: RegisterPage,
    },
    {
        path: '/todos',
        component: ToDoPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: LoginPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

  router.beforeEach((to, _, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        return next('login')
    }
    next()
  })

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')


