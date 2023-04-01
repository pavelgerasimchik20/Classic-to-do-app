<template>
  <v-app>
    <v-container>
      <h1>To-Do List</h1>
      <v-form @submit.prevent="addTodo">
        <v-text-field label="New To-Do" v-model="text" required></v-text-field>
        <v-btn type="submit" color="teal">Add</v-btn>
      </v-form>
      <v-row class="mt-4" v-if="todos.length">
        <v-col v-for="(todo, index) in todos" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-text class="text-teal font-weight-bold">{{ todo.todos }}</v-card-text>
            <v-card-actions>
              <v-btn class="red darken-2 white--text" elevation="2" @click="removeTodo(index)">Done</v-btn>
            </v-card-actions> 
          </v-card>
        </v-col>
      </v-row>
      <!-- {{ email }} -->
    </v-container>
  </v-app>
</template>

<script>

import { decodeCredential } from 'vue3-google-login';
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  data() {
    return {
      todos: [],
      text: '',
      email: decodeCredential(VueCookies.get('token')).email
    }
  },
  mounted() {
            axios.get('http://localhost:6060/getAll')
            .then(response => {
                this.todos = response.data.result;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
  },
  methods: {
    addTodo() {
      axios.post('http://localhost:6060/add', {
        email: this.email,
        text: this.text
      })
      .then(response => {
        console.log(response.data);        
        this.todos.push(response.data.result);
        this.text = "";
        this.todos = [...this.todos];
      })
      .catch(error => {
        console.log(error);
      });
      this.$forceUpdate();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>
