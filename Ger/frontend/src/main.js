import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import  * as components from 'vuetify/components' 
import  * as directives from 'vuetify/directives' 
import vue3GoogleLogin from 'vue3-google-login'

const vuetify = createVuetify({components, directives})


const app = createApp(App);

app.use(vuetify);

app.use(vue3GoogleLogin, {
    clientId: '1003864919202-bk40qisbl6go24igdumc6mt4u6q5cq3q.apps.googleusercontent.com'
  });

app.mount('#app')