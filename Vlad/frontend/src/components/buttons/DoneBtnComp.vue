<template>
  <v-btn color="red" @click="deleteTodo(todoId)">
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