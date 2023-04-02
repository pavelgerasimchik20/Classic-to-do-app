<template>
  <img style="width: 200px" alt="to-do-list" src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png">
  <GoogleLoginComponent />
  <h3>Theese are your list of tasks</h3>
  <AddToDo />
  <br />
  <ToDoList />
</template>

<script>
import ToDoList from "./components/ToDoList.vue"
import GoogleLoginComponent from "./components/GoogleLoginComponent.vue";
import AddToDo from "./components/AddToDo.vue";

export default {
  name: 'App',
  components: {
    ToDoList,
    GoogleLoginComponent,
    AddToDo
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
  margin-top: 60px;
}
</style>
