<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div class="app"> 
    <LoginComponent/>
    <ToDoComponent />
  </div>
</template>

<script>
import ToDoComponent from './components/ToDoComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

export default {
  name: 'App',
  components: {
    ToDoComponent,
    LoginComponent,
  },
  data() {
    return {
      email: '',
      dialogVisible: false
    }
  },
  // mounted() {
  //           axios.get('http://localhost:6060/get-todos')
  //           .then(response => {
  //               this.todos = response.data.result;
  //               console.log(response.data);
  //           })
  //           .catch(error => {
  //               console.log(error);
  //           });
  //       }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
