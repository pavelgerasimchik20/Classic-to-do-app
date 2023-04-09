<template>
  <v-app>
    <v-container>
      <MySelector
        v-model="selectedSort"
        class="my-selector"
        style="width: 250px; height: 8%; position: absolute; right: 0; top: 0; margin: 52px"
      />
      <h2>To-Do List</h2>
      <v-form @submit.prevent="addTodo">
        <v-text-field class="input" style="width: 75%;" label="New To-Do" v-model="text" required></v-text-field>
        <v-btn type="submit" color="teal">Add</v-btn>
      </v-form>
      <v-row class="mt-4" v-if="todos.length > 0">
        <v-col v-for="(todo, index) in todos" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-text class="text-teal font-weight-medium">{{ todo.text }}</v-card-text>
            <v-card-actions>
              <div class="pa-0 text-center">
                <v-btn class="text-none" color="teal" elevation="2" @click="showDialog(todo)">
                  Edit
                </v-btn>
                <v-btn class="text-none" color="teal" elevation="2" @click="removeTodo(todo._id)">
                  Done
                </v-btn>
                <v-label class="text-teal font-weight-light mt-3 mx-4">
                  <small>{{ todo.createDate }}</small>
                </v-label>
              </div>
            </v-card-actions> 
          </v-card>
        </v-col>
      </v-row>
      <h2 v-else style="color:teal">
        <br>
        Todo list is empty
      </h2>
    </v-container>
    <MyDialog v-model:show="dialogVisible">
        <v-card>
            <v-card-title>
              <span class="text-h6">editing...</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newText"
                      label="todo description"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="teal"
                variant="text" 
                @click="dialogVisible = false"
              >
                Close
              </v-btn>
              <v-btn
                color="teal"
                variant="text"
                @click="update"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
      </MyDialog>
  </v-app>
</template>

<script>

import MyDialog from '@/components/UIComponents/MyDialog.vue'
import MySelector from '@/components/UIComponents/MySelector.vue'
import { decodeCredential } from 'vue3-google-login';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import SortHelper from '@/helpers/SortHelper.js'

export default {
  components: {
    MyDialog,
    MySelector
  },
  data() {
    return {
      todos: [],
      text: '',
      newText: '',
      email: '',
      dialogVisible: false,
      id: undefined,
      selectedSort: null //here will be picked sort types
    }
  },
  watch: {
  selectedSort(newValue) {
    if (this.selectedSort == 'by text') {
      SortHelper.customSortByText(this.todos)
    }
    if (this.selectedSort == 'by date(old above)'){
      SortHelper.customSortByDate(this.todos)
    }
    if (this.selectedSort == 'by date(new above)'){
      SortHelper.customReverseSortByDate(this.todos)
    }
  }
},
  async mounted() {
      this.email = decodeCredential(VueCookies.get('token')).email
      axios.post(`http://localhost:6060/getByEmail/${this.email}`)
      .then(response => {
          this.todos = response.data.result;
      })
      .catch(error => {
          console.log(error);
      });
  },
  methods: {
    update() {
      axios.put(`http://localhost:6060/update/${this.id}`, { 
        email: this.email,
        text: this.newText
      }) 
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
       console.log(error);
      });

      this.dialogVisible = false;
    },
    showDialog(todo) {
      this.dialogVisible = true;
      this.id = todo._id;
      this.newText = todo.text;
    },
    addTodo() {
      axios.post('http://localhost:6060/add', {
        email: this.email,
        text: this.text
      })
      .then(response => {
        console.log(response.data);        
        this.todos.push(response.data.result);
        this.text = "";
      })
      .catch(error => {
        console.log(error);
      }); 
    },
    removeTodo(id) {
      axios.delete(`http://localhost:6060/delete/${id}`)
      .then(() => {
        const index = this.todos.findIndex(todo => todo._id == id);
        if (index > -1) {
        this.todos.splice(index, 1);
      }
      })
      .catch((error) => {
        console.log(error);
      });
      }
  }
}
</script>

<style scoped>
@media (max-width: 1055px) {
  .my-selector {
    display: none;
  }
  .input {
    width: 100% !important;
  }
}
</style>