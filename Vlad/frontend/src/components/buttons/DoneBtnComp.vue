<template>
  <v-btn color="red" @click="deleteTodo(todoId)">
    <!-- <v-icon :left="true" :mdi="deleteIcon"></v-icon> -->
    I DID
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';
// import {mdiDelete} from '@mdi/js'
// import { VIcon } from 'vuetify/lib/components';

export default {
  props: {
    todoId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
        // deleteIcon: mdiDelete,
    }
  },
  methods: {
    ...mapActions(["deleteTodo"])
  },
  components: {
    // VIcon
  }
};
</script>