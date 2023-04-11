<template>
  <div class="app">
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

const routes = {
  '/': ToDoComponent,
  '/about': About
}

export default {
  name: 'App',
  components: {
    ToDoComponent,
    About
  },
  data() {
    return {
      currentPath: window.location.hash
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
