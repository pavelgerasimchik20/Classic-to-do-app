<template>
  <v-btn color="red" @click="deleteTodo(todoId)">
    <v-icon left>mdi-delete</v-icon>
    I DID
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    todoId: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteTodo"])
  },
};
</script>