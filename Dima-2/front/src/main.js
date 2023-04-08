/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import vue3GoogleLogin from 'vue3-google-login'

import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/components/Login.vue'
import Todos from '@/components/Todos.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: Login},
        {path: '/todos', name: Todos}
    ]
})

registerPlugins(app)

app.use(vue3GoogleLogin, {
    clientId: '503429863603-ck2742poql1i2unfht847ce96da1p5ru.apps.googleusercontent.com'
  })

app.use(router)

app.mount('#app')
