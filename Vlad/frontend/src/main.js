import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).use(vue3GoogleLogin, {
    clientId: "672649193330-gh9894b05m2kmioqlccp52k0cuo0us6p.apps.googleusercontent.com",
    scope: "email",
    promt: "consent"
}).mount('#app')
