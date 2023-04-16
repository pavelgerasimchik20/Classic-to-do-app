import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import vue3GoogleLogin from 'vue3-google-login'

loadFonts()

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .use(vue3GoogleLogin, {
        clientId: '503429863603-ck2742poql1i2unfht847ce96da1p5ru.apps.googleusercontent.com'
      })
    .mount('#app')


