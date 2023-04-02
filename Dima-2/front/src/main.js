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

// Google Oauth
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)

registerPlugins(app)

app.use(vue3GoogleLogin, {
    clientId: '503429863603-ck2742poql1i2unfht847ce96da1p5ru.apps.googleusercontent.com'
  })

app.mount('#app')
