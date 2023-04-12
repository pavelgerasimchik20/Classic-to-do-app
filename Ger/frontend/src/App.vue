<template>
  <GoogleLogin v-if="token.length < 1" :callback="myFunction"/>
  <div v-else class="app">
      <a href="#/">Home</a> |
      <a href="#/about">About</a> |
      <a href="#/non-existent-path">...</a>
      <component :is="currentView" />
  </div>
</template>

<script>
import ToDoComponent from './components/ToDoComponent.vue'
import About from './components/About.vue'
import NotFound from './components/NotFound.vue'
import VueCookies from 'vue-cookies';
import { googleLogout } from "vue3-google-login"

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
    callback(response) {
      this.response = response
      console.log('callback started')
      this.innerCallback(this.response);
      // setInterval(() => {
      //   console.log('before logout')
      //   googleLogout();
      //   console.log('after logout');
      //   console.log('new login');
      //   this.innerCallback(this.response);
      // }, 10000);
    },
    innerCallback(response) {
      this.token = response.credential;
      console.log(response.credential)
      VueCookies.set('token', this.token);
      console.log('token seted')
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
