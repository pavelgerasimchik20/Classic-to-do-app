<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="app">
    <ToDoAddForm @add="AddToDo"/>
    <ToDoList :todos="todos"/>
  </div>
</template>

<script>
import ToDoAddForm from "./components/ToDoAddForm.vue"
import ToDoList from "@/components/ToDoList.vue"

export default {
  name: 'App',
  components: {
    ToDoAddForm, 
    ToDoList
  },
  data() {
      return {
          todos: [
              { id: 1, createDate: new Date().toLocaleString(), todo: "first"},
              { id: 2, createDate: new Date().toLocaleString(), todo: "second"},
              { id: 3, createDate: new Date().toLocaleString(), todo: "third"},
              { id: 4, createDate: new Date().toLocaleString(), todo: "fourth"}
          ],
      }
  },
  methods: {
    AddToDo(todo) {
      this.todos.push(todo);
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 15px;
}
</style>
