import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import store from './store'

import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import MainPage from '@/pages/MainPage'
import ToDoPage from '@/pages/ToDoPage'
import LoginPage from '@/pages/LoginPage'

// import VueCookies from "vue-cookies";

const routes = [
    {
        path: '/',
        component: MainPage,
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

  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('login')
    } else {
        next()
    }
  })

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(store).use(router).use(vuetify).use(vue3GoogleLogin, {
    clientId: "672649193330-gh9894b05m2kmioqlccp52k0cuo0us6p.apps.googleusercontent.com",
    scope: "email",
    promt: "consent"
}).mount('#app')


