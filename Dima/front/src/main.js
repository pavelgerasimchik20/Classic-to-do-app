import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//OAuth
import vue3GoogleLogin from 'vue3-google-login'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
.use(vuetify)
.use(vue3GoogleLogin, {
    clientId: '503429863603-ck2742poql1i2unfht847ce96da1p5ru.apps.googleusercontent.com'
  })
.mount('#app')
