<template>
  <v-form
    @submit.prevent="submitForm(todo._id)"
    style="width: 80%"
    class="mx-auto"
  >
    <v-text-field v-model="todos" label="Edit task"></v-text-field>
    <v-btn type="submit" color="success" class="mx-auto mb-3 mr-2">Update</v-btn>
    <v-btn @click="clearInput" class="mx-auto mb-3 ml-2"> clear </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      todos: "",
    };
  },
  methods: {
    submitForm(id) {
      axios
        .put(`http://localhost:6060/update-todo/${id}`, {
          value: this.todos,
        })
        .then((response) => {
          console.log(response.data);
          this.todos = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearInput() {
      this.todos = "";
    },
  },
};
</script>
