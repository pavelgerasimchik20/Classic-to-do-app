<template>
  <v-app>
    <v-container >
      <h1>To-Do List</h1>
      <v-form v-model="newTodo" @submit.prevent="addTodo">
        <v-text-field label="New To-Do" v-model="newTodo" required></v-text-field>
        <v-btn type="submit" color="teal">Add</v-btn>
      </v-form>
      <v-row>
        <v-col v-for="(todo, index) in todos" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-text>{{ todo }}</v-card-text>
            <v-card-actions>
              <v-btn color="red" text @click="removeTodo(index)">Remove</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <GoogleLogin :callback="callback" v-else /> -->
  </v-app>
</template>

<script>

import { decodeCredential } from 'vue3-google-login';

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      isLoggedIn: false,
    }
  },
  methods: {
    addTodo() {
      this.todos.push(this.newTodo);
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    callback(response) {
      this.isLoggedIn = true;
      this.userData = decodeCredential(response.credential);
      this.email = this.userData.email;
      this.token = response.credential;
      console.log(this.userData);
    }
  }
}
</script>
<style scoped>
  .v-card-actions > button {
    height: 40px;
    width: 40px;
    margin-top: 10px;
  }
</style>
