<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="app">
    <ToDoAddForm @add="AddToDo"/>
    <ToDoList :result="todos"/>

  </div>
</template>

<script>
import ToDoAddForm from "./components/ToDoAddForm.vue"
import ToDoList from "@/components/ToDoList.vue"

import axios from "axios"

export default {
  name: 'App',
  components: {
    ToDoAddForm,
    ToDoList,
  },
  data() {
      return {
          todos: [],
      }
  },
  methods: {
    AddToDo(todo) {
      this.todos.push(todo);
    }
  },
  mounted() {
            axios.get('http://localhost:6060/get-todos')
            .then(response => {
                this.todos = response.data.result;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
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
