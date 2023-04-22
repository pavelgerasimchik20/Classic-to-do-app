<template>
<div>
  <GoogleLogin class="mt-12" v-if="token.length < 1" :callback="myFunction"/>
  <v-app v-else>
    <v-toolbar
      prominent
      image="https://digitalya.co/blog/wp-content/uploads/2022/08/vue-js-methods-demistified@3x-8.png"
      class="mx-auto mt-5 ">
      <v-toolbar-items class="ml-8">
        <v-btn variant="tonal" color="teal" href="#/">Home</v-btn>
        <v-btn variant="tonal" color="teal" href="#/about">About</v-btn>
        <v-btn variant="tonal" color="teal" href="#/non-existent-path">...</v-btn>
      </v-toolbar-items>
      <div class="flex-grow-1 text-right">
        <v-btn 
        @click="logout"
        icon>
          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <component class="mt-6" :is="currentView" />
  </v-app>
</div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
import ToDoComponent from './components/pages/ToDoPage.vue'
import About from './components/pages/About.vue'
import NotFound from './components/pages/NotFound.vue'
import VueCookies from 'vue-cookies';

const routes = {
  '/': ToDoComponent,
  '/about': About
}

export default {
  name: 'App',
  components: {
    ToDoComponent,
    About,
    NotFound
  },
  data() {
    return {
      currentPath: window.location.hash,
      token: '',
      myFunction: this.callback,
      response: undefined
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  },
  methods: {
    logout(){
      VueCookies.set('token', '');
      this.token = '';
    },
    callback(response) {
      this.response = response
      console.log(response)
      console.log('callback started')
      this.innerCallback(this.response);
    },
    innerCallback(response) {
      this.token = response.credential;
      console.log(response.credential);
      VueCookies.set('token', this.token);
      console.log('token seted');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
