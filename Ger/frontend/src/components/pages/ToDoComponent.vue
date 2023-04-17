<template>
  <v-app>
    <v-container>
      <MySelector
        v-model="selectedSort"
        class="my-selector"
        style="width: 250px; height: 8%; position: absolute; right: 0; top: 0; margin: 52px"
      />
      <h2>To-Do List</h2>
      <AddForm @add="addNewTodo"/>
      <MainList v-if="allTodos.length > 0" :allTodos="allTodos" @showDialog="showDialog" @remove="remove"/>
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
import AddForm from '@/components/AddForm.vue'
import MySelector from '@/components/UIComponents/MySelector.vue'
import VueCookies from 'vue-cookies';
import { decodeCredential } from 'vue3-google-login';
import SortHelper from '@/helpers/SortHelper.js'
import {mapGetters, mapActions} from 'vuex'
import MainList from '../MainList.vue';

export default {
  components: {
    MyDialog,
    MySelector,
    AddForm,
    MainList
    
},
  computed: mapGetters(["allTodos","activeTodos"]),
  data() {
    return {
      newText: '',
      email: decodeCredential(VueCookies.get('token')).email,
      dialogVisible: false,
      id: undefined,
      selectedSort: null,
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
      this.fetchTodos(this.email)
  },
  methods: {
    ...mapActions(['fetchTodos','addTodo','removeTodo','updateTodo']),
    remove(id){
      this.removeTodo(id);
    },
    addNewTodo(text){
      console.log("add method in a parent received ... " + text)
      this.addTodo({
        email: this.email,  
        text: text
      });
      this.text = ''
    },
    update() {
      const freshObject = {
        id: this.id,
        email: this.email,
        text: this.newText
      }
      this.updateTodo(freshObject);
      this.dialogVisible = false;
    },
    showDialog(todo) {
      this.dialogVisible = true;
      this.id = todo._id;
      this.newText = todo.text;
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