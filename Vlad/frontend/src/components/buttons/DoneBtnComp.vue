<template>
  <v-btn color="red" @click="deleteTodo(todoId)">
    <v-icon left>mdi-delete</v-icon>
    I DID
  </v-btn>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    todoId: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteTodo(id) {
      axios
        .delete(`http://localhost:6060/delete-todo/${id}`)
        .then(() => {
          console.log(`deleting ${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
